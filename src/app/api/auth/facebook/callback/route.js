import { NextResponse } from 'next/server'
import { SocialAuthService } from '@/lib/auth/social-auth-service'

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url)
        const code = searchParams.get('code')
        const error = searchParams.get('error')

        if (error) {
            return NextResponse.redirect(
                `${process.env.NEXT_PUBLIC_APP_URL}/login?error=facebook_auth_cancelled`
            )
        }

        if (!code) {
            return NextResponse.redirect(
                `${process.env.NEXT_PUBLIC_APP_URL}/login?error=no_code`
            )
        }

        const result = await SocialAuthService.handleFacebookCallback(code)

        const response = NextResponse.redirect(
            `${process.env.NEXT_PUBLIC_APP_URL}/student/dashboard`
        )

        // Set HTTP-only cookies
        response.cookies.set('auth_token', result.accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 15,
            path: '/',
        })

        response.cookies.set('refresh_token', result.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7,
            path: '/',
        })

        return response
    } catch (error) {
        console.error('Facebook callback error:', error)
        return NextResponse.redirect(
            `${process.env.NEXT_PUBLIC_APP_URL}/login?error=facebook_auth_failed`
        )
    }
}
