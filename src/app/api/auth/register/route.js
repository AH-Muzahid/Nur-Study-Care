import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongoose'
import User from '@/models/User'
import bcrypt from 'bcryptjs'
import { z } from 'zod'
import { createSession } from '@/lib/auth-helpers'
import { checkRateLimit, getClientIdentifier } from '@/lib/rate-limit'


const registerSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string()
        .min(8, 'Password must be at least 8 characters')
        .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
        .regex(/[a-z]/, 'Must contain at least one lowercase letter')
        .regex(/[0-9]/, 'Must contain at least one number'),
    phone: z.string().optional(),
    role: z.enum(['STUDENT', 'TEACHER', 'ADMIN']).default('STUDENT'),
})

export async function POST(request) {
    try {
        // Rate limiting
        const clientId = getClientIdentifier(request)
        const rateLimitCheck = checkRateLimit(clientId, 'register')

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

        const body = await request.json()

        // Validate input
        const validatedData = registerSchema.parse(body)

        await connectDB()

        // Check if user already exists
        const existingUser = await User.findOne({ email: validatedData.email })
        if (existingUser) {
            return NextResponse.json(
                { success: false, error: 'Email already registered' },
                { status: 409 }
            )
        }

        // AUTO-ADMIN: If this is the first user, make them ADMIN
        const userCount = await User.countDocuments()
        const finalRole = userCount === 0 ? 'ADMIN' : validatedData.role

        // Create user
        // Note: Password will be hashed by the Mongoose pre-save hook
        const user = await User.create({
            name: validatedData.name,
            email: validatedData.email,
            password: validatedData.password,
            phone: validatedData.phone,
            role: finalRole,
            isActive: true, // Schema uses 'isActive' boolean, not 'status' string
            isEmailVerified: false,
        })

        // Create session (auto-login)
        await createSession(user)

        return NextResponse.json(
            {
                success: true,
                message: 'Registration successful!',
                user: {
                    id: user._id,
                    email: user.email,
                    name: user.name,
                    role: user.role,
                },
            },
            { status: 201 }
        )
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Validation failed',
                    details: error.errors.map((err) => ({
                        field: err.path.join('.'),
                        message: err.message,
                    })),
                },
                { status: 422 }
            )
        }

        console.error('Registration error:', error)

        return NextResponse.json(
            { success: false, error: error.message || 'Registration failed' },
            { status: 500 }
        )
    }
}
