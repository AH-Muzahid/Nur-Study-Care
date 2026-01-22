import { teacherRepository } from '@/repositories/teacherRepository'
import User from '@/models/User'
import { UserRole } from '@/constants/roles'

export const teacherService = {
    async createTeacher(userId, teacherData) {
        // Verify user exists and doesn't already have a teacher profile
        const user = await User.findById(userId)
        if (!user) {
            throw new Error('User not found')
        }

        if (user.role !== UserRole.TEACHER) {
            throw new Error('User must have teacher role')
        }

        const existingTeacher = await teacherRepository.findByUserId(userId)
        if (existingTeacher) {
            throw new Error('Teacher profile already exists for this user')
        }

        // Generate unique teacher ID
        const teacherId = await teacherRepository.generateTeacherId()

        // Create teacher
        const teacher = await teacherRepository.create({
            ...teacherData,
            userId,
            teacherId,
        })

        return await teacherRepository.findById(teacher._id, ['user'])
    },

    async getTeacher(id, includeCourses = false) {
        const populate = ['user']
        if (includeCourses) {
            populate.push('courses')
        }

        const teacher = await teacherRepository.findById(id, populate)
        if (!teacher) {
            throw new Error('Teacher not found')
        }

        return teacher
    },

    async getTeacherByUserId(userId) {
        const teacher = await teacherRepository.findByUserId(userId)
        if (!teacher) {
            throw new Error('Teacher profile not found')
        }

        return await teacherRepository.findById(teacher._id, ['user'])
    },

    async listTeachers(filters, options) {
        return await teacherRepository.findAll(filters, options)
    },

    async updateTeacher(id, updateData) {
        const teacher = await teacherRepository.findById(id)
        if (!teacher) {
            throw new Error('Teacher not found')
        }

        // Prevent updating sensitive fields
        delete updateData.teacherId
        delete updateData.userId
        delete updateData.createdAt

        return await teacherRepository.update(id, updateData)
    },

    async deleteTeacher(id) {
        const teacher = await teacherRepository.findById(id)
        if (!teacher) {
            throw new Error('Teacher not found')
        }

        // Soft delete - mark as inactive
        return await teacherRepository.update(id, { isActive: false })
    },

    async searchTeachers(searchTerm, options = {}) {
        return await teacherRepository.findAll(
            { search: searchTerm },
            options
        )
    },

    async getTeachersBySubject(subject, options = {}) {
        return await teacherRepository.findAll(
            { subject },
            options
        )
    },
}
