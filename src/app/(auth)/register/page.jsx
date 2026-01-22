import Link from 'next/link'
import { RegisterForm } from '@/components/auth/RegisterForm'
import { SocialLoginButtons } from '@/components/auth/SocialLoginButtons'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export const metadata = {
    title: 'Register - Nur Study Care',
    description: 'Create a new account',
}

export default function RegisterPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-8">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1 text-center">
                    <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
                    <CardDescription>
                        Join Nur Study Care to start your learning journey
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <RegisterForm />
                    <SocialLoginButtons />
                    <p className="text-center text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link href="/login" className="font-medium text-blue-600 hover:underline">
                            Sign in
                        </Link>
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}
