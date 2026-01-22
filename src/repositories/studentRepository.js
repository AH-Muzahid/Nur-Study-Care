import connectDB from '@/lib/mongoose'
import Student from '@/models/Student'
import User from '@/models/User'

export const studentRepository = {
    async create(studentData) {
        await connectDB()
        const student = new Student(studentData)
        return await student.save()
    },

    async findById(id, populate = []) {
        await connectDB()
        let query = Student.findById(id)

        if (populate.includes('user')) {
            query = query.populate('userId', 'name email phone avatar')
        }
        if (populate.includes('enrollments')) {
            query = query.populate({
                path: 'enrollments',
                populate: { path: 'course', select: 'title subject level' }
            })
        }

        return await query
    },

    async findByUserId(userId) {
        await connectDB()
        return await Student.findOne({ userId })
    },

    async findByStudentId(studentId) {
        await connectDB()
        return await Student.findOne({ studentId })
    },

    async findAll(filters = {}, options = {}) {
        await connectDB()
        const { page = 1, limit = 10, sort = { createdAt: -1 } } = options
        const skip = (page - 1) * limit

        const query = {}
        if (filters.class) {
            query['educationInfo.class'] = filters.class
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

        const [students, total] = await Promise.all([
            Student.find(query)
                .populate('userId', 'name email phone avatar')
                .sort(sort)
                .skip(skip)
                .limit(limit),
            Student.countDocuments(query),
        ])

        return {
            students,
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
        return await Student.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true,
        })
    },

    async delete(id) {
        await connectDB()
        return await Student.findByIdAndDelete(id)
    },

    async generateStudentId() {
        await connectDB()
        const year = new Date().getFullYear()
        const count = await Student.countDocuments()
        const nextNumber = String(count + 1).padStart(4, '0')
        return `STU-${year}-${nextNumber}`
    },
}
