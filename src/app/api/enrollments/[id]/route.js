import { enrollmentService } from '@/services/enrollmentService'
import { verifyAuthToken, checkRole } from '@/lib/auth/jwt-verify'
import { successResponse, handleApiError, forbiddenError } from '@/lib/api-response'
import { UserRole } from '@/constants/roles'

/**
 * GET /api/enrollments/[id] - Get enrollment details
 */
export async function GET(request, { params }) {
    try {
        const decoded = await verifyAuthToken(request)
        const { id } = params

        const enrollment = await enrollmentService.getEnrollment(id)

        // Students can only view their own enrollments
        if (decoded.role === UserRole.STUDENT) {
            const studentService = require('@/services/studentService').studentService
            const student = await studentService.getStudentByUserId(decoded.userId)
            if (enrollment.student._id.toString() !== student._id.toString()) {
                return forbiddenError('You can only view your own enrollments')
            }
        }

        return successResponse(enrollment)
    } catch (error) {
        return handleApiError(error)
    }
}

/**
 * PUT /api/enrollments/[id] - Update enrollment status
 */
export async function PUT(request, { params }) {
    try {
        const decoded = await verifyAuthToken(request)

        if (!checkRole(decoded.role, [UserRole.ADMIN])) {
            return forbiddenError('Only admins can update enrollment status')
        }

        const { id } = params
        const body = await request.json()

        const enrollment = await enrollmentService.updateEnrollmentStatus(id, body.status)

        return successResponse(enrollment, 'Enrollment updated successfully')
    } catch (error) {
        return handleApiError(error)
    }
}

/**
 * DELETE /api/enrollments/[id] - Cancel enrollment
 */
export async function DELETE(request, { params }) {
    try {
        const decoded = await verifyAuthToken(request)

        if (!checkRole(decoded.role, [UserRole.ADMIN])) {
            return forbiddenError('Only admins can cancel enrollments')
        }

        const { id } = params
        const { searchParams } = new URL(request.url)
        const reason = searchParams.get('reason') || 'Cancelled by admin'

        const enrollment = await enrollmentService.cancelEnrollment(id, reason)

        return successResponse(enrollment, 'Enrollment cancelled successfully')
    } catch (error) {
        return handleApiError(error)
    }
}
