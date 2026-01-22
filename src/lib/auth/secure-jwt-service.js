import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import { getCacheClient } from '@/lib/redis'
import { AUTH_CONFIG } from '@/constants/config'

export class SecureAuthService {
    // 1. Hash password with bcrypt (12 rounds for security)
    static async hashPassword(password) {
        const salt = await bcrypt.genSalt(12)
        return await bcrypt.hash(password, salt)
    }

    // 2. Compare password
    static async comparePassword(password, hashedPassword) {
        return await bcrypt.compare(password, hashedPassword)
    }

    // 3. Generate Access Token (short-lived)
    static generateAccessToken(userId, role) {
        return jwt.sign(
            {
                userId,
                role,
                type: 'access',
                iat: Math.floor(Date.now() / 1000),
                jti: crypto.randomUUID(), // Unique token ID for blacklisting
            },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_ACCESS_EXPIRY || '15m',
                algorithm: 'HS256',
                issuer: 'nur-study-care',
                audience: 'nur-study-care-users',
            }
        )
    }

    // 4. Generate Refresh Token (long-lived)
    static generateRefreshToken(userId) {
        return jwt.sign(
            {
                userId,
                type: 'refresh',
                jti: crypto.randomUUID(),
            },
            process.env.JWT_REFRESH_SECRET,
            {
                expiresIn: process.env.JWT_REFRESH_EXPIRY || '7d',
                algorithm: 'HS256',
            }
        )
    }

    // 5. Verify Access Token
    static async verifyAccessToken(token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET, {
                algorithms: ['HS256'],
                issuer: 'nur-study-care',
                audience: 'nur-study-care-users',
            })

            // Check if token is blacklisted
            const isBlacklisted = await this.isTokenBlacklisted(decoded.jti)
            if (isBlacklisted) {
                throw new Error('Token has been revoked')
            }

            return decoded
        } catch (error) {
            throw new Error('Invalid or expired token')
        }
    }

    // 6. Verify Refresh Token
    static async verifyRefreshToken(token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET, {
                algorithms: ['HS256'],
            })

            // Check if token is blacklisted
            const isBlacklisted = await this.isTokenBlacklisted(decoded.jti)
            if (isBlacklisted) {
                throw new Error('Refresh token has been revoked')
            }

            return decoded
        } catch (error) {
            throw new Error('Invalid or expired refresh token')
        }
    }

    // 7. Blacklist Token (for logout/security)
    static async blacklistToken(jti, expiresIn = 900) {
        const cache = getCacheClient()
        if (cache) {
            await cache.setex(`blacklist:${jti}`, expiresIn, '1')
        }
    }

    // 8. Check if token is blacklisted
    static async isTokenBlacklisted(jti) {
        const cache = getCacheClient()
        if (!cache) return false

        const result = await cache.exists(`blacklist:${jti}`)
        return result === 1
    }

    // 9. Rate Limiting - Check login attempts by IP
    static async checkRateLimit(ip) {
        const cache = getCacheClient()
        if (!cache) return true // Skip if no cache

        const key = `login_attempts:${ip}`
        const attempts = await cache.incr(key)

        if (attempts === 1) {
            // Set expiry on first attempt
            await cache.expire(key, AUTH_CONFIG.rateLimitWindow / 1000) // Convert to seconds
        }

        if (attempts > AUTH_CONFIG.rateLimitMaxRequests) {
            throw new Error(
                `Too many login attempts. Please try again in ${AUTH_CONFIG.rateLimitWindow / 60000} minutes`
            )
        }

        return true
    }

    // 10. Record failed login attempt
    static async recordFailedLogin(user) {
        user.failedLoginAttempts = (user.failedLoginAttempts || 0) + 1
        user.lastFailedLogin = new Date()

        if (user.failedLoginAttempts >= AUTH_CONFIG.maxLoginAttempts) {
            user.isLocked = true
            user.lockedUntil = new Date(Date.now() + AUTH_CONFIG.accountLockoutDuration)
        }

        await user.save()
    }

    // 11. Reset failed login attempts
    static async resetFailedLoginAttempts(user) {
        user.failedLoginAttempts = 0
        user.lastFailedLogin = null
        user.isLocked = false
        user.lockedUntil = null
        await user.save()
    }

    // 12. Validate password strength
    static validatePasswordStrength(password) {
        const minLength = AUTH_CONFIG.passwordMinLength
        const hasUpperCase = /[A-Z]/.test(password)
        const hasLowerCase = /[a-z]/.test(password)
        const hasNumbers = /\d/.test(password)
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)

        if (password.length < minLength) {
            throw new Error(`Password must be at least ${minLength} characters`)
        }
        if (!hasUpperCase || !hasLowerCase) {
            throw new Error('Password must contain uppercase and lowercase letters')
        }
        if (!hasNumbers) {
            throw new Error('Password must contain at least one number')
        }
        if (!hasSpecialChar) {
            throw new Error('Password must contain at least one special character')
        }

        return true
    }

    // 13. Generate CSRF Token
    static generateCsrfToken() {
        return crypto.randomBytes(32).toString('hex')
    }

    // 14. Store token metadata (IP, User-Agent)
    static async storeTokenMetadata(jti, ip, userAgent) {
        const cache = getCacheClient()
        if (!cache) return

        await cache.setex(`token_ip:${jti}`, 900, ip) // 15 minutes
        await cache.setex(`token_ua:${jti}`, 900, userAgent)
    }

    // 15. Validate token metadata
    static async validateTokenMetadata(jti, currentIp, currentUA) {
        const cache = getCacheClient()
        if (!cache) return true

        const tokenIp = await cache.get(`token_ip:${jti}`)
        const tokenUA = await cache.get(`token_ua:${jti}`)

        // Log suspicious activity but don't block (can be strict in production)
        if (tokenIp && tokenIp !== currentIp) {
            console.warn(`IP mismatch for token ${jti}`)
        }
        if (tokenUA && tokenUA !== currentUA) {
            console.warn(`User-Agent mismatch for token ${jti}`)
        }

        return true
    }
}

export default SecureAuthService
