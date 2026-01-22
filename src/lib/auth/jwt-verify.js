import jwt from 'jsonwebtoken'
import { getRedis } from '@/lib/redis'

/**
 * Verify JWT token from cookies and return decoded payload
 * @param {Request} request - Next.js request object
 * @returns {Promise<Object>} Decoded token payload with userId and role
 * @throws {Error} If token is invalid or blacklisted
 */
export async function verifyAuthToken(request) {
    // Get token from cookies
    const token = request.cookies.get('auth_token')?.value

    if (!token) {
        throw new Error('Authentication required')
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        // Check if token is blacklisted
        const redis = getRedis()
        const isBlacklisted = await redis.exists(`blacklist:${decoded.jti}`)

        if (isBlacklisted) {
            throw new Error('Token has been invalidated')
        }

        return decoded
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            throw new Error('Token has expired')
        }
        if (error.name === 'JsonWebTokenError') {
            throw new Error('Invalid token')
        }
        throw error
    }
}

/**
 * Check if user has required role
 * @param {string} userRole - User's role from token
 * @param {string[]} allowedRoles - Array of allowed roles
 * @returns {boolean}
 */
export function checkRole(userRole, allowedRoles) {
    return allowedRoles.includes(userRole)
}
