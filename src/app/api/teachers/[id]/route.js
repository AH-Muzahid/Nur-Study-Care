import { teacherService } from '@/services/teacherService'
import { verifyAuthToken, checkRole } from '@/lib/auth/jwt-verify'
import { successResponse, handleApiError, forbiddenError } from '@/lib/api-response'
import { UserRole } from '@/constants/roles'

/**
 * GET /api/teachers/[id] - Get teacher details
 */
export async function GET(request, { params }) {
    try {
        const decoded = await verifyAuthToken(request)
        const { id } = params

        // Teachers can only view their own profile unless they're admin
        if (decoded.role === UserRole.TEACHER) {
            const teacher = await teacherService.getTeacherByUserId(decoded.userId)
            if (teacher._id.toString() !== id && decoded.role !== UserRole.ADMIN) {
                return forbiddenError('You can only view your own profile')
            }
        }

        const teacher = await teacherService.getTeacher(id, true)
        return successResponse(teacher)
    } catch (error) {
        return handleApiError(error)
    }
}

/**
 * PUT /api/teachers/[id] - Update teacher profile
 */
export async function PUT(request, { params }) {
    try {
        const decoded = await verifyAuthToken(request)
        const { id } = params

        // Teachers can update their own profile, admins can update any
        if (decoded.role === UserRole.TEACHER) {
            const teacher = await teacherService.getTeacherByUserId(decoded.userId)
            if (teacher._id.toString() !== id) {
                return forbiddenError('You can only update your own profile')
            }
        } else if (!checkRole(decoded.role, [UserRole.ADMIN])) {
            return forbiddenError('Insufficient permissions')
        }

        const body = await request.json()
        const teacher = await teacherService.updateTeacher(id, body)

        return successResponse(teacher, 'Teacher profile updated successfully')
    } catch (error) {
        return handleApiError(error)
    }
}

/**
 * DELETE /api/teachers/[id] - Delete teacher (soft delete)
 */
export async function DELETE(request, { params }) {
    try {
        const decoded = await verifyAuthToken(request)

        if (!checkRole(decoded.role, [UserRole.ADMIN])) {
            return forbiddenError('Only admins can delete teacher profiles')
        }

        const { id } = params
        await teacherService.deleteTeacher(id)

        return successResponse(null, 'Teacher profile deleted successfully')
    } catch (error) {
        return handleApiError(error)
    }
}
