'use client'

import { useEffect, useState } from 'react'
import { useAuthStore } from '@/store/authStore'
import { LoadingScreen } from '@/components/ui/loading-screen'

/**
 * AuthProvider - Handles authentication state persistence
 * This component ensures auth state is properly hydrated on app load
 * 
 * Note: Session verification is DISABLED here to prevent logout on page reload.
 * Verification happens in ProtectedRoute components when users access protected pages.
 */
export function AuthProvider({ children }) {
    const [isHydrated, setIsHydrated] = useState(() => {
        // Initialize based on current hydration state
        return typeof window !== 'undefined' && useAuthStore.persist.hasHydrated()
    })

    // Handle Hydration
    useEffect(() => {
        // Only run on client side
        if (typeof window === 'undefined') return

        // Set up hydration listener
        const unsubscribe = useAuthStore.persist.onFinishHydration(() => {
            setIsHydrated(true)
        })

        // Check if already hydrated (handles race condition)
        if (!isHydrated && useAuthStore.persist.hasHydrated()) {
            // Use setTimeout to avoid synchronous setState in effect
            setTimeout(() => setIsHydrated(true), 0)
        } else if (!isHydrated) {
            // Trigger rehydration if not already hydrated
            useAuthStore.persist.rehydrate()
        }

        return unsubscribe
    }, [isHydrated])

    // Show loading only during initial hydration
    if (!isHydrated) {
        return <LoadingScreen message="Initializing..." />
    }

    return <>{children}</>
}
