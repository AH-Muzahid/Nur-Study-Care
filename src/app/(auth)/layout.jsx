import Link from 'next/link'
import { GraduationCap } from 'lucide-react'
import { GridPattern } from '@/components/ui/patterns'

import { Header } from '@/components/layout/Header'

export default function AuthLayout({ children }) {
    return (
        <>
            <Header />
            <div className="flex min-h-screen w-full bg-white pt-20">
                {/* Left Side - Form Container */}
                <div className="flex w-full flex-col justify-center px-4 py-12 sm:px-6 lg:w-1/2 lg:flex-none lg:px-20 xl:px-24 z-10 bg-white">
                    <div className="mx-auto w-full max-w-sm lg:w-96">
                        {children}
                    </div>
                </div>

                {/* Right Side - Premium Decorative Panel */}
                <div className="relative hidden w-0 flex-1 lg:block bg-primary-600 overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 h-full w-full bg-gradient-to-br from-primary-400 via-primary-600 to-primary-700">
                        <GridPattern
                            width={60}
                            height={60}
                            className="text-white/10 opacity-20"
                            strokeDasharray="5 5"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-primary-900/60 to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 flex h-full flex-col justify-between p-16 text-white">
                        <div className="flex items-center gap-2 text-2xl font-bold animate-in fade-in slide-in-from-top-6 duration-700">
                            <div className="rounded-lg bg-white/10 p-2 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300">
                                <GraduationCap className="h-8 w-8 text-white" />
                            </div>
                            <span className="tracking-tight font-heading">NurStudyCare</span>
                        </div>

                        <div className="space-y-8 max-w-lg text-white animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
                            <h2 className="text-5xl font-extrabold leading-tight tracking-tight font-heading">
                                Start your <br />
                                <span className="text-primary-200 font-bold drop-shadow-sm">Learning Journey</span>
                            </h2>
                            <div className="space-y-4 border-l-2 border-primary-300/30 pl-6 animate-in fade-in slide-in-from-left-4 duration-700 delay-500">
                                <p className="text-xl text-primary-50 font-light leading-relaxed">
                                    &quot;Education is the most powerful weapon which you can use to change the world.&quot;
                                </p>
                                <p className="text-sm text-primary-300 font-semibold uppercase tracking-widest leading-none">
                                    — Nelson Mandela
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-6 text-sm font-medium text-primary-200/60 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-700">
                            <span>© 2024 Nur Study Care</span>
                            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
                            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
