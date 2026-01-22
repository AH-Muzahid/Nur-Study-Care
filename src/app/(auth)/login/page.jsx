import Link from 'next/link'
import { LoginForm } from '@/components/auth/LoginForm'
import { SocialLoginButtons } from '@/components/auth/SocialLoginButtons'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export const metadata = {
    title: 'Login - Nur Study Care',
    description: 'Login to your account',
}

export default function LoginPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1 text-center">
                    <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
                    <CardDescription>
                        Sign in to your Nur Study Care account
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <LoginForm />
                    <SocialLoginButtons />
                    <p className="text-center text-sm text-gray-600">
                        Don&apos;t have an account?{' '}
                        <Link href="/register" className="font-medium text-blue-600 hover:underline">
                            Register now
                        </Link>
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}
