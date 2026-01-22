import * as z from 'zod'

// User validation schemas
export const registerSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters').max(100),
    email: z.string().email('Invalid email address'),
    password: z
        .string()
        .min(8, 'Password must be at least 8 characters')
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
        .regex(/[0-9]/, 'Password must contain at least one number')
        .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),
    phone: z.string().regex(/^01[3-9]\d{8}$/, 'Invalid Bangladeshi phone number'),
    role: z.enum(['STUDENT', 'TEACHER', 'ADMIN']).default('STUDENT'),
})

export const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
})

// Student validation schemas
export const studentSchema = z.object({
    userId: z.string(),
    fatherName: z.string().min(2).max(100),
    motherName: z.string().min(2).max(100),
    dateOfBirth: z.string().or(z.date()),
    address: z.object({
        street: z.string().min(1),
        city: z.string().min(1),
        district: z.string().min(1),
        postalCode: z.string().optional(),
    }),
    guardianPhone: z.string().regex(/^01[3-9]\d{8}$/),
    emergencyContact: z.string().regex(/^01[3-9]\d{8}$/),
    educationInfo: z.object({
        institution: z.string().min(1),
        class: z.string().min(1),
        group: z.string().optional(),
    }),
})

// Course validation schemas
export const courseSchema = z.object({
    title: z.string().min(3).max(200),
    description: z.string().min(10),
    subject: z.string().min(1),
    level: z.enum(['SSC', 'HSC', 'Admission', 'Job Preparation', 'Other']),
    duration: z.number().min(1),
    fee: z.number().min(0),
    teacher: z.string(),
    syllabus: z.array(z.string()).optional(),
})

export const batchSchema = z.object({
    batchName: z.string().min(1),
    startDate: z.string().or(z.date()),
    endDate: z.string().or(z.date()).optional(),
    schedule: z.array(
        z.object({
            day: z.enum(['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']),
            startTime: z.string().regex(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format (HH:MM)'),
            endTime: z.string().regex(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format (HH:MM)'),
        })
    ),
    capacity: z.number().min(5).max(100),
    room: z.string().optional(),
})

// Payment validation schemas
export const paymentSchema = z.object({
    enrollmentId: z.string(),
    studentId: z.string(),
    amount: z.number().min(0),
    method: z.enum(['CASH', 'BKASH', 'NAGAD', 'ROCKET', 'BANK_TRANSFER', 'CARD']),
    remarks: z.string().optional(),
})

// Notice validation schemas
export const noticeSchema = z.object({
    title: z.string().min(3).max(200),
    content: z.string().min(10),
    type: z.enum(['GENERAL', 'EXAM', 'HOLIDAY', 'EVENT', 'URGENT']),
    targetAudience: z.array(z.enum(['STUDENT', 'TEACHER', 'ALL'])),
    courses: z.array(z.string()).optional(),
    publishDate: z.string().or(z.date()).optional(),
    expiryDate: z.string().or(z.date()).optional(),
})
