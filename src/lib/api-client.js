/**
 * API Client for making HTTP requests
 */

/**
 * Base fetch wrapper with error handling
 * @param {string} url - API endpoint
 * @param {Object} options - Fetch options
 * @returns {Promise} Response data
 */
export async function fetchAPI(url, options = {}) {
    const defaultOptions = {
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
    }

    try {
        const response = await fetch(url, { ...defaultOptions, ...options })
        const data = await response.json()

        if (!response.ok) {
            throw new Error(data.message || 'Request failed')
        }

        return data
    } catch (error) {
        console.error('API Error:', error)
        throw error
    }
}

/**
 * GET request
 */
export const api = {
    get: (url) => fetchAPI(url, { method: 'GET' }),

    post: (url, data) => fetchAPI(url, {
        method: 'POST',
        body: JSON.stringify(data),
    }),

    put: (url, data) => fetchAPI(url, {
        method: 'PUT',
        body: JSON.stringify(data),
    }),

    patch: (url, data) => fetchAPI(url, {
        method: 'PATCH',
        body: JSON.stringify(data),
    }),

    delete: (url) => fetchAPI(url, { method: 'DELETE' }),
}

/**
 * Auth API endpoints
 */
export const authAPI = {
    login: (credentials) => api.post('/api/auth/login', credentials),
    register: (userData) => api.post('/api/auth/register', userData),
    logout: () => api.post('/api/auth/logout', {}),
    refresh: () => api.post('/api/auth/refresh', {}),
    verify: () => api.get('/api/auth/verify'),
}

/**
 * Student API endpoints
 */
export const studentAPI = {
    getAll: (params) => api.get(`/api/students?${new URLSearchParams(params)}`),
    getById: (id) => api.get(`/api/students/${id}`),
    getMe: () => api.get('/api/students/me'),
    create: (data) => api.post('/api/students', data),
    update: (id, data) => api.put(`/api/students/${id}`, data),
    delete: (id) => api.delete(`/api/students/${id}`),
}

/**
 * Course API endpoints
 */
export const courseAPI = {
    getAll: (params) => api.get(`/api/courses?${new URLSearchParams(params)}`),
    getById: (id) => api.get(`/api/courses/${id}`),
    create: (data) => api.post('/api/courses', data),
    update: (id, data) => api.put(`/api/courses/${id}`, data),
    delete: (id) => api.delete(`/api/courses/${id}`),
    enroll: (id, data) => api.post(`/api/courses/${id}/enroll`, data),
}

/**
 * Enrollment API endpoints
 */
export const enrollmentAPI = {
    getAll: (params) => api.get(`/api/enrollments?${new URLSearchParams(params)}`),
    getById: (id) => api.get(`/api/enrollments/${id}`),
    getMy: () => api.get('/api/enrollments/my'),
    create: (data) => api.post('/api/enrollments', data),
    update: (id, data) => api.put(`/api/enrollments/${id}`, data),
    cancel: (id) => api.delete(`/api/enrollments/${id}`),
}

/**
 * Payment API endpoints
 */
export const paymentAPI = {
    getAll: (params) => api.get(`/api/payments?${new URLSearchParams(params)}`),
    getById: (id) => api.get(`/api/payments/${id}`),
    getMy: () => api.get('/api/payments/my'),
    create: (data) => api.post('/api/payments/create', data),
    getHistory: () => api.get('/api/payments/history'),
}

/**
 * Notice API endpoints
 */
export const noticeAPI = {
    getAll: (params) => api.get(`/api/notices?${new URLSearchParams(params)}`),
    getById: (id) => api.get(`/api/notices/${id}`),
    create: (data) => api.post('/api/notices', data),
    update: (id, data) => api.put(`/api/notices/${id}`, data),
    delete: (id) => api.delete(`/api/notices/${id}`),
    markRead: (id) => api.post(`/api/notices/${id}/read`, {}),
}

/**
 * Analytics API endpoints
 */
export const analyticsAPI = {
    getOverview: () => api.get('/api/analytics/overview'),
    getRevenue: (params) => api.get(`/api/analytics/revenue?${new URLSearchParams(params)}`),
    getEnrollments: () => api.get('/api/analytics/enrollment'),
}
