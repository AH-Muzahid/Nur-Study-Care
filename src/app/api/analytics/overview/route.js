import { analyticsService } from '@/services/analyticsService'
import { verifyAuthToken, checkRole } from '@/lib/auth/jwt-verify'
import { successResponse, handleApiError, forbiddenError } from '@/lib/api-response'
import { UserRole } from '@/constants/roles'

/**
 * GET /api/analytics/overview - Get dashboard overview statistics
 */
export async function GET(request) {
    try {
        const decoded = await verifyAuthToken(request)

        if (!checkRole(decoded.role, [UserRole.ADMIN])) {
            return forbiddenError('Only admins can view analytics')
        }

        const stats = await analyticsService.getOverviewStats()

        return successResponse(stats)
    } catch (error) {
        return handleApiError(error)
    }
}
