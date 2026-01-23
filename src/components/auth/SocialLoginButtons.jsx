'use client'

import { Button } from '@/components/ui/button'
import { Chrome } from 'lucide-react'
import { useState } from 'react'
import { useAuthStore } from '@/store/authStore'
import { useRouter } from 'next/navigation'
import { getDashboardPath } from '@/lib/helpers'
import { toast } from 'sonner'
import { auth } from '@/lib/firebase'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'

export function SocialLoginButtons() {
    const { setUser } = useAuthStore()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const handleGoogleLogin = async () => {
        try {
            setIsLoading(true)
            const provider = new GoogleAuthProvider()

            // Sign in with Google popup
            const result = await signInWithPopup(auth, provider)
            const user = result.user

            // Get or create user in our database
            const response = await fetch('/api/auth/google-signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    uid: user.uid,
                    email: user.email,
                    name: user.displayName,
                    avatar: user.photoURL,
                    emailVerified: user.emailVerified,
                }),
            })

            if (!response.ok) {
                const error = await response.json()
                throw new Error(error.message || 'Failed to authenticate')
            }

            const data = await response.json()

            // Update Zustand store
            setUser(data.user)

            toast.success('Successfully signed in with Google!')

            // Redirect to appropriate dashboard
            const dashboardPath = getDashboardPath(data.user.role)
            router.push(dashboardPath)

        } catch (error) {
            console.error('Google login error:', error)

            if (error.code === 'auth/popup-closed-by-user') {
                toast.error('Sign in cancelled')
            } else if (error.code === 'auth/popup-blocked') {
                toast.error('Popup blocked. Please allow popups for this site.')
            } else {
                toast.error(error.message || 'Failed to sign in with Google')
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="space-y-3">
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-gray-500">Or continue with</span>
                </div>
            </div>

            <Button
                type="button"
                variant="outline"
                onClick={handleGoogleLogin}
                className="w-full"
                disabled={isLoading}
            >
                <Chrome className="mr-2 h-4 w-4" />
                {isLoading ? 'Signing in...' : 'Google'}
            </Button>
        </div>
    )
}
