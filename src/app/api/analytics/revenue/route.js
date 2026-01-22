import { analyticsService } from '@/services/analyticsService'
import { verifyAuthToken, checkRole } from '@/lib/auth/jwt-verify'
import { successResponse, handleApiError, forbiddenError } from '@/lib/api-response'
import { UserRole } from '@/constants/roles'

/**
 * GET /api/analytics/revenue - Get revenue analytics
 */
export async function GET(request) {
    try {
        const decoded = await verifyAuthToken(request)

        if (!checkRole(decoded.role, [UserRole.ADMIN])) {
            return forbiddenError('Only admins can view revenue analytics')
        }

        const { searchParams } = new URL(request.url)
        const months = parseInt(searchParams.get('months') || '6')

        const [byMonth, byMethod] = await Promise.all([
            analyticsService.getRevenueByMonth(months),
            analyticsService.getRevenueByMethod(),
        ])

        return successResponse({
            byMonth,
            byMethod,
        })
    } catch (error) {
        return handleApiError(error)
    }
}
