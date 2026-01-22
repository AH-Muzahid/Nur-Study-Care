import { teacherService } from '@/services/teacherService'
import { verifyAuthToken, checkRole } from '@/lib/auth/jwt-verify'
import { successResponse, handleApiError, forbiddenError } from '@/lib/api-response'
import { UserRole } from '@/constants/roles'

/**
 * GET /api/teachers - List all teachers
 */
export async function GET(request) {
    try {
        const decoded = await verifyAuthToken(request)

        if (!checkRole(decoded.role, [UserRole.ADMIN, UserRole.TEACHER])) {
            return forbiddenError('Insufficient permissions')
        }

        const { searchParams } = new URL(request.url)
        const page = parseInt(searchParams.get('page') || '1')
        const limit = parseInt(searchParams.get('limit') || '10')
        const search = searchParams.get('search') || ''
        const subject = searchParams.get('subject') || ''

        const filters = {}
        if (search) filters.search = search
        if (subject) filters.subject = subject

        const result = await teacherService.listTeachers(filters, { page, limit })

        return successResponse(result)
    } catch (error) {
        return handleApiError(error)
    }
}

/**
 * POST /api/teachers - Create new teacher profile (Admin only)
 */
export async function POST(request) {
    try {
        const decoded = await verifyAuthToken(request)

        if (!checkRole(decoded.role, [UserRole.ADMIN])) {
            return forbiddenError('Only admins can create teacher profiles')
        }

        const body = await request.json()
        const teacher = await teacherService.createTeacher(body.userId, body)

        return successResponse(teacher, 'Teacher profile created successfully', 201)
    } catch (error) {
        return handleApiError(error)
    }
}
