import {
    LayoutDashboard,
    Users,
    BookOpen,
    CreditCard,
    GraduationCap,
    UserCheck,
    Bell,
    Settings,
    Calendar,
    FileText,
    BarChart,
} from 'lucide-react'

/**
 * Student navigation items
 */
export const STUDENT_NAV_ITEMS = [
    {
        title: 'Dashboard',
        href: '/student/dashboard',
        icon: LayoutDashboard,
    },
    {
        title: 'My Courses',
        href: '/student/courses',
        icon: BookOpen,
    },
    {
        title: 'Payments',
        href: '/student/payments',
        icon: CreditCard,
    },
    {
        title: 'Schedule',
        href: '/student/schedule',
        icon: Calendar,
    },
    {
        title: 'Notices',
        href: '/student/notices',
        icon: Bell,
    },
    {
        title: 'Profile',
        href: '/student/profile',
        icon: Settings,
    },
]

/**
 * Teacher navigation items
 */
export const TEACHER_NAV_ITEMS = [
    {
        title: 'Dashboard',
        href: '/teacher/dashboard',
        icon: LayoutDashboard,
    },
    {
        title: 'My Courses',
        href: '/teacher/courses',
        icon: BookOpen,
    },
    {
        title: 'Students',
        href: '/teacher/students',
        icon: Users,
    },
    {
        title: 'Attendance',
        href: '/teacher/attendance',
        icon: UserCheck,
    },
    {
        title: 'Schedule',
        href: '/teacher/schedule',
        icon: Calendar,
    },
    {
        title: 'Materials',
        href: '/teacher/materials',
        icon: FileText,
    },
    {
        title: 'Profile',
        href: '/teacher/profile',
        icon: Settings,
    },
]

/**
 * Admin navigation items
 */
export const ADMIN_NAV_ITEMS = [
    {
        title: 'Dashboard',
        href: '/admin/dashboard',
        icon: LayoutDashboard,
    },
    {
        title: 'Students',
        href: '/admin/students',
        icon: Users,
    },
    {
        title: 'Teachers',
        href: '/admin/teachers',
        icon: GraduationCap,
    },
    {
        title: 'Courses',
        href: '/admin/courses',
        icon: BookOpen,
    },
    {
        title: 'Enrollments',
        href: '/admin/enrollments',
        icon: UserCheck,
    },
    {
        title: 'Payments',
        href: '/admin/payments',
        icon: CreditCard,
    },
    {
        title: 'Notices',
        href: '/admin/notices',
        icon: Bell,
    },
    {
        title: 'Analytics',
        href: '/admin/analytics',
        icon: BarChart,
    },
    {
        title: 'Settings',
        href: '/admin/settings',
        icon: Settings,
    },
]

/**
 * Get navigation items based on user role
 * @param {string} role - User role
 * @returns {Array} Navigation items
 */
export const getNavItems = (role) => {
    const navItems = {
        ADMIN: ADMIN_NAV_ITEMS,
        TEACHER: TEACHER_NAV_ITEMS,
        STUDENT: STUDENT_NAV_ITEMS,
    }
    return navItems[role] || STUDENT_NAV_ITEMS
}
