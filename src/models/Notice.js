import mongoose from 'mongoose'
import { NoticeType } from '@/constants/roles'

const NoticeSchema = new mongoose.Schema(
    {
        noticeId: {
            type: String,
            required: true,
            unique: true,
            match: /^NOT-\d{4}-\d{5}$/,
        },
        title: {
            type: String,
            required: true,
            trim: true,
        },
        content: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            enum: Object.values(NoticeType),
            required: true,
        },
        targetAudience: [
            {
                type: String,
                enum: ['STUDENT', 'TEACHER', 'ALL'],
                required: true,
            },
        ],
        courses: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Course',
            },
        ],
        publishDate: {
            type: Date,
            required: true,
            default: Date.now,
        },
        expiryDate: Date,
        isActive: {
            type: Boolean,
            default: true,
        },
        attachments: [String],
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        viewedBy: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
    },
    {
        timestamps: true,
    }
)

// Indexes
NoticeSchema.index({ publishDate: -1 })
NoticeSchema.index({ type: 1, isActive: 1 })
NoticeSchema.index({ targetAudience: 1, isActive: 1 })

// Text search
NoticeSchema.index({ title: 'text', content: 'text' })

const Notice = mongoose.models.Notice || mongoose.model('Notice', NoticeSchema)

export default Notice
