'use client'

import { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import {
    BookOpen,
    Clock,
    Users,
    DollarSign,
    Search,
    Filter,
    GraduationCap,
} from 'lucide-react'
import Link from 'next/link'

// Mock courses data
const mockCourses = [
    {
        id: 1,
        title: 'HSC Physics',
        level: 'HSC',
        subject: 'Physics',
        description: 'Complete HSC Physics course covering all chapters with practical examples',
        duration: '6 months',
        monthlyFee: 2000,
        admissionFee: 1000,
        batches: [
            { id: 1, name: 'Morning Batch', schedule: 'Sat, Mon, Wed 8:00 AM', seats: 25, enrolled: 18 },
            { id: 2, name: 'Evening Batch', schedule: 'Sun, Tue, Thu 4:00 PM', seats: 30, enrolled: 22 },
        ],
        teacher: 'Dr. Rahman',
        status: 'Open',
    },
    {
        id: 2,
        title: 'HSC Chemistry',
        level: 'HSC',
        subject: 'Chemistry',
        description: 'Comprehensive HSC Chemistry course with lab demonstrations',
        duration: '6 months',
        monthlyFee: 2500,
        admissionFee: 1000,
        batches: [
            { id: 3, name: 'Morning Batch', schedule: 'Sat, Mon, Wed 10:00 AM', seats: 25, enrolled: 25 },
        ],
        teacher: 'Prof. Karim',
        status: 'Full',
    },
    {
        id: 3,
        title: 'HSC Mathematics',
        level: 'HSC',
        subject: 'Mathematics',
        description: 'Advanced HSC Mathematics with problem-solving techniques',
        duration: '6 months',
        monthlyFee: 1800,
        admissionFee: 800,
        batches: [
            { id: 4, name: 'Morning Batch', schedule: 'Sun, Tue, Thu 9:00 AM', seats: 30, enrolled: 15 },
            { id: 5, name: 'Evening Batch', schedule: 'Sat, Mon, Wed 5:00 PM', seats: 30, enrolled: 20 },
        ],
        teacher: 'Mr. Ali',
        status: 'Open',
    },
    {
        id: 4,
        title: 'SSC English',
        level: 'SSC',
        subject: 'English',
        description: 'SSC English grammar and literature course',
        duration: '4 months',
        monthlyFee: 1500,
        admissionFee: 500,
        batches: [
            { id: 6, name: 'Afternoon Batch', schedule: 'Sun, Tue, Thu 2:00 PM', seats: 35, enrolled: 28 },
        ],
        teacher: 'Ms. Sultana',
        status: 'Open',
    },
    {
        id: 5,
        title: 'Admission Test Preparation',
        level: 'Admission',
        subject: 'General',
        description: 'Medical and Engineering university admission preparation',
        duration: '3 months',
        monthlyFee: 3000,
        admissionFee: 1500,
        batches: [
            { id: 7, name: 'Intensive Batch', schedule: 'Daily 6:00 PM', seats: 40, enrolled: 35 },
        ],
        teacher: 'Multiple Teachers',
        status: 'Open',
    },
]

export default function CoursesPage() {
    const [searchQuery, setSearchQuery] = useState('')
    const [levelFilter, setLevelFilter] = useState('all')
    const [subjectFilter, setSubjectFilter] = useState('all')

    // Filter courses
    const filteredCourses = mockCourses.filter((course) => {
        const matchesSearch =
            course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.description.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesLevel = levelFilter === 'all' || course.level === levelFilter
        const matchesSubject = subjectFilter === 'all' || course.subject === subjectFilter
        return matchesSearch && matchesLevel && matchesSubject
    })

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Available Courses</h1>
                <p className="text-gray-500 mt-1">
                    Browse and enroll in courses that match your goals
                </p>
            </div>

            {/* Filters */}
            <Card>
                <CardContent className="pt-6">
                    <div className="grid gap-4 md:grid-cols-4">
                        {/* Search */}
                        <div className="md:col-span-2">
                            <div className="relative">
                                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input
                                    placeholder="Search courses..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                        </div>

                        {/* Level Filter */}
                        <div>
                            <select
                                value={levelFilter}
                                onChange={(e) => setLevelFilter(e.target.value)}
                                className="w-full rounded-md border border-gray-300 p-2 text-sm"
                            >
                                <option value="all">All Levels</option>
                                <option value="SSC">SSC</option>
                                <option value="HSC">HSC</option>
                                <option value="Admission">Admission Test</option>
                            </select>
                        </div>

                        {/* Subject Filter */}
                        <div>
                            <select
                                value={subjectFilter}
                                onChange={(e) => setSubjectFilter(e.target.value)}
                                className="w-full rounded-md border border-gray-300 p-2 text-sm"
                            >
                                <option value="all">All Subjects</option>
                                <option value="Physics">Physics</option>
                                <option value="Chemistry">Chemistry</option>
                                <option value="Mathematics">Mathematics</option>
                                <option value="English">English</option>
                                <option value="General">General</option>
                            </select>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Results count */}
            <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">
                    Showing <span className="font-semibold">{filteredCourses.length}</span> courses
                </p>
            </div>

            {/* Courses Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredCourses.map((course) => (
                    <Card key={course.id} className="hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <GraduationCap className="h-5 w-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <Badge variant="outline" className="mb-1">
                                            {course.level}
                                        </Badge>
                                        <CardTitle className="text-lg">{course.title}</CardTitle>
                                    </div>
                                </div>
                                <Badge
                                    variant={course.status === 'Open' ? 'default' : 'secondary'}
                                    className={
                                        course.status === 'Open'
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-red-100 text-red-700'
                                    }
                                >
                                    {course.status}
                                </Badge>
                            </div>
                        </CardHeader>

                        <CardContent className="space-y-4">
                            <p className="text-sm text-gray-600 line-clamp-2">
                                {course.description}
                            </p>

                            <div className="space-y-2 text-sm">
                                <div className="flex items-center gap-2 text-gray-600">
                                    <BookOpen className="h-4 w-4" />
                                    <span>Subject: {course.subject}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-600">
                                    <Clock className="h-4 w-4" />
                                    <span>Duration: {course.duration}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-600">
                                    <Users className="h-4 w-4" />
                                    <span>Teacher: {course.teacher}</span>
                                </div>
                            </div>

                            {/* Batches */}
                            <div className="space-y-2">
                                <p className="text-sm font-semibold">Available Batches:</p>
                                {course.batches.map((batch) => (
                                    <div
                                        key={batch.id}
                                        className="flex items-center justify-between bg-gray-50 p-2 rounded text-xs"
                                    >
                                        <div>
                                            <p className="font-medium">{batch.name}</p>
                                            <p className="text-gray-600">{batch.schedule}</p>
                                        </div>
                                        <span className="text-gray-600">
                                            {batch.enrolled}/{batch.seats}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* Pricing */}
                            <div className="pt-3 border-t">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-gray-600">Admission Fee:</span>
                                    <span className="font-semibold">
                                        ৳{course.admissionFee.toLocaleString()}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between text-sm mt-1">
                                    <span className="text-gray-600">Monthly Fee:</span>
                                    <span className="font-semibold text-blue-600">
                                        ৳{course.monthlyFee.toLocaleString()}/month
                                    </span>
                                </div>
                            </div>
                        </CardContent>

                        <CardFooter className="gap-2">
                            <Link href={`/student/courses/${course.id}`} className="flex-1">
                                <Button variant="outline" className="w-full">
                                    View Details
                                </Button>
                            </Link>
                            <Button
                                className="flex-1"
                                disabled={course.status === 'Full'}
                            >
                                {course.status === 'Full' ? 'Batch Full' : 'Enroll Now'}
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>

            {/* No results */}
            {filteredCourses.length === 0 && (
                <Card>
                    <CardContent className="py-12 text-center">
                        <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            No courses found
                        </h3>
                        <p className="text-gray-500">
                            Try adjusting your search or filters
                        </p>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
