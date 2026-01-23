import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongoose'
import User from '@/models/User'
import { createSession } from '@/lib/auth-helpers'
import { checkRateLimit, getClientIdentifier, resetRateLimit } from '@/lib/rate-limit'

export async function POST(request) {
    try {
        // Rate limiting
        const clientId = getClientIdentifier(request)
        const rateLimitCheck = checkRateLimit(clientId, 'login')

        if (!rateLimitCheck.allowed) {
            return NextResponse.json(
                {
                    success: false,
                    message: rateLimitCheck.message,
                    retryAfter: rateLimitCheck.retryAfter
                },
                {
                    status: 429,
                    headers: {
                        'Retry-After': rateLimitCheck.retryAfter.toString()
                    }
                }
            )
        }

        const { email, password } = await request.json()

        if (!email || !password) {
            return NextResponse.json(
                { success: false, message: 'Please provide email and password' },
                { status: 400 }
            )
        }

        await connectDB()

        const user = await User.findOne({ email }).select('+password')

        if (!user) {
            return NextResponse.json(
                { success: false, message: 'Invalid credentials' },
                { status: 401 }
            )
        }

        // Check for password (OAuth users might not have password)
        if (!user.password) {
            return NextResponse.json(
                {
                    success: false,
                    message: `This account uses ${user.authProvider} sign-in. Please use the appropriate login method.`
                },
                { status: 401 }
            )
        }

        // Check account lock BEFORE password comparison
        if (user.isLocked && user.isAccountLocked()) {
            const minutesLeft = Math.ceil((user.lockedUntil - new Date()) / 60000)
            return NextResponse.json(
                {
                    success: false,
                    message: `Account locked due to multiple failed login attempts. Try again in ${minutesLeft} minutes.`
                },
                { status: 403 }
            )
        }

        const isMatch = await user.comparePassword(password)

        if (!isMatch) {
            // Increment failed login attempts
            user.failedLoginAttempts += 1
            user.lastFailedLogin = new Date()

            // Lock account after 5 failed attempts
            if (user.failedLoginAttempts >= 5) {
                user.isLocked = true
                user.lockedUntil = new Date(Date.now() + 30 * 60 * 1000) // 30 minutes
                await user.save()

                return NextResponse.json(
                    {
                        success: false,
                        message: 'Account locked due to multiple failed login attempts. Try again in 30 minutes.'
                    },
                    { status: 403 }
                )
            }

            await user.save()

            return NextResponse.json(
                {
                    success: false,
                    message: `Invalid credentials. ${5 - user.failedLoginAttempts} attempts remaining.`
                },
                { status: 401 }
            )
        }

        if (!user.isActive) {
            return NextResponse.json(
                { success: false, message: 'Account is disabled. Please contact support.' },
                { status: 403 }
            )
        }

        // Successful login - reset failed attempts
        user.failedLoginAttempts = 0
        user.lastFailedLogin = null
        if (user.isLocked) {
            user.isLocked = false
            user.lockedUntil = null
        }
        await user.save()

        // Reset rate limit on successful login
        resetRateLimit(clientId, 'login')

        // Create session (sets cookie)
        await createSession(user)

        return NextResponse.json({
            success: true,
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
                role: user.role,
                avatar: user.avatar,
            },
        })

    } catch (error) {
        console.error('Login error:', error)
        return NextResponse.json(
            { success: false, message: 'Internal server error' },
            { status: 500 }
        )
    }
}
