'use client'

import { useState } from 'react'

import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { ArrowLeft } from 'lucide-react'

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [sent, setSent] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            // Password reset implementation needed since removing NextAuth
            // TODO: Implement custom password reset flow or Firebase password reset
            toast.error('Password reset is currently under maintenance. Please contact support.')

            /* 
            // Previous NextAuth implementation
            const result = await signIn('email', {
                email,
                redirect: false,
                callbackUrl: '/student/dashboard',
            })
            */

            // setSent(true)
        } catch (error) {
            toast.error('An error occurred. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-blue-50 to-white p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center">Forgot Password</CardTitle>
                    <CardDescription className="text-center">
                        {sent
                            ? 'Check your email for the magic link'
                            : 'Enter your email to receive a password reset link'}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {!sent ? (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="student@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    disabled={loading}
                                />
                            </div>
                            <Button type="submit" className="w-full" disabled={loading}>
                                {loading ? 'Sending...' : 'Send Reset Link'}
                            </Button>
                        </form>
                    ) : (
                        <div className="space-y-4">
                            <div className="rounded-lg bg-green-50 p-4 text-sm text-green-800">
                                <p className="font-medium mb-1">Email sent!</p>
                                <p>
                                    We&apos;ve sent a magic link to <strong>{email}</strong>. Click the
                                    link in the email to reset your password.
                                </p>
                            </div>
                            <Button
                                variant="outline"
                                className="w-full"
                                onClick={() => {
                                    setSent(false)
                                    setEmail('')
                                }}
                            >
                                Send to different email
                            </Button>
                        </div>
                    )}

                    <div className="mt-6 text-center">
                        <Link
                            href="/login"
                            className="text-sm text-blue-600 hover:underline inline-flex items-center gap-1"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back to login
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
