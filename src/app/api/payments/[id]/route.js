import { paymentService } from '@/services/paymentService'
import { verifyAuthToken, checkRole } from '@/lib/auth/jwt-verify'
import { successResponse, handleApiError, forbiddenError } from '@/lib/api-response'
import { UserRole } from '@/constants/roles'

/**
 * GET /api/payments/[id] - Get payment details
 */
export async function GET(request, { params }) {
    try {
        const decoded = await verifyAuthToken(request)
        const { id } = params

        const payment = await paymentService.getPayment(id)

        // Students can only view their own payments
        if (decoded.role === UserRole.STUDENT) {
            const studentService = require('@/services/studentService').studentService
            const student = await studentService.getStudentByUserId(decoded.userId)
            if (payment.student._id.toString() !== student._id.toString()) {
                return forbiddenError('You can only view your own payments')
            }
        }

        return successResponse(payment)
    } catch (error) {
        return handleApiError(error)
    }
}
