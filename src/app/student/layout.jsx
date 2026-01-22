'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import { UserRole } from '@/constants/roles'
import { DashboardLayout } from '@/components/layout/DashboardLayout'

export default function StudentLayout({ children }) {
    const router = useRouter()
    const { user, isAuthenticated } = useAuthStore()

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/login')
            return
        }

        if (user?.role !== UserRole.STUDENT) {
            router.push('/unauthorized')
        }
    }, [isAuthenticated, user, router])

    if (!isAuthenticated || user?.role !== UserRole.STUDENT) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        )
    }

    return <DashboardLayout>{children}</DashboardLayout>
}
