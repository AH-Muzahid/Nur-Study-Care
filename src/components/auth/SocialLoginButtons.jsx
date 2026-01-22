'use client'

import { signIn } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Chrome } from 'lucide-react'

export function SocialLoginButtons() {
    const handleGoogleLogin = () => {
        signIn('google', { callbackUrl: '/student/dashboard' })
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
            >
                <Chrome className="mr-2 h-4 w-4" />
                Google
            </Button>
        </div>
    )
}
