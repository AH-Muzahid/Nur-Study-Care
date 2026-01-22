'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'next-themes'
import { useState } from 'react'
import { Toaster } from '@/components/ui/sonner'

export function Providers({ children }) {
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        staleTime: 60 * 1000, // 1 minute
                        cacheTime: 5 * 60 * 1000, // 5 minutes
                        refetchOnWindowFocus: false,
                        retry: 1,
                    },
                },
            })
    )

    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <SessionProvider>
                <QueryClientProvider client={queryClient}>
                    {children}
                    <Toaster position="top-right" richColors />
                </QueryClientProvider>
            </SessionProvider>
        </ThemeProvider>
    )
}
