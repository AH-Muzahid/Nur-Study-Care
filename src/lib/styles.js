import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merge Tailwind CSS classes with clsx
 */
export function cn(...inputs) {
    return twMerge(clsx(inputs))
}

/**
 * Common CSS class combinations
 */
export const styles = {
    // Buttons
    button: {
        base: 'inline-flex items-center justify-center rounded-md font-medium transition-colors disabled:opacity-50',
        primary: 'bg-blue-600 text-white hover:bg-blue-700',
        secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
        ghost: 'hover:bg-gray-100',
        danger: 'bg-red-600 text-white hover:bg-red-700',
    },

    // Cards
    card: {
        base: 'bg-white rounded-lg border shadow-sm',
        hover: 'hover:shadow-md transition-shadow cursor-pointer',
    },

    // Inputs
    input: {
        base: 'w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500',
        error: 'border-red-500 focus:ring-red-500',
    },

    // Badges
    badge: {
        base: 'inline-flex items-center rounded-full px-2 py-1 text-xs font-medium',
        success: 'bg-green-100 text-green-700',
        warning: 'bg-yellow-100 text-yellow-700',
        danger: 'bg-red-100 text-red-700',
        info: 'bg-blue-100 text-blue-700',
    },

    // Status indicators
    status: {
        ACTIVE: 'bg-green-100 text-green-700',
        PENDING: 'bg-yellow-100 text-yellow-700',
        COMPLETED: 'bg-blue-100 text-blue-700',
        CANCELLED: 'bg-red-100 text-red-700',
        SUSPENDED: 'bg-gray-100 text-gray-700',
    },

    // Loading
    loading: {
        spinner: 'animate-spin rounded-full border-b-2',
        container: 'flex items-center justify-center',
    },

    // Layout
    layout: {
        container: 'container mx-auto px-4',
        section: 'py-8 md:py-12',
        grid: 'grid gap-4 md:grid-cols-2 lg:grid-cols-3',
    },
}

/**
 * Get status badge class
 */
export const getStatusClass = (status) => {
    return cn(styles.badge.base, styles.status[status] || styles.badge.info)
}

/**
 * Get role badge color
 */
export const getRoleColor = (role) => {
    const colors = {
        ADMIN: 'bg-purple-100 text-purple-700',
        TEACHER: 'bg-blue-100 text-blue-700',
        STUDENT: 'bg-green-100 text-green-700',
    }
    return colors[role] || 'bg-gray-100 text-gray-700'
}
