import { NextResponse } from 'next/server'
import NextAuth from 'next-auth'
import { authConfig } from '@/auth.config'

const { auth } = NextAuth(authConfig)

// Rate limiting map (in-memory fallback)
const rateLimit = new Map()

export default auth(async (req) => {
  const response = NextResponse.next()

  // 🛡️ 1. Security Headers
  response.headers.set('X-Frame-Options', 'DENY') // Clickjacking protection
  response.headers.set('X-Content-Type-Options', 'nosniff') // MIME sniffing protection
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://accounts.google.com https://connect.facebook.net; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:;"
  )
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), browsing-topics=()'
  )

  // 🛡️ 2. Simple Rate Limiting (Login/Register only)
  if (
    req.nextUrl.pathname.startsWith('/api/auth/callback/credentials') ||
    req.nextUrl.pathname === '/api/auth/register'
  ) {
    const ip = req.headers.get('x-forwarded-for') || 'unknown'
    const now = Date.now()
    const windowMs = 15 * 60 * 1000 // 15 minutes
    const maxReqs = 20 // 20 attempts per 15 min

    const record = rateLimit.get(ip) || { count: 0, startTime: now }

    if (now - record.startTime > windowMs) {
      // Reset window
      rateLimit.set(ip, { count: 1, startTime: now })
    } else {
      record.count++
      rateLimit.set(ip, record)

      if (record.count > maxReqs) {
        return NextResponse.json(
          { error: 'Too many requests. Please try again later.' },
          { status: 429 }
        )
      }
    }
  }

  return response
})

export const config = {
  matcher: [
    // Protect dashboard routes
    '/student/:path*',
    '/teacher/:path*',
    '/admin/:path*',
    // Intercept auth routes for rate limiting
    '/api/auth/:path*',
  ],
}
