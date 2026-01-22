import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongoose'
import User from '@/models/User'
import bcrypt from 'bcryptjs'
import { z } from 'zod'

const registerSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    phone: z.string().optional(),
    role: z.enum(['STUDENT', 'TEACHER', 'ADMIN']).default('STUDENT'),
})

export async function POST(request) {
    try {
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

        // Hash password
        const hashedPassword = await bcrypt.hash(validatedData.password, 12)

        // Create user
        const user = await User.create({
            name: validatedData.name,
            email: validatedData.email,
            password: hashedPassword,
            phone: validatedData.phone,
            role: validatedData.role,
            status: 'ACTIVE',
            isEmailVerified: false, // Will be verified via email link later
        })

        return NextResponse.json(
            {
                success: true,
                message: 'Registration successful. Please login to continue.',
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
