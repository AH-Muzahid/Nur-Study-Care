'use client'

import { useAuthStore } from '@/store/authStore'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import { authAPI } from '@/lib/api-client'
import { toast } from 'sonner'
import { getDashboardPath } from '@/lib/helpers'

/**
 * Custom hook for authentication operations
 */
export function useAuth() {
    const router = useRouter()
    const { user, isAuthenticated, setUser, logout: clearAuth } = useAuthStore()

    /**
     * Login user
     */
    const login = useCallback(async (credentials) => {
        try {
            const data = await authAPI.login(credentials)

            setUser(data.user)
            toast.success('Login successful!')

            // Redirect to appropriate dashboard
            const path = getDashboardPath(data.user.role)
            router.push(path)

            return data
        } catch (error) {
            toast.error(error.message || 'Failed to login')
            throw error
        }
    }, [router, setUser])

    /**
     * Register new user
     */
    const register = useCallback(async (userData) => {
        try {
            const data = await authAPI.register(userData)
            setUser(data.user)
            toast.success('Registration successful!')

            const path = getDashboardPath(data.user.role)
            router.push(path)

            return data
        } catch (error) {
            toast.error(error.message || 'Failed to register')
            throw error
        }
    }, [router, setUser])

    /**
     * Logout user
     */
    const logout = useCallback(async () => {
        try {
            await authAPI.logout()
            clearAuth()
            toast.success('Logged out successfully')
            router.push('/login')
        } catch (error) {
            toast.error('Logout failed')
            console.error(error)
        }
    }, [router, clearAuth])

    /**
     * Verify authentication status
     */
    const verify = useCallback(async () => {
        try {
            const data = await authAPI.verify()
            setUser(data.user)
            return data.user
        } catch (error) {
            clearAuth()
            throw error
        }
    }, [setUser, clearAuth])

    return {
        user,
        isAuthenticated,
        login,
        register,
        logout,
        verify,
    }
}
