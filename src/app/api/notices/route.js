import { noticeService } from '@/services/noticeService'
import { verifyAuthToken, checkRole } from '@/lib/auth/jwt-verify'
import { successResponse, handleApiError, forbiddenError, validationError } from '@/lib/api-response'
import { noticeSchema } from '@/lib/validations'
import { UserRole } from '@/constants/roles'

/**
 * GET /api/notices - List notices
 */
export async function GET(request) {
    try {
        const decoded = await verifyAuthToken(request)

        const { searchParams } = new URL(request.url)
        const page = parseInt(searchParams.get('page') || '1')
        const limit = parseInt(searchParams.get('limit') || '10')
        const type = searchParams.get('type') || ''
        const search = searchParams.get('search') || ''
        const activeOnly = searchParams.get('activeOnly') === 'true'

        // Build filters
        const filters = {}
        if (type) filters.type = type
        if (search) filters.search = search
        if (activeOnly) filters.activeOnly = true

        // Filter by target audience based on role
        filters.targetAudience = decoded.role

        const result = await noticeService.listNotices(filters, { page, limit })

        return successResponse(result)
    } catch (error) {
        return handleApiError(error)
    }
}

/**
 * POST /api/notices - Create new notice (Admin/Teacher only)
 */
export async function POST(request) {
    try {
        const decoded = await verifyAuthToken(request)

        if (!checkRole(decoded.role, [UserRole.ADMIN, UserRole.TEACHER])) {
            return forbiddenError('Only admins and teachers can create notices')
        }

        const body = await request.json()
        const validation = noticeSchema.safeParse(body)

        if (!validation.success) {
            return validationError(validation.error.errors)
        }

        const notice = await noticeService.createNotice(validation.data, decoded.userId)

        return successResponse(notice, 'Notice created successfully', 201)
    } catch (error) {
        return handleApiError(error)
    }
}
