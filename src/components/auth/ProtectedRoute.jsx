'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import { getDashboardPath } from '@/lib/helpers'

/**
 * ProtectedRoute - Client-side route protection with role-based access control
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components to render if authorized
 * @param {string[]} props.allowedRoles - Array of roles allowed to access this route (e.g., ['ADMIN', 'TEACHER'])
 * @param {boolean} props.requireAuth - Whether authentication is required (default: true)
 */
export function ProtectedRoute({ children, allowedRoles = [], requireAuth = true }) {
    const router = useRouter()
    const { user, isAuthenticated } = useAuthStore()
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])


    // Check role-based access
    useEffect(() => {
        if (!isMounted) return

        // 1. Not Authenticated
        if (requireAuth && !isAuthenticated) {
            router.replace(`/login?redirect=${encodeURIComponent(window.location.pathname)}`)
            return
        }

        // 2. Insufficient Permissions
        if (requireAuth && isAuthenticated && allowedRoles.length > 0) {
            if (!user || !allowedRoles.includes(user.role)) {
                if (user) {
                    const params = new URLSearchParams(window.location.search)
                    const redirect = params.get('redirect')
                    // If there's a redirect param and we have access to it, go there
                    // Otherwise go to dashboard
                    if (redirect && !redirect.startsWith('/api')) {
                        router.replace(redirect)
                    } else {
                        const correctDashboard = getDashboardPath(user.role)
                        // Only redirect if we're not already there
                        if (window.location.pathname !== correctDashboard) {
                            router.replace(correctDashboard)
                        }
                    }
                } else {
                    router.replace('/unauthorized')
                }
            }
        }
    }, [isAuthenticated, user, allowedRoles, requireAuth, router, isMounted])

    if (!isMounted) return null

    // Show loading state while checking auth
    if (requireAuth && !isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-gray-500">Checking Access...</p>
                </div>
            </div>
        )
    }

    // Show loading state while checking role
    if (requireAuth && isAuthenticated && allowedRoles.length > 0) {
        if (!user || !allowedRoles.includes(user.role)) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-gray-50">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mx-auto mb-4"></div>
                        <p className="text-gray-500">Verifying Permissions...</p>
                    </div>
                </div>
            )
        }
    }

    return <>{children}</>
}
