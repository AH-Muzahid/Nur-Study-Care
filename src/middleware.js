import { NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

// Public routes that don't require authentication
const PUBLIC_ROUTES = [
  '/',
  '/login',
  '/register',
  '/about',
  '/contact',
  '/courses',
  '/unauthorized',
]

// API routes that don't require authentication
const PUBLIC_API_ROUTES = [
  '/api/auth/login',
  '/api/auth/register',
  '/api/auth/google-signin',
  '/api/courses', // GET only for public viewing
  '/api/site-content', // Public CMS content
]

// Role-based route protection
const ROLE_ROUTES = {
  ADMIN: ['/admin', '/api/admin', '/api/users', '/api/analytics', '/api/site-content'],
  TEACHER: ['/teacher', '/api/teacher'],
  STUDENT: ['/student', '/api/enrollments/my', '/api/payments/my'],
}

async function verifyAuth(request) {
  const token = request.cookies.get('auth_token')?.value

  if (!token) {
    return null
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET)
    const { payload } = await jwtVerify(token, secret)
    return payload
  } catch (error) {
    console.error('JWT verification failed:', error)
    return null
  }
}

function isPublicRoute(pathname) {
  return PUBLIC_ROUTES.some(route => pathname === route || pathname.startsWith(route + '/'))
}

function isPublicAPIRoute(pathname, method) {
  // Allow GET requests to courses API for public viewing
  if (pathname.startsWith('/api/courses') && method === 'GET') {
    return true
  }

  return PUBLIC_API_ROUTES.some(route => pathname.startsWith(route))
}

function hasAccess(userRole, pathname) {
  // Check if route requires specific role
  for (const [role, routes] of Object.entries(ROLE_ROUTES)) {
    if (routes.some(route => pathname.startsWith(route))) {
      return userRole === role
    }
  }

  // If no specific role required, allow authenticated users
  return true
}

export async function middleware(request) {
  const { pathname } = request.nextUrl
  const method = request.method

  // Skip middleware for static files and Next.js internals
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api/_next') ||
    pathname.includes('/favicon.ico') ||
    pathname.includes('/images/') ||
    pathname.includes('/public/')
  ) {
    return NextResponse.next()
  }

  // Check if route is public
  const isPublic = pathname.startsWith('/api')
    ? isPublicAPIRoute(pathname, method)
    : isPublicRoute(pathname)

  if (isPublic) {
    return NextResponse.next()
  }

  // Verify authentication
  const session = await verifyAuth(request)

  if (!session) {
    // Not authenticated
    if (pathname.startsWith('/api')) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      )
    } else {
      const url = request.nextUrl.clone()
      url.pathname = '/login'
      url.searchParams.set('redirect', pathname)
      return NextResponse.redirect(url)
    }
  }

  // Check role-based access
  if (!hasAccess(session.role, pathname)) {
    if (pathname.startsWith('/api')) {
      return NextResponse.json(
        { success: false, message: 'Forbidden: Insufficient permissions' },
        { status: 403 }
      )
    } else {
      const url = request.nextUrl.clone()
      url.pathname = '/unauthorized'
      return NextResponse.redirect(url)
    }
  }

  // Add user info to request headers for API routes
  if (pathname.startsWith('/api')) {
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('x-user-id', session.id || session.sub)
    requestHeaders.set('x-user-role', session.role)

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    })
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
