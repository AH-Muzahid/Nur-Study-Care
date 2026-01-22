'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/authStore'
import { cn } from '@/lib/utils'
import { getNavItems } from '@/constants/navigation'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Sidebar({ isOpen, onClose }) {
    const pathname = usePathname()
    const router = useRouter()
    const { user } = useAuthStore()

    const items = user ? getNavItems(user.role) : []

    const handleNavigation = (href) => {
        router.push(href)
        if (onClose) onClose()
    }

    return (
        <>
            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside
                className={cn(
                    'fixed left-0 top-0 z-50 h-screen w-64 border-r bg-white transition-transform duration-300 lg:sticky lg:translate-x-0',
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                )}
            >
                {/* Close button for mobile */}
                <div className="flex h-16 items-center justify-between border-b px-4 lg:hidden">
                    <span className="text-lg font-semibold">Menu</span>
                    <Button variant="ghost" size="icon" onClick={onClose}>
                        <X className="h-6 w-6" />
                    </Button>
                </div>

                {/* Navigation */}
                <nav className="flex flex-col gap-1 p-4">
                    {items.map((item) => {
                        const Icon = item.icon
                        const isActive = pathname === item.href

                        return (
                            <button
                                key={item.href}
                                onClick={() => handleNavigation(item.href)}
                                className={cn(
                                    'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                                    isActive
                                        ? 'bg-blue-50 text-blue-600'
                                        : 'text-gray-700 hover:bg-gray-100'
                                )}
                            >
                                <Icon className="h-5 w-5" />
                                {item.title}
                            </button>
                        )
                    })}
                </nav>
            </aside>
        </>
    )
}
