import { courseRepository } from '@/repositories/courseRepository'
import { teacherRepository } from '@/repositories/teacherRepository'
import { CourseStatus } from '@/constants/roles'

export const courseService = {
    async createCourse(courseData, createdBy) {
        // Verify teacher exists
        if (courseData.teacher) {
            const teacher = await teacherRepository.findById(courseData.teacher)
            if (!teacher) {
                throw new Error('Teacher not found')
            }
        }

        // Generate unique course ID
        const courseId = await courseRepository.generateCourseId()

        // Create course
        const course = await courseRepository.create({
            ...courseData,
            courseId,
            createdBy,
        })

        return await courseRepository.findById(course._id, ['teacher'])
    },

    async getCourse(id, includeTeacher = true) {
        const populate = includeTeacher ? ['teacher'] : []
        const course = await courseRepository.findById(id, populate)

        if (!course) {
            throw new Error('Course not found')
        }

        return course
    },

    async listCourses(filters, options) {
        return await courseRepository.findAll(filters, options)
    },

    async updateCourse(id, updateData) {
        const course = await courseRepository.findById(id)
        if (!course) {
            throw new Error('Course not found')
        }

        // Prevent updating sensitive fields
        delete updateData.courseId
        delete updateData.createdAt

        return await courseRepository.update(id, updateData)
    },

    async deleteCourse(id) {
        const course = await courseRepository.findById(id)
        if (!course) {
            throw new Error('Course not found')
        }

        // Soft delete - mark as inactive
        return await courseRepository.update(id, { status: CourseStatus.INACTIVE })
    },

    async addBatch(courseId, batchData) {
        const course = await courseRepository.findById(courseId)
        if (!course) {
            throw new Error('Course not found')
        }

        // Check if batch name already exists
        const batchExists = course.batches.some(
            batch => batch.batchName === batchData.batchName
        )
        if (batchExists) {
            throw new Error('Batch with this name already exists')
        }

        // Add batch
        course.batches.push({
            ...batchData,
            enrolled: 0,
        })

        await course.save()
        return course
    },

    async updateBatch(courseId, batchName, batchData) {
        const course = await courseRepository.findById(courseId)
        if (!course) {
            throw new Error('Course not found')
        }

        const batchIndex = course.batches.findIndex(
            batch => batch.batchName === batchName
        )
        if (batchIndex === -1) {
            throw new Error('Batch not found')
        }

        // Update batch data
        Object.assign(course.batches[batchIndex], batchData)

        await course.save()
        return course
    },

    async checkBatchCapacity(courseId, batchName) {
        const course = await courseRepository.findById(courseId)
        if (!course) {
            throw new Error('Course not found')
        }

        const batch = course.batches.find(b => b.batchName === batchName)
        if (!batch) {
            throw new Error('Batch not found')
        }

        return {
            capacity: batch.capacity,
            enrolled: batch.enrolled,
            available: batch.capacity - batch.enrolled,
            isFull: batch.enrolled >= batch.capacity,
        }
    },

    async incrementBatchEnrollment(courseId, batchName) {
        const capacity = await this.checkBatchCapacity(courseId, batchName)

        if (capacity.isFull) {
            throw new Error('Batch is full')
        }

        return await courseRepository.updateBatchEnrollment(courseId, batchName, 1)
    },

    async decrementBatchEnrollment(courseId, batchName) {
        return await courseRepository.updateBatchEnrollment(courseId, batchName, -1)
    },

    async searchCourses(searchTerm, options = {}) {
        return await courseRepository.findAll(
            { search: searchTerm },
            options
        )
    },

    async getCoursesByTeacher(teacherId, options = {}) {
        return await courseRepository.findAll(
            { teacher: teacherId },
            options
        )
    },

    async toggleFeatured(id) {
        const course = await courseRepository.findById(id)
        if (!course) {
            throw new Error('Course not found')
        }

        // If setting to featured, check if we already have 3 featured courses
        if (!course.featured) {
            const featuredCount = await courseRepository.countFeatured()
            if (featuredCount >= 3) {
                throw new Error('Maximum 3 courses can be featured. Please unfeature another course first.')
            }
        }

        return await courseRepository.update(id, { featured: !course.featured })
    },

    async getFeaturedCourses() {
        return await courseRepository.findFeatured()
    },
}
