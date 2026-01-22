import mongoose from 'mongoose'
import { paymentRepository } from '@/repositories/paymentRepository'
import { enrollmentRepository } from '@/repositories/enrollmentRepository'
import { PaymentStatus, PaymentMethod } from '@/constants/roles'
import { MockPaymentGateway } from '@/lib/payments/mock-gateway'

export const paymentService = {
    async processPayment(paymentData, receivedBy) {
        const session = await mongoose.startSession()
        session.startTransaction()

        try {
            // Verify enrollment exists
            const enrollment = await enrollmentRepository.findById(paymentData.enrollment)
            if (!enrollment) {
                throw new Error('Enrollment not found')
            }

            // Calculate due amount
            const dueAmount = enrollment.totalFee - enrollment.paidAmount
            if (paymentData.amount > dueAmount) {
                throw new Error(`Payment amount exceeds due amount of ${dueAmount}`)
            }

            // Generate payment ID
            const paymentId = await paymentRepository.generatePaymentId()

            // Process payment based on method
            let gatewayResponse = null
            let status = PaymentStatus.PENDING

            if ([PaymentMethod.BKASH, PaymentMethod.NAGAD, PaymentMethod.ROCKET].includes(paymentData.method)) {
                // Use mock gateway for mobile banking
                const gateway = new MockPaymentGateway()
                const result = await gateway.processPayment({
                    amount: paymentData.amount,
                    method: paymentData.method,
                    accountNumber: paymentData.accountNumber || 'N/A',
                })

                gatewayResponse = result
                status = result.success ? PaymentStatus.COMPLETED : PaymentStatus.FAILED
            } else if (paymentData.method === PaymentMethod.CASH) {
                // Cash payments are immediately completed
                status = PaymentStatus.COMPLETED
                gatewayResponse = { method: 'cash', receivedAt: new Date() }
            }

            // Create payment record
            const payment = await paymentRepository.create({
                ...paymentData,
                paymentId,
                student: enrollment.student,
                status,
                gatewayResponse,
                receivedBy,
                paymentDate: new Date(),
            })

            // Update enrollment paid amount if payment successful
            if (status === PaymentStatus.COMPLETED) {
                await enrollmentRepository.update(enrollment._id, {
                    paidAmount: enrollment.paidAmount + paymentData.amount,
                })
            }

            await session.commitTransaction()

            return await paymentRepository.findById(payment._id, ['student', 'enrollment'])
        } catch (error) {
            await session.abortTransaction()
            throw error
        } finally {
            session.endSession()
        }
    },

    async getPayment(id) {
        const payment = await paymentRepository.findById(id, ['student', 'enrollment'])
        if (!payment) {
            throw new Error('Payment not found')
        }
        return payment
    },

    async listPayments(filters, options) {
        return await paymentRepository.findAll(filters, options)
    },

    async getStudentPayments(studentId, options = {}) {
        return await paymentRepository.findAll(
            { student: studentId },
            options
        )
    },

    async getEnrollmentPayments(enrollmentId, options = {}) {
        return await paymentRepository.findAll(
            { enrollment: enrollmentId },
            options
        )
    },

    async refundPayment(id, refundAmount, reason) {
        const session = await mongoose.startSession()
        session.startTransaction()

        try {
            const payment = await paymentRepository.findById(id)
            if (!payment) {
                throw new Error('Payment not found')
            }

            if (payment.status !== PaymentStatus.COMPLETED) {
                throw new Error('Only completed payments can be refunded')
            }

            if (refundAmount > payment.amount) {
                throw new Error('Refund amount exceeds payment amount')
            }

            // Update payment
            await paymentRepository.update(id, {
                status: PaymentStatus.REFUNDED,
                refundAmount,
                refundDate: new Date(),
                remarks: reason,
            })

            // Update enrollment paid amount
            const enrollment = await enrollmentRepository.findById(payment.enrollment)
            await enrollmentRepository.update(enrollment._id, {
                paidAmount: enrollment.paidAmount - refundAmount,
            })

            await session.commitTransaction()

            return await paymentRepository.findById(id, ['student', 'enrollment'])
        } catch (error) {
            await session.abortTransaction()
            throw error
        } finally {
            session.endSession()
        }
    },

    async getPaymentStats(filters = {}) {
        const payments = await paymentRepository.findAll(filters, { limit: 10000 })

        const stats = {
            total: payments.pagination.total,
            totalAmount: 0,
            completedAmount: 0,
            pendingAmount: 0,
            failedAmount: 0,
            byMethod: {},
            byStatus: {},
        }

        payments.payments.forEach(payment => {
            stats.totalAmount += payment.amount

            // By status
            if (payment.status === PaymentStatus.COMPLETED) {
                stats.completedAmount += payment.amount
            } else if (payment.status === PaymentStatus.PENDING) {
                stats.pendingAmount += payment.amount
            } else if (payment.status === PaymentStatus.FAILED) {
                stats.failedAmount += payment.amount
            }

            // Count by method
            stats.byMethod[payment.method] = (stats.byMethod[payment.method] || 0) + 1

            // Count by status
            stats.byStatus[payment.status] = (stats.byStatus[payment.status] || 0) + 1
        })

        return stats
    },
}
