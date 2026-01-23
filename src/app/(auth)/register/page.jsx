'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { RegisterForm } from '@/components/auth/RegisterForm'
import { SocialLoginButtons } from '@/components/auth/SocialLoginButtons'
import { useAuthStore } from '@/store/authStore'
import { getDashboardPath } from '@/lib/helpers'

export default function RegisterPage() {
    const router = useRouter()
    const { user, isAuthenticated } = useAuthStore()

    useEffect(() => {
        // Redirect to dashboard if already logged in
        if (isAuthenticated && user) {
            const dashboardPath = getDashboardPath(user.role)
            router.replace(dashboardPath)
        }
    }, [isAuthenticated, user, router])

    // Don't show register form if already authenticated
    if (isAuthenticated && user) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        )
    }

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="space-y-3 text-center lg:text-left animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 lg:text-5xl font-heading">
                    Create an account
                </h1>
                <p className="text-base text-gray-600 font-normal">
                    Join Nur Study Care to start your learning journey
                </p>
            </div>

            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200">
                <RegisterForm />

                <SocialLoginButtons />

                <p className="text-center text-sm text-gray-600 pt-2">
                    Already have an account?{' '}
                    <Link href="/login" className="font-semibold text-primary-600 hover:text-primary-700 hover:underline transition-colors">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    )
}
