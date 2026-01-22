import { paymentService } from '@/services/paymentService'
import { verifyAuthToken, checkRole } from '@/lib/auth/jwt-verify'
import { successResponse, handleApiError, forbiddenError, validationError } from '@/lib/api-response'
import { paymentSchema } from '@/lib/validations'
import { UserRole } from '@/constants/roles'

/**
 * GET /api/payments - List payments
 */
export async function GET(request) {
    try {
        const decoded = await verifyAuthToken(request)

        const { searchParams } = new URL(request.url)
        const page = parseInt(searchParams.get('page') || '1')
        const limit = parseInt(searchParams.get('limit') || '10')
        const studentId = searchParams.get('student') || ''
        const enrollmentId = searchParams.get('enrollment') || ''
        const status = searchParams.get('status') || ''
        const method = searchParams.get('method') || ''
        const dateFrom = searchParams.get('dateFrom') || ''
        const dateTo = searchParams.get('dateTo') || ''

        // Build filters
        const filters = {}
        if (studentId) filters.student = studentId
        if (enrollmentId) filters.enrollment = enrollmentId
        if (status) filters.status = status
        if (method) filters.method = method
        if (dateFrom) filters.dateFrom = dateFrom
        if (dateTo) filters.dateTo = dateTo

        // Students can only view their own payments
        if (decoded.role === UserRole.STUDENT) {
            const studentService = require('@/services/studentService').studentService
            const student = await studentService.getStudentByUserId(decoded.userId)
            filters.student = student._id.toString()
        }

        const result = await paymentService.listPayments(filters, { page, limit })

        return successResponse(result)
    } catch (error) {
        return handleApiError(error)
    }
}

/**
 * POST /api/payments - Process new payment
 */
export async function POST(request) {
    try {
        const decoded = await verifyAuthToken(request)

        if (!checkRole(decoded.role, [UserRole.ADMIN])) {
            return forbiddenError('Only admins can process payments')
        }

        const body = await request.json()
        const validation = paymentSchema.safeParse(body)

        if (!validation.success) {
            return validationError(validation.error.errors)
        }

        const payment = await paymentService.processPayment(validation.data, decoded.userId)

        return successResponse(payment, 'Payment processed successfully', 201)
    } catch (error) {
        return handleApiError(error)
    }
}
