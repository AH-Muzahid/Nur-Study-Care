import { UserRole } from './roles'

export const PERMISSIONS = {
    [UserRole.STUDENT]: {
        courses: ['read'],
        profile: ['read', 'update'],
        payments: ['read', 'create'],
        enrollments: ['read', 'create'],
        notices: ['read'],
        schedule: ['read'],
    },
    [UserRole.TEACHER]: {
        courses: ['read'],
        students: ['read'],
        classes: ['read', 'update'],
        attendance: ['create', 'update'],
        grades: ['create', 'update'],
        notices: ['read'],
        schedule: ['read'],
    },
    [UserRole.ADMIN]: {
        courses: ['create', 'read', 'update', 'delete'],
        students: ['create', 'read', 'update', 'delete'],
        teachers: ['create', 'read', 'update', 'delete'],
        payments: ['read', 'update', 'refund'],
        enrollments: ['create', 'read', 'update', 'delete'],
        notices: ['create', 'read', 'update', 'delete'],
        schedule: ['create', 'read', 'update', 'delete'],
        analytics: ['read'],
    },
}

export const checkPermission = (role, resource, action) => {
    const rolePermissions = PERMISSIONS[role]
    if (!rolePermissions) return false

    const resourcePermissions = rolePermissions[resource]
    if (!resourcePermissions) return false

    return resourcePermissions.includes(action)
}
