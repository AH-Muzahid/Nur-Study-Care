'use client'

import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Bell, Menu, User, LogOut, Settings, X, GraduationCap, Moon, Sun } from 'lucide-react'
import { cn } from '@/lib/utils'
import React from 'react'

export function Header() {
    const router = useRouter()
    const pathname = usePathname()
    const { data: session, status } = useSession()
    const { theme, setTheme } = useTheme()
    const [menuState, setMenuState] = React.useState(false)
    const [isScrolled, setIsScrolled] = React.useState(false)
    const [mounted, setMounted] = React.useState(false)

    const isAuthenticated = status === 'authenticated'
    const user = session?.user

    React.useEffect(() => {
        setMounted(true)
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const handleLogout = async () => {
        await signOut({ redirect: true, callbackUrl: '/login' })
    }

    const getInitials = (name) => {
        if (!name) return 'U'
        return name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2)
    }

    // Navigation items - same for all users
    const baseNavItems = [
        { label: 'Home', href: '/' },
        { label: 'All Courses', href: '/courses' },
        { label: 'Instructors', href: '/instructors' },
        { label: 'About Us', href: '/about' },
        { label: 'Contact', href: '/contact' },
    ]

    // Add Dashboard for logged-in users
    const getNavItems = () => {
        if (!isAuthenticated) {
            return baseNavItems
        }

        const dashboardHref = user?.role === 'ADMIN'
            ? '/admin/dashboard'
            : user?.role === 'TEACHER'
                ? '/teacher/dashboard'
                : '/student/dashboard'

        return [
            { label: 'Dashboard', href: dashboardHref },
            ...baseNavItems,
        ]
    }

    const navItems = getNavItems()

    return (
        <header>
            <nav
                className={cn(
                    'fixed z-50 w-full transition-all duration-300',
                    isAuthenticated
                        ? 'px-3 md:px-4'
                        : 'bg-gray-950 border-b border-gray-800'
                )}
            >
                <div
                    className={cn(
                        'mx-auto transition-all duration-300',
                        isAuthenticated && isScrolled
                            ? 'bg-white/80 dark:bg-zinc-900/50 max-w-8xl mt-2 rounded-2xl border backdrop-blur-xl px-3 shadow-lg'
                            : isAuthenticated
                                ? 'max-w-8xl mt-2'
                                : 'max-w-7xl'
                    )}
                >
                    <div className={cn(
                        "relative flex items-center justify-between",
                        isAuthenticated ? "flex-wrap gap-3 py-3" : "py-4"
                    )}>
                        {/* Logo */}
                        <Link
                            href="/"
                            className={cn(
                                "flex gap-2 items-center",
                                !isAuthenticated && "text-white"
                            )}
                        >
                            <GraduationCap className={cn(
                                "h-8 w-8",
                                isAuthenticated ? "text-blue-600" : "text-blue-400"
                            )} />
                            <span className="text-xl font-semibold">Nur Study Care</span>
                        </Link>

                        {/* Desktop Navigation - Center */}
                        {!isAuthenticated ? (
                            <div className="hidden lg:flex items-center gap-8">
                                {navItems.map((item) => {
                                    const isActive = pathname === item.href
                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className={cn(
                                                "text-sm transition-colors duration-200",
                                                isActive
                                                    ? "text-white font-medium"
                                                    : "text-gray-300 hover:text-white"
                                            )}
                                        >
                                            {item.label}
                                        </Link>
                                    )
                                })}
                            </div>
                        ) : (
                            <div className="absolute inset-0 m-auto hidden lg:block size-fit">
                                <div className="flex items-center gap-1">
                                    {navItems.map((item) => {
                                        const isActive = pathname === item.href
                                        return (
                                            <Link
                                                key={item.href}
                                                href={item.href}
                                                className={cn(
                                                    "px-4 py-2 rounded-md text-sm transition-colors duration-200",
                                                    isActive
                                                        ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium"
                                                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                                                )}
                                            >
                                                {item.label}
                                            </Link>
                                        )
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setMenuState(!menuState)}
                            aria-label={menuState ? 'Close Menu' : 'Open Menu'}
                            className="lg:hidden relative z-20 p-2"
                        >
                            <Menu
                                className={cn(
                                    "h-6 w-6 transition-all duration-200",
                                    !isAuthenticated && "text-white",
                                    menuState && "rotate-180 scale-0 opacity-0"
                                )}
                            />
                            <X
                                className={cn(
                                    "absolute inset-0 m-auto h-6 w-6 transition-all duration-200",
                                    !isAuthenticated && "text-white",
                                    menuState
                                        ? "rotate-0 scale-100 opacity-100"
                                        : "-rotate-180 scale-0 opacity-0"
                                )}
                            />
                        </button>

                        {/* Right Side - Auth & Profile */}
                        <div
                            className={cn(
                                "hidden lg:flex items-center gap-3",
                                menuState && "absolute top-full left-0 right-0 mt-2 flex flex-col bg-white dark:bg-gray-900 border rounded-lg shadow-lg p-4 space-y-4 lg:relative lg:mt-0 lg:flex-row lg:bg-transparent lg:border-0 lg:shadow-none lg:p-0 lg:space-y-0"
                            )}
                        >
                            {/* Mobile Navigation */}
                            <div className={cn(
                                "lg:hidden w-full space-y-2",
                                !menuState && "hidden"
                            )}>
                                {navItems.map((item) => {
                                    const isActive = pathname === item.href
                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            onClick={() => setMenuState(false)}
                                            className={cn(
                                                "block px-4 py-2 rounded-md text-sm transition-colors",
                                                isActive
                                                    ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium"
                                                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                                            )}
                                        >
                                            {item.label}
                                        </Link>
                                    )
                                })}
                            </div>

                            {/* Auth Buttons */}
                            <div className="flex items-center gap-2 w-full lg:w-auto">
                                {/* Theme Toggle */}
                                {mounted && (
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                                        className={cn(
                                            !isAuthenticated && "text-white hover:text-white hover:bg-white/10"
                                        )}
                                    >
                                        {theme === 'dark' ? (
                                            <Sun className="h-5 w-5" />
                                        ) : (
                                            <Moon className="h-5 w-5" />
                                        )}
                                    </Button>
                                )}

                                {isAuthenticated ? (
                                    <>
                                        <Button variant="ghost" size="icon" className="relative">
                                            <Bell className="h-5 w-5" />
                                            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
                                        </Button>

                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="flex items-center gap-2 px-2">
                                                    <Avatar className="h-8 w-8">
                                                        <AvatarImage src={user?.avatar} alt={user?.name} />
                                                        <AvatarFallback className="bg-blue-600 text-white text-xs">
                                                            {getInitials(user?.name)}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div className="hidden md:block text-left">
                                                        <p className="text-sm font-medium">{user?.name}</p>
                                                        <p className="text-xs text-muted-foreground capitalize">
                                                            {user?.role?.toLowerCase()}
                                                        </p>
                                                    </div>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="w-56">
                                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem onClick={() => router.push('/profile')}>
                                                    <User className="mr-2 h-4 w-4" />
                                                    Profile
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => router.push('/settings')}>
                                                    <Settings className="mr-2 h-4 w-4" />
                                                    Settings
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                                                    <LogOut className="mr-2 h-4 w-4" />
                                                    Logout
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </>
                                ) : (
                                    <Button
                                        variant="ghost"
                                        onClick={() => router.push('/login')}
                                        className="text-white hover:text-white hover:bg-white/10 border-0"
                                    >
                                        Login
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}
