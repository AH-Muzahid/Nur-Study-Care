import { noticeService } from '@/services/noticeService'
import { verifyAuthToken, checkRole } from '@/lib/auth/jwt-verify'
import { successResponse, handleApiError, forbiddenError } from '@/lib/api-response'
import { UserRole } from '@/constants/roles'

/**
 * GET /api/notices/[id] - Get notice details
 */
export async function GET(request, { params }) {
    try {
        const decoded = await verifyAuthToken(request)
        const { id } = params

        // Get notice and mark as viewed
        const notice = await noticeService.getNotice(id, decoded.userId)

        return successResponse(notice)
    } catch (error) {
        return handleApiError(error)
    }
}

/**
 * PUT /api/notices/[id] - Update notice
 */
export async function PUT(request, { params }) {
    try {
        const decoded = await verifyAuthToken(request)

        if (!checkRole(decoded.role, [UserRole.ADMIN, UserRole.TEACHER])) {
            return forbiddenError('Only admins and teachers can update notices')
        }

        const { id } = params
        const body = await request.json()
        const notice = await noticeService.updateNotice(id, body)

        return successResponse(notice, 'Notice updated successfully')
    } catch (error) {
        return handleApiError(error)
    }
}

/**
 * DELETE /api/notices/[id] - Delete notice (soft delete)
 */
export async function DELETE(request, { params }) {
    try {
        const decoded = await verifyAuthToken(request)

        if (!checkRole(decoded.role, [UserRole.ADMIN])) {
            return forbiddenError('Only admins can delete notices')
        }

        const { id } = params
        await noticeService.deleteNotice(id)

        return successResponse(null, 'Notice deleted successfully')
    } catch (error) {
        return handleApiError(error)
    }
}
