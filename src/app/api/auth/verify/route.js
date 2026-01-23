import { NextResponse } from 'next/server'
import { getSession } from '@/lib/auth-helpers'
import connectDB from '@/lib/mongoose'
import User from '@/models/User'

export async function GET() {
    try {
        const session = await getSession()

        if (!session) {
            return NextResponse.json(
                { message: 'Unauthorized' },
                { status: 401 }
            )
        }

        await connectDB()
        const user = await User.findById(session.id)

        if (!user || !user.isActive) {
            return NextResponse.json(
                { message: 'Unauthorized' },
                { status: 401 }
            )
        }

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
        console.error('Verify error:', error)
        return NextResponse.json(
            { message: 'Internal server error' },
            { status: 500 }
        )
    }
}
