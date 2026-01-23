'use client'


import { Suspense, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { GlassLoginForm } from '@/components/auth/GlassLoginForm'
import { AuthErrorListener } from '@/components/auth/AuthErrorListener'
import { useAuthStore } from '@/store/authStore'
import { getDashboardPath } from '@/lib/helpers'

export default function LoginPage() {
    const router = useRouter()
    const { user, isAuthenticated } = useAuthStore()

    useEffect(() => {
        // Redirect to dashboard if already logged in
        if (isAuthenticated && user) {
            const dashboardPath = getDashboardPath(user.role)
            router.replace(dashboardPath)
        }
    }, [isAuthenticated, user, router])

    // Don't show login form if already authenticated
    if (isAuthenticated && user) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        )
    }

    return (
        <div className="flex justify-center items-center w-full">
            <Suspense fallback={null}>
                <AuthErrorListener />
            </Suspense>
            <GlassLoginForm />
        </div>
    )
}
