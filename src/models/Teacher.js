import mongoose from 'mongoose'

const TeacherSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            unique: true,
        },
        teacherId: {
            type: String,
            required: true,
            unique: true,
            match: /^TCH-\d{4}-\d{4}$/,
        },
        subjects: [
            {
                type: String,
                required: true,
            },
        ],
        qualifications: [
            {
                degree: { type: String, required: true },
                institution: { type: String, required: true },
                year: { type: Number, required: true },
            },
        ],
        experience: {
            type: Number,
            required: true,
            min: 0,
        },
        joiningDate: {
            type: Date,
            required: true,
            default: Date.now,
        },
        salary: {
            type: Number,
            required: true,
            min: 0,
        },
        bankDetails: {
            accountName: String,
            accountNumber: String,
            bankName: String,
            branchName: String,
        },
        courses: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Course',
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
TeacherSchema.index({ subjects: 1 })

const Teacher = mongoose.models.Teacher || mongoose.model('Teacher', TeacherSchema)

export default Teacher
