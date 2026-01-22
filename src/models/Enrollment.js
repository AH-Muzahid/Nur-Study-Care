import mongoose from 'mongoose'
import { EnrollmentStatus } from '@/constants/roles'

const EnrollmentSchema = new mongoose.Schema(
    {
        enrollmentId: {
            type: String,
            required: true,
            unique: true,
            match: /^ENR-\d{4}-\d{6}$/,
        },
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Student',
            required: true,
        },
        course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Course',
            required: true,
        },
        batchName: {
            type: String,
            required: true,
        },
        enrollmentDate: {
            type: Date,
            required: true,
            default: Date.now,
        },
        status: {
            type: String,
            enum: Object.values(EnrollmentStatus),
            default: EnrollmentStatus.PENDING,
        },
        totalFee: {
            type: Number,
            required: true,
            min: 0,
        },
        paidAmount: {
            type: Number,
            default: 0,
            min: 0,
        },
        dueAmount: {
            type: Number,
            required: true,
        },
        attendance: [
            {
                date: { type: Date, required: true },
                present: { type: Boolean, required: true },
                remarks: String,
            },
        ],
        grades: [
            {
                examName: { type: String, required: true },
                marks: { type: Number, required: true, min: 0 },
                totalMarks: { type: Number, required: true, min: 0 },
                date: { type: Date, required: true },
            },
        ],
        completionDate: Date,
        certificate: String,
    },
    {
        timestamps: true,
    }
)

// Indexes
EnrollmentSchema.index({ enrollmentId: 1 })
EnrollmentSchema.index({ student: 1, course: 1 })
EnrollmentSchema.index({ status: 1 })
EnrollmentSchema.index({ enrollmentDate: -1 })
EnrollmentSchema.index({ student: 1, status: 1 })

// Pre-save middleware: Calculate due amount
EnrollmentSchema.pre('save', function (next) {
    this.dueAmount = this.totalFee - this.paidAmount
    next()
})

const Enrollment = mongoose.models.Enrollment || mongoose.model('Enrollment', EnrollmentSchema)

export default Enrollment
