import { teacherService } from '@/services/teacherService'
import { verifyAuthToken } from '@/lib/auth/jwt-verify'
import { successResponse, handleApiError } from '@/lib/api-response'
import { UserRole } from '@/constants/roles'

/**
 * GET /api/teachers/me - Get current teacher's profile
 */
export async function GET(request) {
    try {
        const decoded = await verifyAuthToken(request)

        if (decoded.role !== UserRole.TEACHER) {
            throw new Error('Only teachers can access this endpoint')
        }

        const teacher = await teacherService.getTeacherByUserId(decoded.userId)

        return successResponse(teacher)
    } catch (error) {
        return handleApiError(error)
    }
}
