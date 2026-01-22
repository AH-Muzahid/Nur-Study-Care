import { courseService } from '@/services/courseService'
import { verifyAuthToken, checkRole } from '@/lib/auth/jwt-verify'
import { successResponse, handleApiError, forbiddenError } from '@/lib/api-response'
import { UserRole } from '@/constants/roles'

/**
 * GET /api/courses/[id] - Get course details
 */
export async function GET(request, { params }) {
    try {
        await verifyAuthToken(request)
        const { id } = params

        const course = await courseService.getCourse(id, true)
        return successResponse(course)
    } catch (error) {
        return handleApiError(error)
    }
}

/**
 * PUT /api/courses/[id] - Update course
 */
export async function PUT(request, { params }) {
    try {
        const decoded = await verifyAuthToken(request)

        if (!checkRole(decoded.role, [UserRole.ADMIN])) {
            return forbiddenError('Only admins can update courses')
        }

        const { id } = params
        const body = await request.json()
        const course = await courseService.updateCourse(id, body)

        return successResponse(course, 'Course updated successfully')
    } catch (error) {
        return handleApiError(error)
    }
}

/**
 * DELETE /api/courses/[id] - Delete course (soft delete)
 */
export async function DELETE(request, { params }) {
    try {
        const decoded = await verifyAuthToken(request)

        if (!checkRole(decoded.role, [UserRole.ADMIN])) {
            return forbiddenError('Only admins can delete courses')
        }

        const { id } = params
        await courseService.deleteCourse(id)

        return successResponse(null, 'Course deleted successfully')
    } catch (error) {
        return handleApiError(error)
    }
}
