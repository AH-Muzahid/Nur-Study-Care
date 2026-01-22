import { noticeRepository } from '@/repositories/noticeRepository'

export const noticeService = {
    async createNotice(noticeData, createdBy) {
        // Generate notice ID
        const noticeId = await noticeRepository.generateNoticeId()

        // Create notice
        const notice = await noticeRepository.create({
            ...noticeData,
            noticeId,
            createdBy,
            isActive: true,
        })

        return await noticeRepository.findById(notice._id, ['createdBy', 'courses'])
    },

    async getNotice(id, userId = null) {
        const notice = await noticeRepository.findById(id, ['createdBy', 'courses'])
        if (!notice) {
            throw new Error('Notice not found')
        }

        // Mark as viewed if userId provided
        if (userId && !notice.viewedBy.includes(userId)) {
            await noticeRepository.markAsViewed(notice._id, userId)
        }

        return notice
    },

    async listNotices(filters, options) {
        return await noticeRepository.findAll(filters, options)
    },

    async getActiveNotices(targetAudience = null, options = {}) {
        const filters = { activeOnly: true }
        if (targetAudience) {
            filters.targetAudience = targetAudience
        }

        return await noticeRepository.findAll(filters, options)
    },

    async updateNotice(id, updateData) {
        const notice = await noticeRepository.findById(id)
        if (!notice) {
            throw new Error('Notice not found')
        }

        // Prevent updating sensitive fields
        delete updateData.noticeId
        delete updateData.createdBy
        delete updateData.viewedBy
        delete updateData.createdAt

        return await noticeRepository.update(id, updateData)
    },

    async deleteNotice(id) {
        const notice = await noticeRepository.findById(id)
        if (!notice) {
            throw new Error('Notice not found')
        }

        // Soft delete - mark as inactive
        return await noticeRepository.update(id, { isActive: false })
    },

    async markAsRead(noticeId, userId) {
        const notice = await noticeRepository.findById(noticeId)
        if (!notice) {
            throw new Error('Notice not found')
        }

        return await noticeRepository.markAsViewed(noticeId, userId)
    },

    async searchNotices(searchTerm, options = {}) {
        return await noticeRepository.findAll(
            { search: searchTerm },
            options
        )
    },

    async getNoticeStats(noticeId) {
        const notice = await noticeRepository.findById(noticeId)
        if (!notice) {
            throw new Error('Notice not found')
        }

        return {
            totalViews: notice.viewedBy.length,
            isActive: notice.isActive,
            isExpired: notice.expiryDate ? new Date() > notice.expiryDate : false,
            daysActive: Math.floor((new Date() - notice.publishDate) / (1000 * 60 * 60 * 24)),
        }
    },
}
