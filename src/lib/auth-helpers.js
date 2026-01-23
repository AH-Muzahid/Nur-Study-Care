import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

const JWT_SECRET = process.env.JWT_SECRET

if (!JWT_SECRET) {
    throw new Error('Please define the JWT_SECRET environment variable inside .env.local')
}

export function signToken(payload) {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' })
}

export function verifyToken(token) {
    try {
        return jwt.verify(token, JWT_SECRET)
    } catch (error) {
        return null
    }
}

export async function createSession(user) {
    // Minimal payload to reduce size and exposure
    // 'sub' (subject) is standard for user ID
    const token = signToken({
        sub: user._id.toString(),
        role: user.role,
        // No PII like email/name in token
    })

    const cookieStore = await cookies()

    // Determine domain (optional, be careful with localhost)
    // const domain = process.env.COOKIE_DOMAIN || undefined

    cookieStore.set('auth_token', token, {
        httpOnly: true,
        // Always use secure in production, and usually fine in modern dev (localhost)
        // Check if using HTTPS or standard localhost
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict', // CSRF protection
        maxAge: 7 * 24 * 60 * 60, // 7 days (consider lowering/using refresh tokens)
        path: '/',
    })

    return token
}

export async function removeSession() {
    const cookieStore = await cookies()
    cookieStore.delete('auth_token')
}

export async function getSession() {
    const cookieStore = await cookies()
    const token = cookieStore.get('auth_token')?.value

    if (!token) return null

    return verifyToken(token)
}
