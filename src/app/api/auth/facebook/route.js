import { NextResponse } from 'next/server'
import { SocialAuthService } from '@/lib/auth/social-auth-service'

export async function GET() {
    try {
        if (!process.env.FACEBOOK_CLIENT_ID || !process.env.FACEBOOK_CLIENT_SECRET) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Facebook OAuth not configured',
                },
                { status: 500 }
            )
        }

        const authUrl = SocialAuthService.getFacebookAuthUrl()
        return NextResponse.redirect(authUrl)
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to initiate Facebook login',
            },
            { status: 500 }
        )
    }
}
