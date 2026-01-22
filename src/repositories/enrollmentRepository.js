import connectDB from '@/lib/mongoose'
import Enrollment from '@/models/Enrollment'

export const enrollmentRepository = {
    async create(enrollmentData) {
        await connectDB()
        const enrollment = new Enrollment(enrollmentData)
        return await enrollment.save()
    },

    async findById(id, populate = []) {
        await connectDB()
        let query = Enrollment.findById(id)

        if (populate.includes('student')) {
            query = query.populate({
                path: 'student',
                populate: { path: 'userId', select: 'name email phone' }
            })
        }
        if (populate.includes('course')) {
            query = query.populate('course')
        }

        return await query
    },

    async findByEnrollmentId(enrollmentId) {
        await connectDB()
        return await Enrollment.findOne({ enrollmentId })
    },

    async findAll(filters = {}, options = {}) {
        await connectDB()
        const { page = 1, limit = 10, sort = { enrollmentDate: -1 } } = options
        const skip = (page - 1) * limit

        const query = {}
        if (filters.student) {
            query.student = filters.student
        }
        if (filters.course) {
            query.course = filters.course
        }
        if (filters.status) {
            query.status = filters.status
        }

        const [enrollments, total] = await Promise.all([
            Enrollment.find(query)
                .populate({
                    path: 'student',
                    populate: { path: 'userId', select: 'name email' }
                })
                .populate('course', 'title subject level fee')
                .sort(sort)
                .skip(skip)
                .limit(limit),
            Enrollment.countDocuments(query),
        ])

        return {
            enrollments,
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
        return await Enrollment.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true,
        })
    },

    async delete(id) {
        await connectDB()
        return await Enrollment.findByIdAndDelete(id)
    },

    async generateEnrollmentId() {
        await connectDB()
        const year = new Date().getFullYear()
        const count = await Enrollment.countDocuments()
        const nextNumber = String(count + 1).padStart(6, '0')
        return `ENR-${year}-${nextNumber}`
    },

    async addAttendance(enrollmentId, attendanceData) {
        await connectDB()
        return await Enrollment.findByIdAndUpdate(
            enrollmentId,
            { $push: { attendance: attendanceData } },
            { new: true }
        )
    },

    async addGrade(enrollmentId, gradeData) {
        await connectDB()
        return await Enrollment.findByIdAndUpdate(
            enrollmentId,
            { $push: { grades: gradeData } },
            { new: true }
        )
    },
}
