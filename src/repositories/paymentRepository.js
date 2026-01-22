import connectDB from '@/lib/mongoose'
import Payment from '@/models/Payment'

export const paymentRepository = {
    async create(paymentData) {
        await connectDB()
        const payment = new Payment(paymentData)
        return await payment.save()
    },

    async findById(id, populate = []) {
        await connectDB()
        let query = Payment.findById(id)

        if (populate.includes('student')) {
            query = query.populate({
                path: 'student',
                populate: { path: 'userId', select: 'name email phone' }
            })
        }
        if (populate.includes('enrollment')) {
            query = query.populate('enrollment', 'enrollmentId course batchName')
        }

        return await query
    },

    async findByPaymentId(paymentId) {
        await connectDB()
        return await Payment.findOne({ paymentId })
    },

    async findAll(filters = {}, options = {}) {
        await connectDB()
        const { page = 1, limit = 10, sort = { paymentDate: -1 } } = options
        const skip = (page - 1) * limit

        const query = {}
        if (filters.student) {
            query.student = filters.student
        }
        if (filters.enrollment) {
            query.enrollment = filters.enrollment
        }
        if (filters.status) {
            query.status = filters.status
        }
        if (filters.method) {
            query.method = filters.method
        }
        if (filters.dateFrom || filters.dateTo) {
            query.paymentDate = {}
            if (filters.dateFrom) {
                query.paymentDate.$gte = new Date(filters.dateFrom)
            }
            if (filters.dateTo) {
                query.paymentDate.$lte = new Date(filters.dateTo)
            }
        }

        const [payments, total] = await Promise.all([
            Payment.find(query)
                .populate({
                    path: 'student',
                    populate: { path: 'userId', select: 'name email' }
                })
                .populate('enrollment', 'enrollmentId course')
                .sort(sort)
                .skip(skip)
                .limit(limit),
            Payment.countDocuments(query),
        ])

        return {
            payments,
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
        return await Payment.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true,
        })
    },

    async generatePaymentId() {
        await connectDB()
        const year = new Date().getFullYear()
        const count = await Payment.countDocuments()
        const nextNumber = String(count + 1).padStart(8, '0')
        return `PAY-${year}-${nextNumber}`
    },
}
