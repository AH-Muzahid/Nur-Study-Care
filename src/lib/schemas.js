import * as z from 'zod'

// Reusable field validators
export const validators = {
    email: z.string().email('Invalid email address'),

    password: z
        .string()
        .min(8, 'Password must be at least 8 characters')
        .regex(/[A-Z]/, 'Must contain uppercase letter')
        .regex(/[a-z]/, 'Must contain lowercase letter')
        .regex(/[0-9]/, 'Must contain number')
        .regex(/[^A-Za-z0-9]/, 'Must contain special character'),

    phone: z.string().regex(/^01[3-9]\d{8}$/, 'Invalid Bangladeshi phone number'),

    name: z.string().min(2, 'Name must be at least 2 characters').max(100),

    amount: z.number().min(0, 'Amount must be positive'),

    date: z.string().or(z.date()),
}

// Login schema
export const loginSchema = z.object({
    email: validators.email,
    password: z.string().min(1, 'Password is required'),
})

// Register schema
export const registerSchema = z.object({
    name: validators.name,
    email: validators.email,
    phone: validators.phone,
    password: validators.password,
    role: z.enum(['STUDENT', 'TEACHER', 'ADMIN']).default('STUDENT').optional(),
})

// Student profile schema
export const studentProfileSchema = z.object({
    fatherName: validators.name,
    motherName: validators.name,
    dateOfBirth: validators.date,
    address: z.object({
        street: z.string().min(1, 'Street is required'),
        city: z.string().min(1, 'City is required'),
        district: z.string().min(1, 'District is required'),
        postalCode: z.string().optional(),
    }),
    guardianPhone: validators.phone,
    emergencyContact: validators.phone,
    educationInfo: z.object({
        institution: z.string().min(1, 'Institution is required'),
        class: z.string().min(1, 'Class is required'),
        group: z.string().optional(),
    }),
})

// Course schema
export const courseSchema = z.object({
    title: z.string().min(3, 'Title must be at least 3 characters').max(200),
    description: z.string().min(10, 'Description must be at least 10 characters'),
    subject: z.string().min(1, 'Subject is required'),
    level: z.enum(['SSC', 'HSC', 'Admission', 'Job Preparation', 'Other']),
    duration: z.number().min(1, 'Duration must be at least 1 month'),
    fee: validators.amount,
    teacher: z.string().min(1, 'Teacher is required'),
    syllabus: z.array(z.string()).optional(),
})

// Payment schema
export const paymentSchema = z.object({
    enrollmentId: z.string().min(1, 'Enrollment is required'),
    amount: validators.amount,
    method: z.enum(['CASH', 'BKASH', 'NAGAD', 'ROCKET', 'BANK_TRANSFER', 'CARD']),
    accountNumber: z.string().optional(),
    remarks: z.string().optional(),
})

// Notice schema
export const noticeSchema = z.object({
    title: z.string().min(3, 'Title must be at least 3 characters').max(200),
    content: z.string().min(10, 'Content must be at least 10 characters'),
    type: z.enum(['GENERAL', 'EXAM', 'HOLIDAY', 'EVENT', 'URGENT']),
    targetAudience: z.array(z.enum(['STUDENT', 'TEACHER', 'ALL'])),
    courses: z.array(z.string()).optional(),
    publishDate: validators.date.optional(),
    expiryDate: validators.date.optional(),
})

// Batch schedule schema
export const batchScheduleSchema = z.object({
    batchName: z.string().min(1, 'Batch name is required'),
    startDate: validators.date,
    endDate: validators.date.optional(),
    schedule: z.array(
        z.object({
            day: z.enum(['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']),
            startTime: z.string().regex(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format (HH:MM)'),
            endTime: z.string().regex(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format (HH:MM)'),
        })
    ),
    capacity: z.number().min(5, 'Minimum 5 students').max(100, 'Maximum 100 students'),
    room: z.string().optional(),
})
