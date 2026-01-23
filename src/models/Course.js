import mongoose from 'mongoose'
import { CourseStatus, DayOfWeek } from '@/constants/roles'

const CourseSchema = new mongoose.Schema(
    {
        courseId: {
            type: String,
            required: true,
            unique: true,
            match: /^CRS-\d{4}-\d{4}$/,
        },
        title: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
        },
        subject: {
            type: String,
            required: true,
        },
        level: {
            type: String,
            required: true,
            enum: ['SSC', 'HSC', 'Admission', 'Job Preparation', 'Other'],
        },
        duration: {
            type: Number,
            required: true,
            min: 1,
        },
        fee: {
            type: Number,
            required: true,
            min: 0,
        },
        teacher: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Teacher',
            required: true,
        },
        batches: [
            {
                batchName: { type: String, required: true },
                startDate: { type: Date, required: true },
                endDate: { type: Date },
                schedule: [
                    {
                        day: {
                            type: String,
                            required: true,
                            enum: Object.values(DayOfWeek),
                        },
                        startTime: { type: String, required: true },
                        endTime: { type: String, required: true },
                    },
                ],
                capacity: { type: Number, required: true, min: 1 },
                enrolled: { type: Number, default: 0, min: 0 },
                room: { type: String },
            },
        ],
        syllabus: [String],
        status: {
            type: String,
            enum: Object.values(CourseStatus),
            default: CourseStatus.DRAFT,
        },
        thumbnail: String,
    },
    {
        timestamps: true,
    }
)

// Indexes
CourseSchema.index({ subject: 1, level: 1 })
CourseSchema.index({ teacher: 1 })
CourseSchema.index({ status: 1 })

// Text search index
CourseSchema.index({ title: 'text', description: 'text', subject: 'text' })

const Course = mongoose.models.Course || mongoose.model('Course', CourseSchema)

export default Course
