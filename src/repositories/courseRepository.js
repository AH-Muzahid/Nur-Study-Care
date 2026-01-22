import connectDB from '@/lib/mongoose'
import Course from '@/models/Course'

export const courseRepository = {
    async create(courseData) {
        await connectDB()
        const course = new Course(courseData)
        return await course.save()
    },

    async findById(id, populate = []) {
        await connectDB()
        let query = Course.findById(id)

        if (populate.includes('teacher')) {
            query = query.populate({
                path: 'teacher',
                populate: { path: 'userId', select: 'name email phone avatar' }
            })
        }

        return await query
    },

    async findByCourseId(courseId) {
        await connectDB()
        return await Course.findOne({ courseId })
    },

    async findAll(filters = {}, options = {}) {
        await connectDB()
        const { page = 1, limit = 10, sort = { createdAt: -1 } } = options
        const skip = (page - 1) * limit

        const query = {}
        if (filters.subject) {
            query.subject = filters.subject
        }
        if (filters.level) {
            query.level = filters.level
        }
        if (filters.status) {
            query.status = filters.status
        }
        if (filters.teacher) {
            query.teacher = filters.teacher
        }
        if (filters.search) {
            query.$text = { $search: filters.search }
        }

        const [courses, total] = await Promise.all([
            Course.find(query)
                .populate({
                    path: 'teacher',
                    populate: { path: 'userId', select: 'name email' }
                })
                .sort(sort)
                .skip(skip)
                .limit(limit),
            Course.countDocuments(query),
        ])

        return {
            courses,
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
        return await Course.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true,
        })
    },

    async delete(id) {
        await connectDB()
        return await Course.findByIdAndDelete(id)
    },

    async updateBatchEnrollment(courseId, batchName, increment = 1) {
        await connectDB()
        return await Course.findOneAndUpdate(
            { _id: courseId, 'batches.batchName': batchName },
            { $inc: { 'batches.$.enrolled': increment } },
            { new: true }
        )
    },

    async generateCourseId() {
        await connectDB()
        const year = new Date().getFullYear()
        const count = await Course.countDocuments()
        const nextNumber = String(count + 1).padStart(4, '0')
        return `CRS-${year}-${nextNumber}`
    },
}
