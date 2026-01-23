/**
 * Rate Limiting Utility
 * Simple in-memory rate limiter for authentication endpoints
 */

const rateLimitMap = new Map()

// Configuration
const RATE_LIMIT_CONFIG = {
    login: {
        maxAttempts: 5,
        windowMs: 15 * 60 * 1000, // 15 minutes
    },
    register: {
        maxAttempts: 3,
        windowMs: 60 * 60 * 1000, // 1 hour
    },
    passwordReset: {
        maxAttempts: 3,
        windowMs: 60 * 60 * 1000, // 1 hour
    },
}

/**
 * Check if request should be rate limited
 * @param {string} identifier - Unique identifier (IP + endpoint)
 * @param {string} type - Rate limit type ('login', 'register', etc.)
 * @returns {Object} { allowed: boolean, retryAfter?: number }
 */
export function checkRateLimit(identifier, type = 'login') {
    const config = RATE_LIMIT_CONFIG[type]
    if (!config) {
        console.warn(`Unknown rate limit type: ${type}`)
        return { allowed: true }
    }

    const now = Date.now()
    const key = `${type}:${identifier}`

    // Get or create rate limit entry
    let entry = rateLimitMap.get(key)

    if (!entry) {
        entry = {
            count: 0,
            resetTime: now + config.windowMs,
        }
        rateLimitMap.set(key, entry)
    }

    // Reset if window has passed
    if (now > entry.resetTime) {
        entry.count = 0
        entry.resetTime = now + config.windowMs
    }

    // Check if limit exceeded
    if (entry.count >= config.maxAttempts) {
        const retryAfter = Math.ceil((entry.resetTime - now) / 1000)
        return {
            allowed: false,
            retryAfter,
            message: `Too many attempts. Please try again in ${Math.ceil(retryAfter / 60)} minutes.`,
        }
    }

    // Increment counter
    entry.count++

    return { allowed: true }
}

/**
 * Reset rate limit for an identifier
 * @param {string} identifier - Unique identifier
 * @param {string} type - Rate limit type
 */
export function resetRateLimit(identifier, type = 'login') {
    const key = `${type}:${identifier}`
    rateLimitMap.delete(key)
}

/**
 * Get client identifier from request
 * @param {Request} request - Next.js request object
 * @returns {string} Client identifier
 */
export function getClientIdentifier(request) {
    // Try to get real IP from various headers
    const forwarded = request.headers.get('x-forwarded-for')
    const realIp = request.headers.get('x-real-ip')
    const cfConnectingIp = request.headers.get('cf-connecting-ip')

    const ip =
        cfConnectingIp ||
        realIp ||
        (forwarded ? forwarded.split(',')[0].trim() : null) ||
        'unknown'

    return ip
}

/**
 * Clean up old entries periodically
 * This prevents memory leaks in production
 */
setInterval(() => {
    const now = Date.now()
    for (const [key, entry] of rateLimitMap.entries()) {
        if (now > entry.resetTime + 60000) { // 1 minute after reset
            rateLimitMap.delete(key)
        }
    }
}, 60000) // Run every minute
