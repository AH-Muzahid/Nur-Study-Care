import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import EmailProvider from 'next-auth/providers/email'
import { MongoDBAdapter } from '@auth/mongodb-adapter'
import clientPromise from '@/lib/mongodb-client'
import { authConfig } from '@/auth.config'

export const { handlers, signIn, signOut, auth } = NextAuth({
    ...authConfig,
    adapter: MongoDBAdapter(clientPromise),
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Email and password required')
                }

                // Dynamic imports to avoid edge runtime issues
                const { default: connectDB } = await import('@/lib/mongoose')
                const { default: User } = await import('@/models/User')
                const bcrypt = await import('bcryptjs')

                await connectDB()

                // Find user
                const user = await User.findOne({ email: credentials.email }).select('+password')

                if (!user) {
                    throw new Error('Invalid email or password')
                }

                // Check if user is active
                if (!user.isActive) {
                    throw new Error('Account is inactive. Please contact support.')
                }

                // Verify password
                const isPasswordValid = await bcrypt.compare(credentials.password, user.password)

                if (!isPasswordValid) {
                    throw new Error('Invalid email or password')
                }

                // Return user object (without password)
                return {
                    id: user._id.toString(),
                    email: user.email,
                    name: user.name,
                    role: user.role,
                    avatar: user.avatar,
                }
            },
        }),

        EmailProvider({
            server: {
                host: process.env.EMAIL_SERVER_HOST,
                port: process.env.EMAIL_SERVER_PORT,
                auth: {
                    user: process.env.EMAIL_SERVER_USER,
                    pass: process.env.EMAIL_SERVER_PASSWORD,
                },
            },
            from: process.env.EMAIL_FROM,
        }),

        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: 'consent',
                    access_type: 'offline',
                    response_type: 'code',
                },
            },
        }),
    ],

    callbacks: {
        async signIn({ user, account, profile }) {
            try {
                // For OAuth providers, create/update user in our custom User model
                if (account?.provider === 'google' || account?.provider === 'facebook') {
                    // Dynamic imports to avoid edge runtime issues
                    const { default: connectDB } = await import('@/lib/mongoose')
                    const { default: User } = await import('@/models/User')

                    await connectDB()

                    const existingUser = await User.findOne({ email: user.email })

                    if (!existingUser) {
                        // Create new user with default STUDENT role
                        await User.create({
                            email: user.email,
                            name: user.name,
                            avatar: user.image,
                            phone: '01700000000', // Default phone for OAuth users
                            role: 'STUDENT',
                            isActive: true,
                            googleId: account.provider === 'google' ? profile?.sub : undefined,
                            facebookId: account.provider === 'facebook' ? profile?.id : undefined,
                            isEmailVerified: true,
                            authProvider: account.provider === 'google' ? 'GOOGLE' : 'FACEBOOK',
                        })
                    } else {
                        // Update existing user with OAuth info
                        const updates = {
                            avatar: user.image,
                            isEmailVerified: true
                        }

                        if (account.provider === 'google' && !existingUser.googleId) {
                            updates.googleId = profile?.sub
                        }
                        if (account.provider === 'facebook' && !existingUser.facebookId) {
                            updates.facebookId = profile?.id
                        }

                        await User.findByIdAndUpdate(existingUser._id, updates)
                    }
                }

                return true
            } catch (error) {
                console.error('SignIn callback error:', error)
                return false
            }
        },

        async jwt({ token, user, account }) {
            try {
                // Add custom fields to JWT token
                if (user) {
                    // Dynamic imports to avoid edge runtime issues
                    const { default: connectDB } = await import('@/lib/mongoose')
                    const { default: User } = await import('@/models/User')

                    await connectDB()
                    const dbUser = await User.findOne({ email: user.email })

                    if (dbUser) {
                        token.id = dbUser._id.toString()
                        token.role = dbUser.role
                        token.avatar = dbUser.avatar
                    }
                }
            } catch (error) {
                console.error('JWT callback error:', error)
            }

            return token
        },

        async session({ session, token }) {
            // Add custom fields to session
            if (token) {
                session.user.id = token.id
                session.user.role = token.role
                session.user.avatar = token.avatar
            }

            return session
        },

        async redirect({ url, baseUrl }) {
            // Role-based redirect after login
            if (url.startsWith('/')) return url
            if (new URL(url).origin === baseUrl) return url
            return baseUrl
        },
    },

    session: {
        strategy: 'jwt',
        maxAge: 7 * 24 * 60 * 60, // 7 days
    },

    secret: process.env.JWT_SECRET,

    debug: process.env.NODE_ENV === 'development',
})
