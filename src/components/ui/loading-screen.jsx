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
                            src="/logo.png"
                            alt="NSC Logo"
                            width={112}
                            height={112}
                            className="w-full h-full object-contain dark:drop-shadow-[0_0_10px_rgba(255,255,255,0.7)]"
                            priority
                            unoptimized
                        />
                    </div>
                </div>

                {/* Text and Loader */}
                <div className="flex flex-col items-center space-y-5">
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent font-heading tracking-tight animate-gradient">
                        Nur Study Care
                    </h2>

                    <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-blue-500 animate-bounce [animation-delay:-0.3s] shadow-lg shadow-blue-500/50"></div>
                        <div className="h-2 w-2 rounded-full bg-indigo-500 animate-bounce [animation-delay:-0.15s] shadow-lg shadow-indigo-500/50"></div>
                        <div className="h-2 w-2 rounded-full bg-purple-500 animate-bounce shadow-lg shadow-purple-500/50"></div>
                    </div>

                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-[0.2em] animate-pulse">
                        {message}
                    </p>
                </div>
            </div>
        </div>
    )
}
