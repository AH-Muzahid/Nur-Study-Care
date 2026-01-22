'use client'

import { Button } from '@/components/ui/button'
import { Chrome, Facebook } from 'lucide-react'

export function SocialLoginButtons() {
    const handleGoogleLogin = () => {
        window.location.href = '/api/auth/google'
    }

    const handleFacebookLogin = () => {
        window.location.href = '/api/auth/facebook'
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

            <div className="grid grid-cols-2 gap-3">
                <Button
                    type="button"
                    variant="outline"
                    onClick={handleGoogleLogin}
                    className="w-full"
                >
                    <Chrome className="mr-2 h-4 w-4" />
                    Google
                </Button>
                <Button
                    type="button"
                    variant="outline"
                    onClick={handleFacebookLogin}
                    className="w-full"
                >
                    <Facebook className="mr-2 h-4 w-4" />
                    Facebook
                </Button>
            </div>
        </div>
    )
}
