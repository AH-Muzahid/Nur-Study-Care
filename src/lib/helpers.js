/**
 * Get user initials from full name
 * @param {string} name - Full name
 * @returns {string} Initials (e.g., "John Doe" -> "JD")
 */
export const getInitials = (name) => {
    if (!name) return 'U'
    return name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
}

/**
 * Get dashboard path based on user role
 * @param {string} role - User role (ADMIN, TEACHER, STUDENT)
 * @returns {string} Dashboard path
 */
export const getDashboardPath = (role) => {
    if (!role) return '/'
    const paths = {
        ADMIN: '/admin/dashboard',
        TEACHER: '/teacher/dashboard',
        STUDENT: '/student/dashboard',
    }
    return paths[role] || '/student/dashboard'
}

/**
 * Format currency in Bangladeshi Taka
 * @param {number} amount - Amount to format
 * @returns {string} Formatted amount (e.g., "৳2,500")
 */
export const formatCurrency = (amount) => {
    if (typeof amount !== 'number') return '৳0'
    return `৳${amount.toLocaleString('en-BD')}`
}

/**
 * Format date to readable string
 * @param {Date|string} date - Date to format
 * @param {string} locale - Locale string (default: 'en-US')
 * @returns {string} Formatted date
 */
export const formatDate = (date, locale = 'en-US') => {
    if (!date) return ''
    return new Date(date).toLocaleDateString(locale, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    })
}

/**
 * Format time to readable string
 * @param {Date|string} date - Date/time to format
 * @returns {string} Formatted time (e.g., "3:00 PM")
 */
export const formatTime = (date) => {
    if (!date) return ''
    return new Date(date).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    })
}

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength = 100) => {
    if (!text || text.length <= maxLength) return text
    return `${text.substring(0, maxLength)}...`
}

/**
 * Get relative time (e.g., "2 hours ago")
 * @param {Date|string} date - Date to compare
 * @returns {string} Relative time string
 */
export const getRelativeTime = (date) => {
    if (!date) return ''

    const now = new Date()
    const past = new Date(date)
    const diffInSeconds = Math.floor((now - past) / 1000)

    if (diffInSeconds < 60) return 'just now'
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`

    return formatDate(date)
}

/**
 * Generate a random ID
 * @param {number} length - Length of ID
 * @returns {string} Random ID
 */
export const generateId = (length = 8) => {
    return Math.random().toString(36).substring(2, length + 2)
}

/**
 * Check if user has permission for an action
 * @param {string} userRole - User's role
 * @param {string} requiredRole - Required role
 * @returns {boolean} Has permission
 */
export const hasPermission = (userRole, requiredRole) => {
    const roleHierarchy = {
        ADMIN: 3,
        TEACHER: 2,
        STUDENT: 1,
    }
    return (roleHierarchy[userRole] || 0) >= (roleHierarchy[requiredRole] || 0)
}

/**
 * Validate Bangladeshi phone number
 * @param {string} phone - Phone number
 * @returns {boolean} Is valid
 */
export const isValidBDPhone = (phone) => {
    return /^01[3-9]\d{8}$/.test(phone)
}

/**
 * Sleep/delay function
 * @param {number} ms - Milliseconds to wait
 * @returns {Promise} Promise that resolves after delay
 */
export const sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms))
}
