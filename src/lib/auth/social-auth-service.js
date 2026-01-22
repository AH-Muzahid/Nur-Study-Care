import { google } from 'googleapis'
import User from '@/models/User'
import { UserRole, AuthProvider } from '@/constants/roles'
import { SecureAuthService } from './secure-jwt-service'

export class SocialAuthService {
    // ============ GOOGLE OAUTH ============

    static getGoogleAuthUrl() {
        const oauth2Client = new google.auth.OAuth2(
            process.env.GOOGLE_CLIENT_ID,
            process.env.GOOGLE_CLIENT_SECRET,
            process.env.GOOGLE_REDIRECT_URI
        )

        const scopes = [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email',
        ]

        return oauth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: scopes,
            prompt: 'consent',
        })
    }

    static async handleGoogleCallback(code) {
        const oauth2Client = new google.auth.OAuth2(
            process.env.GOOGLE_CLIENT_ID,
            process.env.GOOGLE_CLIENT_SECRET,
            process.env.GOOGLE_REDIRECT_URI
        )

        // Exchange code for tokens
        const { tokens } = await oauth2Client.getToken(code)
        oauth2Client.setCredentials(tokens)

        // Get user info
        const oauth2 = google.oauth2({ version: 'v2', auth: oauth2Client })
        const { data } = await oauth2.userinfo.get()

        // Find or create user
        let user = await User.findOne({
            $or: [{ googleId: data.id }, { email: data.email }],
        })

        if (!user) {
            // Create new user from Google
            user = await User.create({
                name: data.name,
                email: data.email,
                avatar: data.picture,
                role: UserRole.STUDENT,
                authProvider: AuthProvider.GOOGLE,
                googleId: data.id,
                isEmailVerified: true, // Google already verified
                phone: '01700000000', // Placeholder, will be updated in profile
            })
        } else if (!user.googleId) {
            // Link Google account to existing user
            user.googleId = data.id
            user.authProvider = AuthProvider.GOOGLE
            user.isEmailVerified = true
            await user.save()
        }

        // Generate JWT tokens
        const accessToken = SecureAuthService.generateAccessToken(
            user._id.toString(),
            user.role
        )
        const refreshToken = SecureAuthService.generateRefreshToken(user._id.toString())

        return {
            accessToken,
            refreshToken,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                avatar: user.avatar,
            },
        }
    }

    // ============ FACEBOOK OAUTH ============

    static getFacebookAuthUrl() {
        const clientId = process.env.FACEBOOK_CLIENT_ID
        const redirectUri = encodeURIComponent(process.env.FACEBOOK_REDIRECT_URI)

        return `https://www.facebook.com/v18.0/dialog/oauth?client_id=${clientId}&redirect_uri=${redirectUri}&scope=email,public_profile`
    }

    static async handleFacebookCallback(code) {
        // Exchange code for access token
        const tokenUrl = `https://graph.facebook.com/v18.0/oauth/access_token?` +
            `client_id=${process.env.FACEBOOK_CLIENT_ID}&` +
            `redirect_uri=${process.env.FACEBOOK_REDIRECT_URI}&` +
            `client_secret=${process.env.FACEBOOK_CLIENT_SECRET}&` +
            `code=${code}`

        const tokenResponse = await fetch(tokenUrl)
        const tokenData = await tokenResponse.json()

        if (!tokenData.access_token) {
            throw new Error('Failed to get Facebook access token')
        }

        // Get user info
        const userUrl = `https://graph.facebook.com/me?fields=id,name,email,picture&access_token=${tokenData.access_token}`
        const userResponse = await fetch(userUrl)
        const userData = await userResponse.json()

        if (!userData.email) {
            throw new Error('Email permission not granted by Facebook')
        }

        // Find or create user
        let user = await User.findOne({
            $or: [{ facebookId: userData.id }, { email: userData.email }],
        })

        if (!user) {
            // Create new user from Facebook
            user = await User.create({
                name: userData.name,
                email: userData.email,
                avatar: userData.picture?.data?.url,
                role: UserRole.STUDENT,
                authProvider: AuthProvider.FACEBOOK,
                facebookId: userData.id,
                isEmailVerified: true,
                phone: '01700000000', // Placeholder
            })
        } else if (!user.facebookId) {
            // Link Facebook account to existing user
            user.facebookId = userData.id
            user.authProvider = AuthProvider.FACEBOOK
            user.isEmailVerified = true
            await user.save()
        }

        // Generate JWT tokens
        const accessToken = SecureAuthService.generateAccessToken(
            user._id.toString(),
            user.role
        )
        const refreshToken = SecureAuthService.generateRefreshToken(user._id.toString())

        return {
            accessToken,
            refreshToken,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                avatar: user.avatar,
            },
        }
    }

    // ============ GITHUB OAUTH (Bonus) ============

    static getGitHubAuthUrl() {
        const clientId = process.env.GITHUB_CLIENT_ID
        return `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=user:email`
    }

    static async handleGitHubCallback(code) {
        // Exchange code for token
        const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            body: JSON.stringify({
                client_id: process.env.GITHUB_CLIENT_ID,
                client_secret: process.env.GITHUB_CLIENT_SECRET,
                code,
            }),
        })

        const tokenData = await tokenResponse.json()

        if (!tokenData.access_token) {
            throw new Error('Failed to get GitHub access token')
        }

        // Get user info
        const userResponse = await fetch('https://api.github.com/user', {
            headers: { Authorization: `Bearer ${tokenData.access_token}` },
        })
        const userData = await userResponse.json()

        // Get email (separate endpoint)
        const emailResponse = await fetch('https://api.github.com/user/emails', {
            headers: { Authorization: `Bearer ${tokenData.access_token}` },
        })
        const emails = await emailResponse.json()
        const primaryEmail = emails.find((e) => e.primary)?.email

        if (!primaryEmail) {
            throw new Error('Email not found in GitHub account')
        }

        // Find or create user
        let user = await User.findOne({
            $or: [{ githubId: userData.id }, { email: primaryEmail }],
        })

        if (!user) {
            user = await User.create({
                name: userData.name || userData.login,
                email: primaryEmail,
                avatar: userData.avatar_url,
                role: UserRole.STUDENT,
                authProvider: AuthProvider.GITHUB,
                githubId: userData.id.toString(),
                isEmailVerified: true,
                phone: '01700000000',
            })
        } else if (!user.githubId) {
            user.githubId = userData.id.toString()
            user.authProvider = AuthProvider.GITHUB
            user.isEmailVerified = true
            await user.save()
        }

        // Generate JWT tokens
        const accessToken = SecureAuthService.generateAccessToken(
            user._id.toString(),
            user.role
        )
        const refreshToken = SecureAuthService.generateRefreshToken(user._id.toString())

        return {
            accessToken,
            refreshToken,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                avatar: user.avatar,
            },
        }
    }
}

export default SocialAuthService
