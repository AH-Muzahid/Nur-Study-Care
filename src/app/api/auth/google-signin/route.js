import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongoose'
import User from '@/models/User'
import { createSession } from '@/lib/auth-helpers'

export async function POST(request) {
    try {
        const { uid, email, name, avatar, emailVerified } = await request.json()

        if (!uid || !email) {
            return NextResponse.json(
                { message: 'Missing required fields' },
                { status: 400 }
            )
        }

        await connectDB()

        // Check if user exists by email
        let user = await User.findOne({ email })

        if (!user) {
            // Create new user
            user = await User.create({
                email,
                name: name || email.split('@')[0],
                avatar,
                phone: '01700000000', // Default phone
                role: 'STUDENT', // Default role
                isActive: true,
                googleId: uid,
                isEmailVerified: emailVerified || true,
                authProvider: 'google',
            })
        } else {
            // Update existing user with Google info
            if (!user.isActive) {
                return NextResponse.json(
                    { message: 'Account is inactive. Please contact support.' },
                    { status: 403 }
                )
            }

            // Link Google account
            user.googleId = uid
            user.avatar = avatar || user.avatar
            user.isEmailVerified = true
            if (!user.authProvider || user.authProvider === 'email') {
                user.authProvider = 'google'
            }
            await user.save()
        }

        // Return user data (without password)
        const userData = {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            role: user.role,
            avatar: user.avatar,
        }

        // Create session
        await createSession(user)

        return NextResponse.json({
            success: true,
            user: userData,
        })

    } catch (error) {
        console.error('Google sign-in error:', error)
        return NextResponse.json(
            { message: error.message || 'Internal server error' },
            { status: 500 }
        )
    }
}
