import { verify } from 'jsonwebtoken'
import { NextResponse } from 'next/server'

/**
 * Verify JWT token from request headers
 * @param {Request} request - Next.js request object
 * @returns {Object} Decoded token payload or null
 */
export async function verifyAuthToken(request) {
    try {
        const authHeader = request.headers.get('authorization')

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return null
        }

        const token = authHeader.substring(7) // Remove 'Bearer ' prefix

        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is not configured')
        }

        const decoded = verify(token, process.env.JWT_SECRET)
        return decoded
    } catch (error) {
        console.error('JWT verification failed:', error.message)
        return null
    }
}

/**
 * Check if user has required role
 * @param {Object} user - Decoded user object from JWT
 * @param {string|string[]} requiredRoles - Required role(s)
 * @returns {boolean} Whether user has required role
 */
export function checkRole(user, requiredRoles) {
    if (!user) return false

    const roles = Array.isArray(requiredRoles) ? requiredRoles : [requiredRoles]
    return roles.includes(user.role)
}

/**
 * Middleware helper to verify auth and return user or error response
 * @param {Request} request
 * @returns {Object} { user, error } - Either user object or error response
 */
export async function verifyAuth(request) {
    const user = await verifyAuthToken(request)

    if (!user) {
        return {
            user: null,
            error: NextResponse.json(
                { error: 'Unauthorized - Invalid or missing token' },
                { status: 401 }
            )
        }
    }

    return { user, error: null }
}

/**
 * Middleware helper to verify auth and check role
 * @param {Request} request
 * @param {string|string[]} requiredRoles
 * @returns {Object} { user, error } - Either user object or error response
 */
export async function verifyAuthWithRole(request, requiredRoles) {
    const { user, error } = await verifyAuth(request)

    if (error) return { user: null, error }

    if (!checkRole(user, requiredRoles)) {
        return {
            user: null,
            error: NextResponse.json(
                { error: 'Forbidden - Insufficient permissions' },
                { status: 403 }
            )
        }
    }

    return { user, error: null }
}
