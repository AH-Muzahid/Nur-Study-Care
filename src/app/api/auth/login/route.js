import { NextResponse } from 'next/server'
import { AuthService } from '@/services/authService'

export async function POST(request) {
    try {
        const body = await request.json()

        // Get IP and User-Agent for security
        const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown'
        const userAgent = request.headers.get('user-agent') || 'unknown'

        const result = await AuthService.login(body, ip, userAgent)

        const response = NextResponse.json({
            success: true,
            message: 'Login successful',
            user: result.user,
        })

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

        response.cookies.set('csrf_token', result.csrfToken, {
            httpOnly: false, // Accessible by JavaScript for CSRF protection
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 15,
            path: '/',
        })

        return response
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                error: error.message || 'Login failed',
            },
            { status: 401 }
        )
    }
}
