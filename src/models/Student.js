import mongoose from 'mongoose'

const StudentSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            unique: true,
        },
        studentId: {
            type: String,
            required: true,
            unique: true,
            match: /^STU-\d{4}-\d{4}$/,
        },
        fatherName: {
            type: String,
            required: true,
            trim: true,
        },
        motherName: {
            type: String,
            required: true,
            trim: true,
        },
        dateOfBirth: {
            type: Date,
            required: true,
        },
        address: {
            street: { type: String, required: true },
            city: { type: String, required: true },
            district: { type: String, required: true },
            postalCode: { type: String },
        },
        guardianPhone: {
            type: String,
            required: true,
            match: /^01[3-9]\d{8}$/,
        },
        emergencyContact: {
            type: String,
            required: true,
            match: /^01[3-9]\d{8}$/,
        },
        educationInfo: {
            institution: { type: String, required: true },
            class: { type: String, required: true },
            group: { type: String },
        },
        enrollments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Enrollment',
            },
        ],
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
)

// Indexes
StudentSchema.index({ 'educationInfo.class': 1 })

// Virtual for age
StudentSchema.virtual('age').get(function () {
    if (!this.dateOfBirth) return null
    const today = new Date()
    const birthDate = new Date(this.dateOfBirth)
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--
    }
    return age
})

const Student = mongoose.models.Student || mongoose.model('Student', StudentSchema)

export default Student
