'use client'

import Image from 'next/image'

export function LoadingScreen({ message = 'Loading...' }) {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950">
            {/* Minimal Background Pattern */}
            <div className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.05]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                }}
            />

            <div className="relative z-10 flex flex-col items-center">
                {/* Floating Logo - No background box */}
                <div className="relative mb-6 animate-float-slow">
                    {/* Glow effect behind the transparent logo */}
                    <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full scale-110 animate-pulse"></div>

                    <div className="relative w-28 h-28 drop-shadow-2xl">
                        <Image
                            src="/nsc-logo.png"
                            alt="NSC Logo"
                            width={112}
                            height={112}
                            className="w-full h-full object-contain dark:drop-shadow-[0_0_10px_rgba(255,255,255,0.7)]"
                            priority
                            unoptimized
                        />
                    </div>
                </div>

                {/* Modern Loading Bar */}
                <div className="w-48 h-1.5 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden mb-4 relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 animate-loading-bar rounded-full"></div>
                </div>

                {/* Text with animated dots */}
                <div className="flex items-center gap-1">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400 tracking-wider uppercase">
                        {message}
                    </span>
                    <div className="flex gap-1 ml-1">
                        <span className="w-1 h-1 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                        <span className="w-1 h-1 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                        <span className="w-1 h-1 bg-blue-500 rounded-full animate-bounce"></span>
                    </div>
                </div>
            </div>
        </div>
    )
}
