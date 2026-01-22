import { studentService } from '@/services/studentService'
import { verifyAuthToken, checkRole } from '@/lib/auth/jwt-verify'
import { successResponse, handleApiError, forbiddenError } from '@/lib/api-response'
import { UserRole } from '@/constants/roles'

/**
 * GET /api/students/[id] - Get student details
 */
export async function GET(request, { params }) {
    try {
        const decoded = await verifyAuthToken(request)
        const { id } = params

        // Students can only view their own profile
        if (decoded.role === UserRole.STUDENT) {
            const student = await studentService.getStudentByUserId(decoded.userId)
            if (student._id.toString() !== id) {
                return forbiddenError('You can only view your own profile')
            }
        }

        const student = await studentService.getStudent(id, true)
        return successResponse(student)
    } catch (error) {
        return handleApiError(error)
    }
}

/**
 * PUT /api/students/[id] - Update student profile
 */
export async function PUT(request, { params }) {
    try {
        const decoded = await verifyAuthToken(request)
        const { id } = params

        // Students can only update their own profile
        if (decoded.role === UserRole.STUDENT) {
            const student = await studentService.getStudentByUserId(decoded.userId)
            if (student._id.toString() !== id) {
                return forbiddenError('You can only update your own profile')
            }
        }

        const body = await request.json()
        const student = await studentService.updateStudent(id, body)

        return successResponse(student, 'Student profile updated successfully')
    } catch (error) {
        return handleApiError(error)
    }
}

/**
 * DELETE /api/students/[id] - Delete student (soft delete)
 */
export async function DELETE(request, { params }) {
    try {
        const decoded = await verifyAuthToken(request)

        if (!checkRole(decoded.role, [UserRole.ADMIN])) {
            return forbiddenError('Only admins can delete student profiles')
        }

        const { id } = params
        await studentService.deleteStudent(id)

        return successResponse(null, 'Student profile deleted successfully')
    } catch (error) {
        return handleApiError(error)
    }
}
