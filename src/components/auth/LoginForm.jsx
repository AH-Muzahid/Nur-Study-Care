'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema } from '@/lib/schemas'
import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { authAPI } from '@/lib/api-client'
import { useAuthStore } from '@/store/authStore'

export function LoginForm() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const setUser = useAuthStore((state) => state.setUser)

    const form = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    })

    const onSubmit = async (data) => {
        setLoading(true)
        try {
            const response = await authAPI.login(data)

            if (response.user) {
                setUser(response.user)
                toast.success('Login successful!')

                // Redirect based on role
                const role = response.user.role
                if (role === 'ADMIN') router.push('/admin/dashboard')
                else if (role === 'TEACHER') router.push('/teacher/dashboard')
                else router.push('/student/dashboard')

                router.refresh()
            } else {
                toast.error('Login failed')
            }
        } catch (error) {
            console.error('Login error:', error)
            toast.error(error.message || 'Invalid email or password')
        } finally {
            setLoading(false)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    type="email"
                                    placeholder="your@email.com"
                                    {...field}
                                    disabled={loading}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input
                                    type="password"
                                    placeholder="••••••••"
                                    {...field}
                                    disabled={loading}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="text-right">
                    <Link href="/forgot-password" className="text-sm text-primary-600 hover:underline">
                        Forgot password?
                    </Link>
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                    {loading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Logging in...
                        </>
                    ) : (
                        'Login'
                    )}
                </Button>
            </form>
        </Form>
    )
}
