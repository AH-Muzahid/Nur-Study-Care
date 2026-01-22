export const APP_CONFIG = {
    name: 'Nur Study Care',
    description: 'Coaching Center Management System',
    version: '1.0.0',
    baseUrl: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
}

export const AUTH_CONFIG = {
    accessTokenExpiry: '15m',
    refreshTokenExpiry: '7d',
    passwordMinLength: 8,
    maxLoginAttempts: 5,
    accountLockoutDuration: 30 * 60 * 1000, // 30 minutes
    rateLimitWindow: 15 * 60 * 1000, // 15 minutes
    rateLimitMaxRequests: 5,
}

export const PAGINATION_CONFIG = {
    defaultPageSize: 10,
    maxPageSize: 100,
}

export const FILE_UPLOAD_CONFIG = {
    maxFileSize: 5 * 1024 * 1024, // 5MB
    allowedImageTypes: ['image/jpeg', 'image/png', 'image/webp'],
    allowedDocumentTypes: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
}

export const COURSE_CONFIG = {
    levels: ['SSC', 'HSC', 'Admission', 'Job Preparation', 'Other'],
    minBatchCapacity: 5,
    maxBatchCapacity: 100,
}
