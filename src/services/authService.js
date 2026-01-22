import { connectDB } from '@/lib/mongoose'
import User from '@/models/User'
import { SecureAuthService } from '@/lib/auth/secure-jwt-service'
import { registerSchema, loginSchema } from '@/lib/validations'
import logger from '@/lib/logger'

export class AuthService {
    // Register new user
    static async register(data) {
        try {
            await connectDB()

            // Validate input
            const validated = registerSchema.parse(data)

            // Check if user already exists
            const existingUser = await User.findOne({ email: validated.email })
            if (existingUser) {
                throw new Error('Email already registered')
            }

            // Validate password strength
            SecureAuthService.validatePasswordStrength(validated.password)

            // Create user (password will be hashed by User model middleware)
            const user = await User.create(validated)

            // Generate tokens
            const accessToken = SecureAuthService.generateAccessToken(
                user._id.toString(),
                user.role
            )
            const refreshToken = SecureAuthService.generateRefreshToken(user._id.toString())

            logger.info({ userId: user._id }, 'User registered successfully')

            return {
                success: true,
                accessToken,
                refreshToken,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                },
            }
        } catch (error) {
            logger.error({ error }, 'Registration failed')
            throw error
        }
    }

    // Login user
    static async login(credentials, ip, userAgent) {
        try {
            await connectDB()

            // Validate input
            const validated = loginSchema.parse(credentials)

            // Rate limiting check
            await SecureAuthService.checkRateLimit(ip)

            // Find user with password field
            const user = await User.findOne({ email: validated.email }).select('+password')

            if (!user) {
                throw new Error('Invalid email or password')
            }

            // Check if account is locked
            if (user.isAccountLocked()) {
                throw new Error(
                    `Account is locked due to too many failed attempts. Please try again later.`
                )
            }

            // Verify password
            const isPasswordValid = await user.comparePassword(validated.password)

            if (!isPasswordValid) {
                await SecureAuthService.recordFailedLogin(user)
                throw new Error('Invalid email or password')
            }

            // Check if account is active
            if (!user.isActive) {
                throw new Error('Account is deactivated. Please contact support.')
            }

            // Reset failed login attempts
            await SecureAuthService.resetFailedLoginAttempts(user)

            // Generate tokens
            const accessToken = SecureAuthService.generateAccessToken(
                user._id.toString(),
                user.role
            )
            const refreshToken = SecureAuthService.generateRefreshToken(user._id.toString())

            // Generate CSRF token
            const csrfToken = SecureAuthService.generateCsrfToken()

            // Store token metadata
            const decoded = await SecureAuthService.verifyAccessToken(accessToken)
            await SecureAuthService.storeTokenMetadata(decoded.jti, ip, userAgent)

            logger.info({ userId: user._id }, 'User logged in successfully')

            return {
                success: true,
                accessToken,
                refreshToken,
                csrfToken,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    avatar: user.avatar,
                },
            }
        } catch (error) {
            logger.error({ error }, 'Login failed')
            throw error
        }
    }

    // Refresh access token
    static async refreshToken(refreshToken) {
        try {
            await connectDB()

            // Verify refresh token
            const decoded = await SecureAuthService.verifyRefreshToken(refreshToken)

            // Find user
            const user = await User.findById(decoded.userId)

            if (!user || !user.isActive) {
                throw new Error('User not found or inactive')
            }

            // Generate new access token
            const newAccessToken = SecureAuthService.generateAccessToken(
                user._id.toString(),
                user.role
            )

            return {
                success: true,
                accessToken: newAccessToken,
            }
        } catch (error) {
            logger.error({ error }, 'Token refresh failed')
            throw error
        }
    }

    // Logout user
    static async logout(accessToken, refreshToken) {
        try {
            // Blacklist both tokens
            const accessDecoded = await SecureAuthService.verifyAccessToken(accessToken)
            const refreshDecoded = await SecureAuthService.verifyRefreshToken(refreshToken)

            await SecureAuthService.blacklistToken(accessDecoded.jti, 900) // 15 minutes
            await SecureAuthService.blacklistToken(refreshDecoded.jti, 604800) // 7 days

            logger.info({ userId: accessDecoded.userId }, 'User logged out successfully')

            return {
                success: true,
                message: 'Logged out successfully',
            }
        } catch (error) {
            logger.error({ error }, 'Logout failed')
            throw error
        }
    }

    // Verify token and get user
    static async verifyToken(token) {
        try {
            await connectDB()

            const decoded = await SecureAuthService.verifyAccessToken(token)

            const user = await User.findById(decoded.userId)

            if (!user || !user.isActive) {
                throw new Error('User not found or inactive')
            }

            return {
                success: true,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    avatar: user.avatar,
                },
            }
        } catch (error) {
            throw error
        }
    }
}

export default AuthService
