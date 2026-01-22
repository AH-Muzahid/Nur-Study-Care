'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { ShieldAlert } from 'lucide-react'

export default function UnauthorizedPage() {
    const router = useRouter()

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="text-center">
                <ShieldAlert className="h-24 w-24 text-red-500 mx-auto mb-4" />
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Access Denied</h1>
                <p className="text-gray-600 mb-6">
                    You don't have permission to access this page.
                </p>
                <div className="flex gap-3 justify-center">
                    <Button onClick={() => router.back()}>Go Back</Button>
                    <Button variant="outline" onClick={() => router.push('/')}>
                        Go Home
                    </Button>
                </div>
            </div>
        </div>
    )
}
