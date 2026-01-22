import connectDB from '@/lib/mongoose'
import Student from '@/models/Student'
import Teacher from '@/models/Teacher'
import Course from '@/models/Course'
import Enrollment from '@/models/Enrollment'
import Payment from '@/models/Payment'
import { EnrollmentStatus, PaymentStatus, PaymentMethod } from '@/constants/roles'

export const analyticsService = {
    /**
     * Get overview statistics for admin dashboard
     */
    async getOverviewStats() {
        await connectDB()

        const [
            totalStudents,
            activeStudents,
            totalTeachers,
            totalCourses,
            activeCourses,
            totalEnrollments,
            activeEnrollments,
            totalRevenue,
            pendingPayments,
        ] = await Promise.all([
            Student.countDocuments(),
            Student.countDocuments({ isActive: true }),
            Teacher.countDocuments({ isActive: true }),
            Course.countDocuments(),
            Course.countDocuments({ status: 'ACTIVE' }),
            Enrollment.countDocuments(),
            Enrollment.countDocuments({ status: EnrollmentStatus.ACTIVE }),
            Payment.aggregate([
                { $match: { status: PaymentStatus.COMPLETED } },
                { $group: { _id: null, total: { $sum: '$amount' } } },
            ]),
            Payment.aggregate([
                { $match: { status: PaymentStatus.PENDING } },
                { $group: { _id: null, total: { $sum: '$amount' } } },
            ]),
        ])

        return {
            students: {
                total: totalStudents,
                active: activeStudents,
            },
            teachers: {
                total: totalTeachers,
            },
            courses: {
                total: totalCourses,
                active: activeCourses,
            },
            enrollments: {
                total: totalEnrollments,
                active: activeEnrollments,
            },
            revenue: {
                total: totalRevenue[0]?.total || 0,
                pending: pendingPayments[0]?.total || 0,
            },
        }
    },

    /**
     * Get revenue statistics by month
     */
    async getRevenueByMonth(months = 6) {
        await connectDB()

        const startDate = new Date()
        startDate.setMonth(startDate.getMonth() - months)

        const result = await Payment.aggregate([
            {
                $match: {
                    status: PaymentStatus.COMPLETED,
                    paymentDate: { $gte: startDate },
                },
            },
            {
                $group: {
                    _id: {
                        year: { $year: '$paymentDate' },
                        month: { $month: '$paymentDate' },
                    },
                    revenue: { $sum: '$amount' },
                    count: { $sum: 1 },
                },
            },
            {
                $sort: { '_id.year': 1, '_id.month': 1 },
            },
            {
                $project: {
                    _id: 0,
                    month: {
                        $concat: [
                            { $toString: '$_id.year' },
                            '-',
                            {
                                $cond: {
                                    if: { $lt: ['$_id.month', 10] },
                                    then: { $concat: ['0', { $toString: '$_id.month' }] },
                                    else: { $toString: '$_id.month' },
                                },
                            },
                        ],
                    },
                    revenue: 1,
                    count: 1,
                },
            },
        ])

        return result
    },

    /**
     * Get revenue by payment method
     */
    async getRevenueByMethod() {
        await connectDB()

        const result = await Payment.aggregate([
            {
                $match: { status: PaymentStatus.COMPLETED },
            },
            {
                $group: {
                    _id: '$method',
                    revenue: { $sum: '$amount' },
                    count: { $sum: 1 },
                },
            },
            {
                $project: {
                    _id: 0,
                    method: '$_id',
                    revenue: 1,
                    count: 1,
                },
            },
            {
                $sort: { revenue: -1 },
            },
        ])

        return result
    },

    /**
     * Get enrollment statistics by course
     */
    async getEnrollmentsByCourse(limit = 10) {
        await connectDB()

        const result = await Enrollment.aggregate([
            {
                $group: {
                    _id: '$course',
                    total: { $sum: 1 },
                    active: {
                        $sum: {
                            $cond: [{ $eq: ['$status', EnrollmentStatus.ACTIVE] }, 1, 0],
                        },
                    },
                    completed: {
                        $sum: {
                            $cond: [{ $eq: ['$status', EnrollmentStatus.COMPLETED] }, 1, 0],
                        },
                    },
                },
            },
            {
                $lookup: {
                    from: 'courses',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'courseDetails',
                },
            },
            {
                $unwind: '$courseDetails',
            },
            {
                $project: {
                    _id: 0,
                    courseId: '$courseDetails.courseId',
                    title: '$courseDetails.title',
                    subject: '$courseDetails.subject',
                    total: 1,
                    active: 1,
                    completed: 1,
                },
            },
            {
                $sort: { total: -1 },
            },
            {
                $limit: limit,
            },
        ])

        return result
    },

    /**
     * Get recent enrollments
     */
    async getRecentEnrollments(limit = 10) {
        await connectDB()

        const enrollments = await Enrollment.find()
            .populate({
                path: 'student',
                populate: { path: 'userId', select: 'name email' },
            })
            .populate('course', 'title subject level')
            .sort({ enrollmentDate: -1 })
            .limit(limit)

        return enrollments
    },

    /**
     * Get recent payments
     */
    async getRecentPayments(limit = 10) {
        await connectDB()

        const payments = await Payment.find()
            .populate({
                path: 'student',
                populate: { path: 'userId', select: 'name email' },
            })
            .sort({ paymentDate: -1 })
            .limit(limit)

        return payments
    },

    /**
     * Get student performance metrics
     */
    async getStudentPerformance(studentId) {
        await connectDB()

        const enrollments = await Enrollment.find({ student: studentId })
            .populate('course', 'title')
            .select('course grades attendance')

        const performance = enrollments.map((enrollment) => {
            // Calculate average grade
            const avgGrade = enrollment.grades.length > 0
                ? enrollment.grades.reduce((sum, g) => sum + (g.marks / g.totalMarks) * 100, 0) / enrollment.grades.length
                : 0

            // Calculate attendance percentage
            const totalClasses = enrollment.attendance.length
            const presentCount = enrollment.attendance.filter((a) => a.present).length
            const attendancePercentage = totalClasses > 0 ? (presentCount / totalClasses) * 100 : 0

            return {
                course: enrollment.course.title,
                averageGrade: Math.round(avgGrade),
                attendance: Math.round(attendancePercentage),
                totalClasses,
                totalExams: enrollment.grades.length,
            }
        })

        return performance
    },

    /**
     * Get teacher statistics
     */
    async getTeacherStats(teacherId) {
        await connectDB()

        const [courses, totalStudents] = await Promise.all([
            Course.find({ teacher: teacherId }).select('title subject batches'),
            Enrollment.aggregate([
                {
                    $lookup: {
                        from: 'courses',
                        localField: 'course',
                        foreignField: '_id',
                        as: 'courseDetails',
                    },
                },
                {
                    $unwind: '$courseDetails',
                },
                {
                    $match: {
                        'courseDetails.teacher': teacherId,
                        status: EnrollmentStatus.ACTIVE,
                    },
                },
                {
                    $count: 'total',
                },
            ]),
        ])

        const totalBatches = courses.reduce((sum, course) => sum + course.batches.length, 0)

        return {
            totalCourses: courses.length,
            totalBatches,
            totalStudents: totalStudents[0]?.total || 0,
            courses: courses.map((c) => ({
                title: c.title,
                subject: c.subject,
                batches: c.batches.length,
            })),
        }
    },

    /**
     * Get due payments summary
     */
    async getDuePayments() {
        await connectDB()

        const result = await Enrollment.aggregate([
            {
                $match: {
                    status: { $in: [EnrollmentStatus.ACTIVE, EnrollmentStatus.PENDING] },
                    dueAmount: { $gt: 0 },
                },
            },
            {
                $lookup: {
                    from: 'students',
                    localField: 'student',
                    foreignField: '_id',
                    as: 'studentDetails',
                },
            },
            {
                $unwind: '$studentDetails',
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'studentDetails.userId',
                    foreignField: '_id',
                    as: 'userDetails',
                },
            },
            {
                $unwind: '$userDetails',
            },
            {
                $lookup: {
                    from: 'courses',
                    localField: 'course',
                    foreignField: '_id',
                    as: 'courseDetails',
                },
            },
            {
                $unwind: '$courseDetails',
            },
            {
                $project: {
                    _id: 1,
                    enrollmentId: 1,
                    studentName: '$userDetails.name',
                    studentId: '$studentDetails.studentId',
                    courseName: '$courseDetails.title',
                    dueAmount: 1,
                    totalFee: 1,
                    paidAmount: 1,
                },
            },
            {
                $sort: { dueAmount: -1 },
            },
            {
                $limit: 20,
            },
        ])

        const totalDue = result.reduce((sum, item) => sum + item.dueAmount, 0)

        return {
            items: result,
            totalDue,
            count: result.length,
        }
    },
}
