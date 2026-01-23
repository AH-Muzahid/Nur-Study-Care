'use client'

import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import { getDashboardPath } from '@/lib/helpers'
import { Button } from '@/components/ui/button'
import { useState, useEffect } from 'react'

export function AuthButtons() {
    const router = useRouter()
    const { user, isAuthenticated } = useAuthStore()
    const [mounted, setMounted] = useState(false)

    // Wait for component mount to prevent hydration mismatch
    useEffect(() => {
        setMounted(true)
    }, [])

    // Show nothing during hydration to avoid flash
    if (!mounted) {
        return (
            <div className="flex gap-4">
                <div className="h-11 w-32 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-md"></div>
                <div className="h-11 w-32 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-md"></div>
            </div>
        )
    }

    if (isAuthenticated && user) {
        return (
            <Button
                size="lg"
                onClick={() => router.push(getDashboardPath(user.role))}
                className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white shadow-lg hover:shadow-xl hover:shadow-primary-500/20 font-semibold transition-all duration-300 hover:scale-105"
            >
                Go to Dashboard
            </Button>
        )
    }

    return (
        <div className="flex flex-col sm:flex-row gap-4">
            <Button
                size="lg"
                onClick={() => router.push('/register')}
                className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white shadow-lg hover:shadow-xl hover:shadow-primary-500/20 font-semibold transition-all duration-300 hover:scale-105"
            >
                Get Started
            </Button>
            <Button
                size="lg"
                variant="outline"
                onClick={() => router.push('/login')}
                className="border-2 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 font-semibold transition-all duration-300"
            >
                Sign In
            </Button>
        </div>
    )
}
