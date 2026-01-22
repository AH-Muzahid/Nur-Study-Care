import { NextResponse } from 'next/server'
import { studentService } from '@/services/studentService'
import { verifyAuthToken, checkRole } from '@/lib/auth/jwt-verify'
import { successResponse, handleApiError, forbiddenError, validationError } from '@/lib/api-response'
import { studentSchema } from '@/lib/validations'
import { UserRole } from '@/constants/roles'

/**
 * GET /api/students - List all students (Admin/Teacher only)
 */
export async function GET(request) {
    try {
        // Verify authentication
        const decoded = await verifyAuthToken(request)

        // Check permissions
        if (!checkRole(decoded.role, [UserRole.ADMIN, UserRole.TEACHER])) {
            return forbiddenError('Only admins and teachers can view students list')
        }

        // Get query parameters
        const { searchParams } = new URL(request.url)
        const page = parseInt(searchParams.get('page') || '1')
        const limit = parseInt(searchParams.get('limit') || '10')
        const search = searchParams.get('search') || ''
        const classFilter = searchParams.get('class') || ''
        const isActive = searchParams.get('isActive')

        // Build filters
        const filters = {}
        if (search) filters.search = search
        if (classFilter) filters.class = classFilter
        if (isActive !== null) filters.isActive = isActive === 'true'

        // Get students
        const result = await studentService.listStudents(filters, { page, limit })

        return successResponse(result)
    } catch (error) {
        return handleApiError(error)
    }
}

/**
 * POST /api/students - Create new student profile (Admin only)
 */
export async function POST(request) {
    try {
        // Verify authentication
        const decoded = await verifyAuthToken(request)

        // Check permissions
        if (!checkRole(decoded.role, [UserRole.ADMIN])) {
            return forbiddenError('Only admins can create student profiles')
        }

        // Parse and validate request body
        const body = await request.json()
        const validation = studentSchema.safeParse(body)

        if (!validation.success) {
            return validationError(validation.error.errors)
        }

        // Create student
        const student = await studentService.createStudent(
            validation.data.userId,
            validation.data
        )

        return successResponse(student, 'Student profile created successfully', 201)
    } catch (error) {
        return handleApiError(error)
    }
}
