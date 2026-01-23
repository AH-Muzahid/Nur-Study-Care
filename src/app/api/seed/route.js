import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongoose'
import Course from '@/models/Course'
import Teacher from '@/models/Teacher'
import User from '@/models/User'
import { CourseStatus } from '@/constants/roles'

export async function GET() {
    try {
        await connectDB()

        // 1. Find or Create a Teacher
        let teacherUser = await User.findOne({ email: 'teacher@demo.com' })
        if (!teacherUser) {
            // In a real scenario, you'd use the auth registration to handle password hashing properly
            // For now, let's assume a teacher might already exist or we skip creating if not found to avoid complexity
            return NextResponse.json({ message: 'Please create a teacher user first (teacher@demo.com) to seed courses.' }, { status: 400 })
        }

        let teacher = await Teacher.findOne({ userId: teacherUser._id })
        if (!teacher) {
            teacher = await Teacher.create({
                userId: teacherUser._id,
                teacherId: 'TCH-2025-0001',
                subjects: ['Physics'],
                qualifications: [{ degree: 'M.Sc', institution: 'BUET', year: 2018 }],
                experience: 5,
                salary: 50000
            })
        }

        // 2. Check if courses exist
        const courseCount = await Course.countDocuments()
        if (courseCount > 0) {
            return NextResponse.json({ message: 'Courses already seeded' })
        }

        // 3. Seed Courses
        const courses = [
            {
                courseId: 'CRS-2025-0001',
                title: 'HSC 2026 Physics First Paper',
                description: 'Complete coverage of Physics 1st Paper for HSC 2026 candidates. Focus on concept clearing and mathematical problem solving.',
                subject: 'Physics',
                level: 'HSC',
                duration: 6,
                fee: 5000,
                teacher: teacher._id,
                batches: [
                    {
                        batchName: 'Morning Batch A',
                        startDate: new Date(),
                        schedule: [{ day: 'Sunday', startTime: '08:00', endTime: '10:00' }, { day: 'Tuesday', startTime: '08:00', endTime: '10:00' }],
                        capacity: 40,
                        enrolled: 0
                    }
                ],
                status: CourseStatus.ACTIVE,
                thumbnail: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=800&q=80'
            },
            {
                courseId: 'CRS-2025-0002',
                title: 'Engineering Admission Math',
                description: 'Rigorous math preparation for BUET, RUET, CUET, KUET aspirants. Includes 50+ exams and solve classes.',
                subject: 'Math',
                level: 'Admission',
                duration: 4,
                fee: 12000,
                teacher: teacher._id,
                batches: [],
                status: CourseStatus.ACTIVE,
                thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80'
            },
            {
                courseId: 'CRS-2025-0003',
                title: 'SSC 2026 General Science',
                description: 'Foundation building for SSC students. Physics, Chemistry and Biology basics covered.',
                subject: 'Science',
                level: 'SSC',
                duration: 12,
                fee: 8000,
                teacher: teacher._id,
                batches: [],
                status: CourseStatus.ACTIVE,
                thumbnail: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800&q=80'
            }
        ]

        await Course.insertMany(courses)

        return NextResponse.json({ message: 'Courses seeded successfully', count: courses.length })
    } catch (error) {
        console.error('Seeding error:', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
