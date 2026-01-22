import { enrollmentService } from '@/services/enrollmentService'
import { verifyAuthToken, checkRole } from '@/lib/auth/jwt-verify'
import { successResponse, handleApiError, forbiddenError } from '@/lib/api-response'
import { UserRole } from '@/constants/roles'

/**
 * GET /api/enrollments - List enrollments
 */
export async function GET(request) {
    try {
        const decoded = await verifyAuthToken(request)

        const { searchParams } = new URL(request.url)
        const page = parseInt(searchParams.get('page') || '1')
        const limit = parseInt(searchParams.get('limit') || '10')
        const studentId = searchParams.get('student') || ''
        const courseId = searchParams.get('course') || ''
        const status = searchParams.get('status') || ''

        // Build filters
        const filters = {}
        if (studentId) filters.student = studentId
        if (courseId) filters.course = courseId
        if (status) filters.status = status

        // Students can only view their own enrollments
        if (decoded.role === UserRole.STUDENT) {
            const studentService = require('@/services/studentService').studentService
            const student = await studentService.getStudentByUserId(decoded.userId)
            filters.student = student._id.toString()
        }

        const result = await enrollmentService.listEnrollments(filters, { page, limit })

        return successResponse(result)
    } catch (error) {
        return handleApiError(error)
    }
}

/**
 * POST /api/enrollments - Create new enrollment
 */
export async function POST(request) {
    try {
        const decoded = await verifyAuthToken(request)

        // Only admin can create enrollments
        if (!checkRole(decoded.role, [UserRole.ADMIN])) {
            return forbiddenError('Only admins can create enrollments')
        }

        const body = await request.json()
        const enrollment = await enrollmentService.createEnrollment(body)

        return successResponse(enrollment, 'Enrollment created successfully', 201)
    } catch (error) {
        return handleApiError(error)
    }
}
