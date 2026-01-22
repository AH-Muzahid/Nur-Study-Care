/**
 * Application-wide constants
 */

// App metadata
export const APP_NAME = 'Nur Study Care'
export const APP_DESCRIPTION = 'Coaching Center Management System'
export const APP_VERSION = '1.0.0'

// User roles
export const ROLES = {
    ADMIN: 'ADMIN',
    TEACHER: 'TEACHER',
    STUDENT: 'STUDENT',
}

// Enrollment statuses
export const ENROLLMENT_STATUS = {
    PENDING: 'PENDING',
    ACTIVE: 'ACTIVE',
    COMPLETED: 'COMPLETED',
    CANCELLED: 'CANCELLED',
    SUSPENDED: 'SUSPENDED',
}

// Payment statuses
export const PAYMENT_STATUS = {
    PENDING: 'PENDING',
    COMPLETED: 'COMPLETED',
    FAILED: 'FAILED',
    REFUNDED: 'REFUNDED',
}

// Payment methods
export const PAYMENT_METHODS = {
    CASH: 'CASH',
    BKASH: 'BKASH',
    NAGAD: 'NAGAD',
    ROCKET: 'ROCKET',
    BANK_TRANSFER: 'BANK_TRANSFER',
    CARD: 'CARD',
}

// Notice types
export const NOTICE_TYPES = {
    GENERAL: 'GENERAL',
    EXAM: 'EXAM',
    HOLIDAY: 'HOLIDAY',
    EVENT: 'EVENT',
    URGENT: 'URGENT',
}

// Course levels
export const COURSE_LEVELS = {
    SSC: 'SSC',
    HSC: 'HSC',
    ADMISSION: 'Admission',
    JOB_PREPARATION: 'Job Preparation',
    OTHER: 'Other',
}

// Days of the week
export const DAYS_OF_WEEK = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
]

// Pagination
export const DEFAULT_PAGE_SIZE = 10
export const PAGE_SIZE_OPTIONS = [10, 25, 50, 100]

// Date formats
export const DATE_FORMAT = 'MMM dd, yyyy'
export const DATE_TIME_FORMAT = 'MMM dd, yyyy hh:mm a'
export const TIME_FORMAT = 'hh:mm a'

// API endpoints base
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api'

// Social login providers
export const SOCIAL_PROVIDERS = {
    GOOGLE: 'google',
    FACEBOOK: 'facebook',
}

// File upload limits
export const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp']
export const ALLOWED_DOC_TYPES = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
]

// Session and auth
export const SESSION_TIMEOUT = 24 * 60 * 60 * 1000 // 24 hours
export const REFRESH_TOKEN_INTERVAL = 15 * 60 * 1000 // 15 minutes

// Error messages
export const ERROR_MESSAGES = {
    UNAUTHORIZED: 'You are not authorized to perform this action',
    NOT_FOUND: 'Resource not found',
    SERVER_ERROR: 'An error occurred. Please try again later',
    NETWORK_ERROR: 'Network error. Please check your connection',
    VALIDATION_ERROR: 'Please check your input and try again',
}

// Success messages
export const SUCCESS_MESSAGES = {
    LOGIN: 'Login successful',
    LOGOUT: 'Logged out successfully',
    REGISTER: 'Registration successful',
    UPDATE: 'Updated successfully',
    DELETE: 'Deleted successfully',
    CREATE: 'Created successfully',
}
