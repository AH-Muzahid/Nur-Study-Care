import { studentService } from '@/services/studentService'
import { verifyAuthToken } from '@/lib/auth/jwt-verify'
import { successResponse, handleApiError } from '@/lib/api-response'
import { UserRole } from '@/constants/roles'

/**
 * GET /api/students/me - Get current student's profile
 */
export async function GET(request) {
    try {
        const decoded = await verifyAuthToken(request)

        if (decoded.role !== UserRole.STUDENT) {
            throw new Error('Only students can access this endpoint')
        }

        const student = await studentService.getStudentByUserId(decoded.userId)

        return successResponse(student)
    } catch (error) {
        return handleApiError(error)
    }
}
