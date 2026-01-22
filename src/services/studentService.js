import { studentRepository } from '@/repositories/studentRepository'
import User from '@/models/User'
import { UserRole } from '@/constants/roles'

export const studentService = {
    async createStudent(userId, studentData) {
        // Verify user exists and doesn't already have a student profile
        const user = await User.findById(userId)
        if (!user) {
            throw new Error('User not found')
        }

        if (user.role !== UserRole.STUDENT) {
            throw new Error('User must have student role')
        }

        const existingStudent = await studentRepository.findByUserId(userId)
        if (existingStudent) {
            throw new Error('Student profile already exists for this user')
        }

        // Generate unique student ID
        const studentId = await studentRepository.generateStudentId()

        // Create student
        const student = await studentRepository.create({
            ...studentData,
            userId,
            studentId,
        })

        return await studentRepository.findById(student._id, ['user'])
    },

    async getStudent(id, includeEnrollments = false) {
        const populate = ['user']
        if (includeEnrollments) {
            populate.push('enrollments')
        }

        const student = await studentRepository.findById(id, populate)
        if (!student) {
            throw new Error('Student not found')
        }

        return student
    },

    async getStudentByUserId(userId) {
        const student = await studentRepository.findByUserId(userId)
        if (!student) {
            throw new Error('Student profile not found')
        }

        return await studentRepository.findById(student._id, ['user'])
    },

    async listStudents(filters, options) {
        return await studentRepository.findAll(filters, options)
    },

    async updateStudent(id, updateData) {
        const student = await studentRepository.findById(id)
        if (!student) {
            throw new Error('Student not found')
        }

        // Prevent updating sensitive fields
        delete updateData.studentId
        delete updateData.userId
        delete updateData.createdAt

        return await studentRepository.update(id, updateData)
    },

    async deleteStudent(id) {
        const student = await studentRepository.findById(id)
        if (!student) {
            throw new Error('Student not found')
        }

        // Soft delete - mark as inactive
        return await studentRepository.update(id, { isActive: false })
    },

    async searchStudents(searchTerm, options = {}) {
        return await studentRepository.findAll(
            { search: searchTerm },
            options
        )
    },
}
