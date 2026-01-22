import connectDB from '@/lib/mongoose'
import Teacher from '@/models/Teacher'
import User from '@/models/User'

export const teacherRepository = {
    async create(teacherData) {
        await connectDB()
        const teacher = new Teacher(teacherData)
        return await teacher.save()
    },

    async findById(id, populate = []) {
        await connectDB()
        let query = Teacher.findById(id)

        if (populate.includes('user')) {
            query = query.populate('userId', 'name email phone avatar')
        }
        if (populate.includes('courses')) {
            query = query.populate('courses', 'title subject level')
        }

        return await query
    },

    async findByUserId(userId) {
        await connectDB()
        return await Teacher.findOne({ userId })
    },

    async findByTeacherId(teacherId) {
        await connectDB()
        return await Teacher.findOne({ teacherId })
    },

    async findAll(filters = {}, options = {}) {
        await connectDB()
        const { page = 1, limit = 10, sort = { createdAt: -1 } } = options
        const skip = (page - 1) * limit

        const query = {}
        if (filters.subject) {
            query.subjects = { $in: [filters.subject] }
        }
        if (filters.isActive !== undefined) {
            query.isActive = filters.isActive
        }
        if (filters.search) {
            const users = await User.find({
                $or: [
                    { name: { $regex: filters.search, $options: 'i' } },
                    { email: { $regex: filters.search, $options: 'i' } },
                ]
            }).select('_id')

            const userIds = users.map(u => u._id)
            query.userId = { $in: userIds }
        }

        const [teachers, total] = await Promise.all([
            Teacher.find(query)
                .populate('userId', 'name email phone avatar')
                .sort(sort)
                .skip(skip)
                .limit(limit),
            Teacher.countDocuments(query),
        ])

        return {
            teachers,
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
        return await Teacher.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true,
        })
    },

    async delete(id) {
        await connectDB()
        return await Teacher.findByIdAndDelete(id)
    },

    async generateTeacherId() {
        await connectDB()
        const year = new Date().getFullYear()
        const count = await Teacher.countDocuments()
        const nextNumber = String(count + 1).padStart(4, '0')
        return `TCH-${year}-${nextNumber}`
    },
}
