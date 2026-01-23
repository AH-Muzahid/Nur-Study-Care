import mongoose from 'mongoose'

const SiteContentSchema = new mongoose.Schema(
    {
        section: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        content: {
            type: mongoose.Schema.Types.Mixed,
            default: {},
        },
        lastUpdatedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    {
        timestamps: true,
    }
)

export default mongoose.models.SiteContent || mongoose.model('SiteContent', SiteContentSchema)
