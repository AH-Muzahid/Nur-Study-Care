import { NextResponse } from 'next/server'
import { SocialAuthService } from '@/lib/auth/social-auth-service'

export async function GET() {
    try {
        if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Google OAuth not configured',
                },
                { status: 500 }
            )
        }

        const authUrl = SocialAuthService.getGoogleAuthUrl()
        return NextResponse.redirect(authUrl)
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to initiate Google login',
            },
            { status: 500 }
        )
    }
}
