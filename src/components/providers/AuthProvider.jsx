'use client'

import { useEffect, useState } from 'react'
import { useAuthStore } from '@/store/authStore'
import { authAPI } from '@/lib/api-client'

/**
 * AuthProvider - Handles authentication state persistence and verification
 * This component ensures auth state is properly hydrated on app load
 */
export function AuthProvider({ children }) {
    const [isHydrated, setIsHydrated] = useState(false)
    const [isVerifying, setIsVerifying] = useState(false)
    const { user, setUser, logout } = useAuthStore()

    // 1. Handle Hydration
    useEffect(() => {
        const unsubscribe = useAuthStore.persist.onFinishHydration(() => {
            setIsHydrated(true)
        })

        if (useAuthStore.persist.hasHydrated()) {
            setIsHydrated(true)
        } else {
            useAuthStore.persist.rehydrate()
        }

        return unsubscribe
    }, [])

    // 2. Verify Session (Only runs once after hydration)
    useEffect(() => {
        const verifySession = async () => {
            if (!isHydrated) return

            // If we have a user in local state, verify token is still valid
            if (user) {
                setIsVerifying(true)
                try {
                    const data = await authAPI.verify()
                    if (data.user) {
                        // Only update if data actually changed to prevent re-renders
                        if (JSON.stringify(data.user) !== JSON.stringify(user)) {
                            setUser(data.user)
                        }
                    }
                } catch (error) {
                    console.error('Session verification failed:', error)
                    logout() // Token expired or invalid
                } finally {
                    setIsVerifying(false)
                }
            }
        }

        verifySession()
        // We actully want this to run ONLY when hydration finishes, not on every user change
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isHydrated])

    // 3. Render
    if (!isHydrated || isVerifying) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-gray-500 text-sm">Initializing app...</p>
                </div>
            </div>
        )
    }

    return <>{children}</>
}
