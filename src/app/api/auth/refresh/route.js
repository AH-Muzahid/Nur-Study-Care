import { NextResponse } from 'next/server'
import { AuthService } from '@/services/authService'

export async function POST(request) {
    try {
        const refreshToken =
            request.cookies.get('refresh_token')?.value ||
            (await request.json()).refreshToken

        if (!refreshToken) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Refresh token not provided',
                },
                { status: 400 }
            )
        }

        const result = await AuthService.refreshToken(refreshToken)

        const response = NextResponse.json({
            success: true,
            message: 'Token refreshed successfully',
        })

        // Set new access token cookie
        response.cookies.set('auth_token', result.accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 15, // 15 minutes
            path: '/',
        })

        return response
    } catch (error) {
        // Clear cookies on error
        const response = NextResponse.json(
            {
                success: false,
                error: error.message || 'Token refresh failed',
            },
            { status: 401 }
        )

        response.cookies.delete('auth_token')
        response.cookies.delete('refresh_token')
        response.cookies.delete('csrf_token')

        return response
    }
}
