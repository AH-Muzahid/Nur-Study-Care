import mongoose from 'mongoose'
import { PaymentMethod, PaymentStatus } from '@/constants/roles'

const PaymentSchema = new mongoose.Schema(
    {
        paymentId: {
            type: String,
            required: true,
            unique: true,
            match: /^PAY-\d{4}-\d{8}$/,
        },
        enrollment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Enrollment',
            required: true,
        },
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student',
            required: true,
        },
        amount: {
            type: Number,
            required: true,
            min: 0,
        },
        method: {
            type: String,
            enum: Object.values(PaymentMethod),
            required: true,
        },
        status: {
            type: String,
            enum: Object.values(PaymentStatus),
            default: PaymentStatus.PENDING,
        },
        transactionId: {
            type: String,
            sparse: true,
            unique: true,
        },
        gatewayResponse: mongoose.Schema.Types.Mixed,
        paymentDate: {
            type: Date,
            default: Date.now,
        },
        receivedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        remarks: String,
        refundAmount: {
            type: Number,
            min: 0,
        },
        refundDate: Date,
    },
    {
        timestamps: true,
    }
)

// Indexes
PaymentSchema.index({ paymentId: 1 })
PaymentSchema.index({ enrollment: 1 })
PaymentSchema.index({ student: 1 })
PaymentSchema.index({ status: 1 })
PaymentSchema.index({ paymentDate: -1 })
PaymentSchema.index({ method: 1, status: 1 })
PaymentSchema.index({ paymentDate: -1, status: 1 })

const Payment = mongoose.models.Payment || mongoose.model('Payment', PaymentSchema)

export default Payment
