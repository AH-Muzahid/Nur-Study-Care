import { courseService } from '@/services/courseService'
import { verifyAuthToken, checkRole } from '@/lib/auth/jwt-verify'
import { successResponse, handleApiError, forbiddenError, validationError } from '@/lib/api-response'
import { courseSchema } from '@/lib/validations'
import { UserRole } from '@/constants/roles'

/**
 * GET /api/courses - List all courses
 */
export async function GET(request) {
    try {
        // Verify authentication
        const decoded = await verifyAuthToken(request)

        // Get query parameters
        const { searchParams } = new URL(request.url)
        const page = parseInt(searchParams.get('page') || '1')
        const limit = parseInt(searchParams.get('limit') || '10')
        const search = searchParams.get('search') || ''
        const subject = searchParams.get('subject') || ''
        const level = searchParams.get('level') || ''
        const status = searchParams.get('status') || ''

        // Build filters
        const filters = {}
        if (search) filters.search = search
        if (subject) filters.subject = subject
        if (level) filters.level = level
        if (status) filters.status = status

        // Get courses
        const result = await courseService.listCourses(filters, { page, limit })

        return successResponse(result)
    } catch (error) {
        return handleApiError(error)
    }
}

/**
 * POST /api/courses - Create new course (Admin only)
 */
export async function POST(request) {
    try {
        const decoded = await verifyAuthToken(request)

        if (!checkRole(decoded.role, [UserRole.ADMIN])) {
            return forbiddenError('Only admins can create courses')
        }

        const body = await request.json()
        const validation = courseSchema.safeParse(body)

        if (!validation.success) {
            return validationError(validation.error.errors)
        }

        const course = await courseService.createCourse(validation.data, decoded.userId)

        return successResponse(course, 'Course created successfully', 201)
    } catch (error) {
        return handleApiError(error)
    }
}
