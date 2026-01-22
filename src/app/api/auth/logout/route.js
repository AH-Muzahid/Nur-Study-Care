import { NextResponse } from 'next/server'
import { AuthService } from '@/services/authService'

export async function POST(request) {
    try {
        const accessToken = request.cookies.get('auth_token')?.value
        const refreshToken = request.cookies.get('refresh_token')?.value

        if (accessToken && refreshToken) {
            await AuthService.logout(accessToken, refreshToken)
        }

        const response = NextResponse.json({
            success: true,
            message: 'Logged out successfully',
        })

        // Clear all auth cookies
        response.cookies.delete('auth_token')
        response.cookies.delete('refresh_token')
        response.cookies.delete('csrf_token')

        return response
    } catch (error) {
        // Still clear cookies even on error
        const response = NextResponse.json({
            success: true,
            message: 'Logged out',
        })

        response.cookies.delete('auth_token')
        response.cookies.delete('refresh_token')
        response.cookies.delete('csrf_token')

        return response
    }
}
