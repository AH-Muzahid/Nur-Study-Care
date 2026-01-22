import { NextResponse } from 'next/server'
import { AuthService } from '@/services/authService'

export async function POST(request) {
    try {
        const body = await request.json()

        const result = await AuthService.register(body)

        const response = NextResponse.json(
            {
                success: true,
                message: 'Registration successful',
                user: result.user,
            },
            { status: 201 }
        )

        // Set HTTP-only cookies for tokens
        response.cookies.set('auth_token', result.accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 15, // 15 minutes
            path: '/',
        })

        response.cookies.set('refresh_token', result.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: '/',
        })

        return response
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                error: error.message || 'Registration failed',
            },
            { status: 400 }
        )
    }
}
