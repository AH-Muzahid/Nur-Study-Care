'use client'

import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
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
import { Menu, User, LogOut, Settings, X, GraduationCap, Moon, Sun, LayoutDashboard, Bell, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import React from 'react'
import { toast } from 'sonner'
import { useAuthStore } from '@/store/authStore'
import { authAPI } from '@/lib/api-client'

export function Header() {
    const router = useRouter()
    const pathname = usePathname()
    const { user, isAuthenticated, logout: logoutStore } = useAuthStore()
    const { theme, setTheme } = useTheme()
    const [menuOpen, setMenuOpen] = React.useState(false)
    const [isScrolled, setIsScrolled] = React.useState(false)
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const handleLogout = async () => {
        toast.loading('Logging out...')
        try {
            await authAPI.logout()
            logoutStore()
            toast.success('Logged out successfully')
            router.push('/login')
        } catch (error) {
            console.error('Logout error:', error)
            // Force logout on client even if server fails
            logoutStore()
            router.push('/login')
        } finally {
            toast.dismiss()
        }
    }

    const getInitials = (name) => {
        if (!name) return 'U'
        const parts = name.trim().split(' ').filter(Boolean)
        if (parts.length === 0) return 'U'
        if (parts.length === 1) return parts[0][0].toUpperCase()
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    }

    const getUserDisplayName = (name) => {
        if (!name) return 'User'
        return name.trim().split(' ')[0] || 'User'
    }

    const getRoleDisplay = (role) => {
        if (!role) return 'user'
        return role.toLowerCase()
    }

    const navItems = [
        { label: 'Home', href: '/' },
        { label: 'Courses', href: '/courses' },
        { label: 'Instructors', href: '/instructors' },
        { label: 'About', href: '/about' },
        { label: 'Contact', href: '/contact' },
    ]

    const dashboardPath = user?.role === 'ADMIN'
        ? '/admin/dashboard'
        : user?.role === 'TEACHER'
            ? '/teacher/dashboard'
            : '/student/dashboard'

    return (
        <>
            {/* Gradient Orbs Background */}
            <div className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0">
                <div className="w-[40rem] h-[40rem] bg-gradient-to-tr from-primary-200/30 dark:from-primary-800/20 to-transparent opacity-40 dark:opacity-20 rounded-full blur-3xl" />
            </div>
            <div className="fixed top-0 right-0 translate-x-1/2 -translate-y-1/2 pointer-events-none z-0">
                <div className="w-[40rem] h-[40rem] bg-gradient-to-bl from-primary-200/30 dark:from-primary-800/20 to-transparent opacity-40 dark:opacity-20 rounded-full blur-3xl" />
            </div>

            <header
                className={cn(
                    'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
                    isScrolled
                        ? 'bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-gray-800/50'
                        : 'bg-transparent'
                )}
            >
                <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="flex items-center justify-between h-20">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2.5 group relative z-10">
                            <div className="bg-gradient-to-br from-primary-600 to-primary-700 p-2.5 rounded-2xl text-white group-hover:shadow-xl group-hover:shadow-primary-500/20 group-hover:scale-105 transition-all duration-300">
                                <GraduationCap className="h-6 w-6" />
                            </div>
                            <span className="text-xl lg:text-2xl font-bold font-heading bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-100 dark:to-white bg-clip-text text-transparent">
                                NurStudyCare
                            </span>
                        </Link>

                        {/* Desktop Navigation - Pill Style */}
                        <div className="hidden lg:flex items-center gap-1 bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-md p-1.5 rounded-full border border-gray-200/50 dark:border-gray-700/50 shadow-sm">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        "px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300",
                                        pathname === item.href
                                            ? "bg-white dark:bg-gray-900 text-primary-600 dark:text-primary-400 shadow-md"
                                            : "text-gray-800 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white hover:bg-white/70 dark:hover:bg-gray-900/70"
                                    )}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>

                        {/* Right Side Actions */}
                        <div className="hidden lg:flex items-center gap-3">
                            {/* Theme Toggle */}
                            {mounted && (
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                                    className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
                                >
                                    {theme === 'dark' ?
                                        <Sun className="h-5 w-5 text-gray-700 dark:text-gray-300" /> :
                                        <Moon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                                    }
                                </Button>
                            )}

                            {isAuthenticated ? (
                                <>
                                    {/* Notifications */}
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 relative transition-all duration-300"
                                    >
                                        <Bell className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                                        <span className="absolute top-2 right-2 h-2 w-2 bg-primary-500 rounded-full ring-2 ring-white dark:ring-gray-950 animate-pulse"></span>
                                    </Button>

                                    {/* User Menu */}
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                className="gap-2.5 pl-2 pr-4 h-11 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50"
                                            >
                                                <Avatar className="h-8 w-8 ring-2 ring-primary-500/30">
                                                    <AvatarImage src={user?.avatar} alt={user?.name || 'User'} />
                                                    <AvatarFallback className="bg-gradient-to-br from-primary-500 to-primary-600 text-white font-bold text-sm">
                                                        {getInitials(user?.name)}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className="hidden xl:flex flex-col items-start gap-0.5">
                                                    <span className="text-sm font-semibold text-gray-900 dark:text-white leading-tight">
                                                        {getUserDisplayName(user?.name)}
                                                    </span>
                                                    <span className="text-xs text-gray-500 dark:text-gray-400 capitalize leading-tight">
                                                        {getRoleDisplay(user?.role)}
                                                    </span>
                                                </div>
                                                <ChevronDown className="h-4 w-4 text-gray-500 hidden xl:block" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="w-64 rounded-2xl border-gray-200/50 dark:border-gray-700/50 shadow-xl" align="end" forceMount>
                                            <DropdownMenuLabel className="font-normal">
                                                <div className="flex items-center gap-3 p-2">
                                                    <Avatar className="h-12 w-12 ring-2 ring-primary-500/30">
                                                        <AvatarImage src={user?.avatar} alt={user?.name || 'User'} />
                                                        <AvatarFallback className="bg-gradient-to-br from-primary-500 to-primary-600 text-white font-bold">
                                                            {getInitials(user?.name)}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div className="flex flex-col space-y-1 min-w-0 flex-1">
                                                        <p className="text-sm font-semibold leading-tight truncate">{user?.name || 'User'}</p>
                                                        <p className="text-xs leading-tight text-muted-foreground truncate">
                                                            {user?.email || 'user@example.com'}
                                                        </p>
                                                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300 capitalize w-fit">
                                                            {getRoleDisplay(user?.role)}
                                                        </span>
                                                    </div>
                                                </div>
                                            </DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem onClick={() => router.push(dashboardPath)} className="cursor-pointer rounded-lg">
                                                <LayoutDashboard className="mr-2 h-4 w-4" />
                                                Dashboard
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => router.push('/profile')} className="cursor-pointer rounded-lg">
                                                <User className="mr-2 h-4 w-4" />
                                                Profile
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => router.push('/settings')} className="cursor-pointer rounded-lg">
                                                <Settings className="mr-2 h-4 w-4" />
                                                Settings
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem
                                                onClick={handleLogout}
                                                className="text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-950/50 cursor-pointer rounded-lg"
                                            >
                                                <LogOut className="mr-2 h-4 w-4" />
                                                Log out
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <Link href="/login">
                                        <Button
                                            variant="ghost"
                                            className="font-semibold rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
                                        >
                                            Sign In
                                        </Button>
                                    </Link>
                                    <Link href="/register">
                                        <Button className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white shadow-lg hover:shadow-xl hover:shadow-primary-500/20 font-semibold rounded-full transition-all duration-300 hover:scale-105">
                                            Get Started
                                        </Button>
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* Mobile Menu Toggle */}
                        <div className="flex lg:hidden items-center gap-2">
                            {mounted && (
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                                    className="rounded-full"
                                >
                                    {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                                </Button>
                            )}
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setMenuOpen(!menuOpen)}
                                aria-label="Toggle menu"
                                className="rounded-full"
                            >
                                {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                            </Button>
                        </div>
                    </nav>
                </div>

                {/* Mobile Menu Overlay */}
                {menuOpen && (
                    <div className={cn(
                        "lg:hidden absolute top-full left-0 w-full bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 shadow-2xl",
                        "animate-in slide-in-from-top-4 duration-300"
                    )}>
                        <div className="max-w-7xl mx-auto px-4 py-6 space-y-4">
                            {isAuthenticated && (
                                <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-primary-50 to-primary-100/50 dark:from-primary-950/30 dark:to-primary-900/20 rounded-2xl border border-primary-200/50 dark:border-primary-800/50">
                                    <Avatar className="h-12 w-12 ring-2 ring-primary-500/30">
                                        <AvatarImage src={user?.avatar} alt={user?.name || 'User'} />
                                        <AvatarFallback className="bg-gradient-to-br from-primary-500 to-primary-600 text-white font-bold">
                                            {getInitials(user?.name)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="min-w-0 flex-1">
                                        <p className="font-semibold text-gray-900 dark:text-white truncate">{user?.name || 'User'}</p>
                                        <p className="text-xs text-gray-600 dark:text-gray-400 truncate">{user?.email || 'user@example.com'}</p>
                                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-primary-600 text-white mt-1 capitalize">
                                            {getRoleDisplay(user?.role)}
                                        </span>
                                    </div>
                                </div>
                            )}

                            <div className="flex flex-col gap-1">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setMenuOpen(false)}
                                        className={cn(
                                            "px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300",
                                            pathname === item.href
                                                ? "text-primary-600 bg-primary-50 dark:text-primary-400 dark:bg-primary-950/30 shadow-sm"
                                                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                                        )}
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                                {isAuthenticated && (
                                    <Link
                                        href={dashboardPath}
                                        onClick={() => setMenuOpen(false)}
                                        className="px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-2 text-gray-700 dark:text-gray-300"
                                    >
                                        <LayoutDashboard className="h-4 w-4" />
                                        Dashboard
                                    </Link>
                                )}
                            </div>

                            <div className="border-t pt-4">
                                {isAuthenticated ? (
                                    <Button
                                        variant="destructive"
                                        className="w-full justify-start font-semibold rounded-xl"
                                        onClick={() => {
                                            handleLogout()
                                            setMenuOpen(false)
                                        }}
                                    >
                                        <LogOut className="mr-2 h-4 w-4" />
                                        Log out
                                    </Button>
                                ) : (
                                    <div className="flex flex-col gap-2">
                                        <Link href="/login" onClick={() => setMenuOpen(false)}>
                                            <Button variant="outline" className="w-full font-semibold rounded-xl">Sign In</Button>
                                        </Link>
                                        <Link href="/register" onClick={() => setMenuOpen(false)}>
                                            <Button className="w-full bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 font-semibold rounded-xl shadow-lg">
                                                Get Started
                                            </Button>
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </header>
        </>
    )
}
