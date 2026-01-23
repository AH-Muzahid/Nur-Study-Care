'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema } from '@/lib/schemas'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { authAPI } from '@/lib/api-client'
import { useAuthStore } from '@/store/authStore'
import { auth } from '@/lib/firebase'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { getDashboardPath } from '@/lib/helpers'

export function GlassLoginForm() {
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
        console.log("Attempting login with:", data.email);
        try {
            const response = await authAPI.login(data)
            console.log("Login response:", response);

            if (response.user) {
                setUser(response.user)
                toast.success('Login successful!')

                const dashboardPath = getDashboardPath(response.user.role)
                router.push(dashboardPath)
                router.refresh()
            } else {
                console.error("No user in response");
                toast.error('Login failed - invalid response')
            }
        } catch (error) {
            console.error('Login error:', error)
            toast.error(error.message || 'Invalid email or password')
        } finally {
            setLoading(false)
        }
    }

    const handleGoogleLogin = async () => {
        try {
            setLoading(true)
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
            setLoading(false)
        }
    }

    return (
        <div className="flex justify-center items-center w-full min-h-[500px]">
            {/* Container */}
            <div className="relative flex justify-center items-center overflow-hidden bg-[#272727] rounded-3xl w-[316px] min-h-[420px] z-[8] shadow-[0_4px_8px_rgba(0,0,0,0.2),0_8px_16px_rgba(0,0,0,0.2),0_0_8px_rgba(255,255,255,0.1),0_0_16px_rgba(255,255,255,0.08)]">

                {/* Spinning Border Gradient */}
                <div className="absolute inset-[-50px] -z-[2] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_45deg,transparent_75%,#fff,transparent_100%)]"></div>

                {/* Login Box */}
                <div className="relative bg-[#272727] rounded-3xl p-7 w-[314px] min-h-[418px] z-10 backdrop-blur-[15px] flex flex-col justify-center gap-2.5 shadow-[inset_0_40px_60px_-8px_rgba(255,255,255,0.12),inset_4px_0_12px_-6px_rgba(255,255,255,0.12),inset_0_0_12px_-4px_rgba(255,255,255,0.12)]">

                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-center items-center gap-2.5 w-full">

                        {/* Logo */}
                        <div className="w-[65px] h-[65px] bg-gradient-to-br from-white/20 to-black/20 shadow-[8px_8px_16px_rgba(0,0,0,0.2),-8px_-8px_16px_rgba(255,255,255,0.06)] rounded-[20px] border-2 border-white flex justify-center items-center relative mb-2.5">
                            {/* Logo Shape 1 */}
                            <div className="absolute bottom-[10px] w-1/2 h-1/5 border-t-[2.5px] border-b-[2.5px] border-l-[2.5px] border-r-[2.5px] border-white rounded-tl-[40px] rounded-tr-[40px] rounded-br-[20px] rounded-bl-[20px]"></div>
                            {/* Logo Shape 2 */}
                            <div className="absolute top-[10px] w-[30%] h-[30%] rounded-full border-[2.5px] border-white"></div>
                        </div>

                        <span className="w-full text-center text-2xl font-bold p-1.5 text-white flex justify-center items-center">
                            Welcome Back!
                        </span>

                        {/* Email Input */}
                        <div className="w-full">
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full p-2.5 border border-transparent rounded-xl bg-[#3a3a3a] text-white outline-none text-sm focus:border-white transition-colors"
                                disabled={loading}
                                {...form.register('email')}
                            />
                            {form.formState.errors.email && (
                                <span className="text-xs text-red-400 w-full text-left pl-2 block mt-1">
                                    {form.formState.errors.email.message}
                                </span>
                            )}
                        </div>

                        {/* Password Input */}
                        <div className="w-full">
                            <input
                                type="password"
                                placeholder="Password"
                                className="w-full p-2.5 border border-transparent rounded-xl bg-[#3a3a3a] text-white outline-none text-sm focus:border-white transition-colors"
                                disabled={loading}
                                {...form.register('password')}
                            />
                            {form.formState.errors.password && (
                                <span className="text-xs text-red-400 w-full text-left pl-2 block mt-1">
                                    {form.formState.errors.password.message}
                                </span>
                            )}
                        </div>

                        {/* Sign In Button */}
                        <button
                            type="submit"
                            className="w-full h-10 border-none rounded-[20px] text-sm font-semibold cursor-pointer grid place-content-center gap-2.5 bg-[#373737] text-white transition-all duration-300 shadow-[inset_0px_3px_6px_-4px_rgba(255,255,255,0.6),inset_0px_-3px_6px_-2px_rgba(0,0,0,0.8)] hover:bg-white/25 hover:shadow-[inset_0px_3px_6px_rgba(255,255,255,0.6),inset_0px_-3px_6px_rgba(0,0,0,0.8),0px_0px_8px_rgba(255,255,255,0.05)] mt-1.5"
                            disabled={loading}
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Signing In...
                                </span>
                            ) : (
                                'Sign In'
                            )}
                        </button>

                        {/* Google Sign In Button */}
                        <button
                            type="button"
                            className="w-full h-10 border-none rounded-[20px] text-sm font-semibold cursor-pointer flex justify-center items-center gap-2.5 bg-[#373737] text-white transition-all duration-300 shadow-[inset_0px_3px_6px_-4px_rgba(255,255,255,0.6),inset_0px_-3px_6px_-2px_rgba(0,0,0,0.8)] hover:bg-white/25 hover:shadow-[inset_0px_3px_6px_rgba(255,255,255,0.6),inset_0px_-3px_6px_rgba(0,0,0,0.8),0px_0px_8px_rgba(255,255,255,0.05)]"
                            onClick={handleGoogleLogin}
                            disabled={loading}
                        >
                            <svg className="h-4" viewBox="-3 0 262 262" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid">
                                <path d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" fill="#4285F4" />
                                <path d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" fill="#34A853" />
                                <path d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782" fill="#FBBC05" />
                                <path d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" fill="#EB4335" />
                            </svg>
                            <span className="tracking-wide">Sign in with Google</span>
                        </button>

                        <div className="w-full text-left text-xs text-white/50 mt-2.5">
                            Don&apos;t have an account?
                            <Link href="/register" className="relative ml-1 font-semibold text-white/50 no-underline transition-colors hover:text-white after:content-[''] after:absolute after:left-0 after:-bottom-[2px] after:w-0 after:h-[1px] after:bg-current after:transition-[width] after:duration-300 hover:after:w-full">
                                Sign up, it&apos;s free!
                            </Link>
                            <br />
                            <Link href="/forgot-password" className="relative font-semibold text-white/50 no-underline transition-colors hover:text-white after:content-[''] after:absolute after:left-0 after:-bottom-[2px] after:w-0 after:h-[1px] after:bg-current after:transition-[width] after:duration-300 hover:after:w-full">
                                Forgot password?
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
