'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { toast } from 'sonner'

export function AuthErrorListener() {
    const searchParams = useSearchParams()
    const error = searchParams.get('error')

    useEffect(() => {
        if (!error) return

        if (error === 'OAuthAccountNotLinked') {
            toast.error('Account already exists with this email.', {
                description: 'Please login with your password or the original provider.',
                duration: 5000,
            })
        } else if (error === 'AccessDenied') {
            toast.error('Access Denied', {
                description: 'You do not have permission to sign in.',
                duration: 5000,
            })
        } else {
            toast.error('Authentication Error', {
                description: error,
                duration: 5000,
            })
        }
    }, [error])

    return null
}
