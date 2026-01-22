'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import { getDashboardPath, hasPermission } from '@/lib/helpers'

/**
 * Hook to protect routes and redirect unauthorized users
 * @param {Array<string>} allowedRoles - Roles that can access the route
 */
export function useRoleProtection(allowedRoles = []) {
    const router = useRouter()
    const { user, isAuthenticated } = useAuthStore()

    useEffect(() => {
        // Not authenticated, redirect to login
        if (!isAuthenticated || !user) {
            router.push('/login')
            return
        }

        // Check if user has required role
        if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
            // Redirect to their own dashboard
            const path = getDashboardPath(user.role)
            router.push(path)
        }
    }, [user, isAuthenticated, allowedRoles, router])

    return { user, isAuthenticated }
}

/**
 * Hook to redirect authenticated users away from auth pages
 */
export function useGuestOnly() {
    const router = useRouter()
    const { user, isAuthenticated } = useAuthStore()

    useEffect(() => {
        if (isAuthenticated && user) {
            const path = getDashboardPath(user.role)
            router.push(path)
        }
    }, [user, isAuthenticated, router])
}

/**
 * Hook to check if user has permission for an action
 * @param {string} requiredRole - Minimum required role
 * @returns {boolean} Has permission
 */
export function usePermission(requiredRole) {
    const { user } = useAuthStore()
    return hasPermission(user?.role, requiredRole)
}
