import mongoose from 'mongoose'
import { enrollmentRepository } from '@/repositories/enrollmentRepository'
import { studentRepository } from '@/repositories/studentRepository'
import { courseRepository } from '@/repositories/courseRepository'
import { courseService } from './courseService'
import { EnrollmentStatus } from '@/constants/roles'

export const enrollmentService = {
    async createEnrollment(enrollmentData) {
        const session = await mongoose.startSession()
        session.startTransaction()

        try {
            // Verify student exists
            const student = await studentRepository.findById(enrollmentData.student)
            if (!student) {
                throw new Error('Student not found')
            }

            // Verify course exists
            const course = await courseRepository.findById(enrollmentData.course)
            if (!course) {
                throw new Error('Course not found')
            }

            // Check batch capacity
            const capacity = await courseService.checkBatchCapacity(
                enrollmentData.course,
                enrollmentData.batchName
            )
            if (capacity.isFull) {
                throw new Error('Batch is full')
            }

            // Check for duplicate enrollment
            const existingEnrollment = await enrollmentRepository.findAll({
                student: enrollmentData.student,
                course: enrollmentData.course,
                status: { $in: [EnrollmentStatus.PENDING, EnrollmentStatus.ACTIVE] }
            })
            if (existingEnrollment.enrollments.length > 0) {
                throw new Error('Student is already enrolled in this course')
            }

            // Generate enrollment ID
            const enrollmentId = await enrollmentRepository.generateEnrollmentId()

            // Create enrollment
            const enrollment = await enrollmentRepository.create({
                ...enrollmentData,
                enrollmentId,
                totalFee: enrollmentData.totalFee || course.fee,
                paidAmount: enrollmentData.paidAmount || 0,
            })

            // Increment batch enrollment count
            await courseService.incrementBatchEnrollment(
                enrollmentData.course,
                enrollmentData.batchName
            )

            await session.commitTransaction()

            return await enrollmentRepository.findById(enrollment._id, ['student', 'course'])
        } catch (error) {
            await session.abortTransaction()
            throw error
        } finally {
            session.endSession()
        }
    },

    async getEnrollment(id) {
        const enrollment = await enrollmentRepository.findById(id, ['student', 'course'])
        if (!enrollment) {
            throw new Error('Enrollment not found')
        }
        return enrollment
    },

    async listEnrollments(filters, options) {
        return await enrollmentRepository.findAll(filters, options)
    },

    async getStudentEnrollments(studentId, options = {}) {
        return await enrollmentRepository.findAll(
            { student: studentId },
            options
        )
    },

    async getCourseEnrollments(courseId, options = {}) {
        return await enrollmentRepository.findAll(
            { course: courseId },
            options
        )
    },

    async updateEnrollmentStatus(id, status) {
        const enrollment = await enrollmentRepository.findById(id)
        if (!enrollment) {
            throw new Error('Enrollment not found')
        }

        return await enrollmentRepository.update(id, { status })
    },

    async cancelEnrollment(id, reason) {
        const session = await mongoose.startSession()
        session.startTransaction()

        try {
            const enrollment = await enrollmentRepository.findById(id)
            if (!enrollment) {
                throw new Error('Enrollment not found')
            }

            // Update enrollment status
            await enrollmentRepository.update(id, {
                status: EnrollmentStatus.CANCELLED,
                remarks: reason,
            })

            // Decrement batch enrollment count
            await courseService.decrementBatchEnrollment(
                enrollment.course,
                enrollment.batchName
            )

            await session.commitTransaction()

            return await enrollmentRepository.findById(id, ['student', 'course'])
        } catch (error) {
            await session.abortTransaction()
            throw error
        } finally {
            session.endSession()
        }
    },

    async addAttendance(enrollmentId, attendanceData) {
        const enrollment = await enrollmentRepository.findById(enrollmentId)
        if (!enrollment) {
            throw new Error('Enrollment not found')
        }

        return await enrollmentRepository.addAttendance(enrollmentId, attendanceData)
    },

    async addGrade(enrollmentId, gradeData) {
        const enrollment = await enrollmentRepository.findById(enrollmentId)
        if (!enrollment) {
            throw new Error('Enrollment not found')
        }

        return await enrollmentRepository.addGrade(enrollmentId, gradeData)
    },

    async completeEnrollment(id, certificateData) {
        const enrollment = await enrollmentRepository.findById(id)
        if (!enrollment) {
            throw new Error('Enrollment not found')
        }

        if (enrollment.dueAmount > 0) {
            throw new Error('Cannot complete enrollment with pending dues')
        }

        return await enrollmentRepository.update(id, {
            status: EnrollmentStatus.COMPLETED,
            completionDate: new Date(),
            certificate: certificateData,
        })
    },
}
