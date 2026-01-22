import connectDB from '@/lib/mongoose'
import Notice from '@/models/Notice'

export const noticeRepository = {
    async create(noticeData) {
        await connectDB()
        const notice = new Notice(noticeData)
        return await notice.save()
    },

    async findById(id, populate = []) {
        await connectDB()
        let query = Notice.findById(id)

        if (populate.includes('createdBy')) {
            query = query.populate('createdBy', 'name email')
        }
        if (populate.includes('courses')) {
            query = query.populate('courses', 'title subject')
        }

        return await query
    },

    async findAll(filters = {}, options = {}) {
        await connectDB()
        const { page = 1, limit = 10, sort = { publishDate: -1 } } = options
        const skip = (page - 1) * limit

        const query = {}
        if (filters.type) {
            query.type = filters.type
        }
        if (filters.isActive !== undefined) {
            query.isActive = filters.isActive
        }
        if (filters.targetAudience) {
            query.targetAudience = { $in: [filters.targetAudience, 'ALL'] }
        }
        if (filters.search) {
            query.$text = { $search: filters.search }
        }

        // Filter by current date (not expired)
        if (filters.activeOnly) {
            query.isActive = true
            query.$or = [
                { expiryDate: { $exists: false } },
                { expiryDate: null },
                { expiryDate: { $gte: new Date() } }
            ]
        }

        const [notices, total] = await Promise.all([
            Notice.find(query)
                .populate('createdBy', 'name email')
                .populate('courses', 'title')
                .sort(sort)
                .skip(skip)
                .limit(limit),
            Notice.countDocuments(query),
        ])

        return {
            notices,
            pagination: {
                total,
                page,
                pages: Math.ceil(total / limit),
                limit,
            },
        }
    },

    async update(id, updateData) {
        await connectDB()
        return await Notice.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true,
        })
    },

    async delete(id) {
        await connectDB()
        return await Notice.findByIdAndDelete(id)
    },

    async markAsViewed(noticeId, userId) {
        await connectDB()
        return await Notice.findByIdAndUpdate(
            noticeId,
            { $addToSet: { viewedBy: userId } },
            { new: true }
        )
    },

    async generateNoticeId() {
        await connectDB()
        const year = new Date().getFullYear()
        const count = await Notice.countDocuments()
        const nextNumber = String(count + 1).padStart(5, '0')
        return `NOT-${year}-${nextNumber}`
    },
}
