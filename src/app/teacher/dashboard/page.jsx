'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { StatCard } from '@/components/ui/stat-card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
    BookOpen,
    Users,
    Calendar,
    ClipboardList,
    Clock,
    CheckCircle,
    AlertCircle,
    TrendingUp,
    Home,
} from 'lucide-react'
import Link from 'next/link'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'

// Mock data
const mockData = {
    stats: {
        totalCourses: 3,
        totalStudents: 65,
        classesThisWeek: 12,
        pendingTasks: 5,
    },
    todaySchedule: [
        {
            id: 1,
            time: '8:00 AM - 10:00 AM',
            course: 'HSC Physics',
            batch: 'Morning Batch',
            room: 'Room 201',
            students: 25,
            status: 'upcoming',
        },
        {
            id: 2,
            time: '10:30 AM - 12:30 PM',
            course: 'HSC Physics',
            batch: 'Day Batch',
            room: 'Room 201',
            students: 22,
            status: 'upcoming',
        },
        {
            id: 3,
            time: '4:00 PM - 6:00 PM',
            course: 'HSC Chemistry',
            batch: 'Evening Batch',
            room: 'Room 105',
            students: 18,
            status: 'upcoming',
        },
    ],
    myCourses: [
        {
            id: 1,
            title: 'HSC Physics',
            batches: 2,
            totalStudents: 47,
            attendance: 85,
            nextClass: 'Today 8:00 AM',
        },
        {
            id: 2,
            title: 'HSC Chemistry',
            batches: 1,
            totalStudents: 18,
            attendance: 92,
            nextClass: 'Today 4:00 PM',
        },
    ],
    recentStudents: [
        { id: 1, name: 'Karim Ahmed', course: 'HSC Physics', attendance: 95, grade: 'A' },
        { id: 2, name: 'Fatima Rahman', course: 'HSC Physics', attendance: 88, grade: 'A-' },
        { id: 3, name: 'Rahim Hossain', course: 'HSC Chemistry', attendance: 90, grade: 'A' },
        { id: 4, name: 'Ayesha Khan', course: 'HSC Physics', attendance: 78, grade: 'B+' },
        { id: 5, name: 'Shakib Islam', course: 'HSC Chemistry', attendance: 85, grade: 'B+' },
    ],
    pendingTasks: [
        { id: 1, task: 'Submit Physics Batch A attendance', dueDate: 'Today', priority: 'high' },
        { id: 2, task: 'Grade Chemistry assignments', dueDate: 'Tomorrow', priority: 'medium' },
        { id: 3, task: 'Prepare Physics exam papers', dueDate: 'In 3 days', priority: 'high' },
        { id: 4, task: 'Update course materials', dueDate: 'This week', priority: 'low' },
    ],
    weeklyStats: {
        classesCompleted: 10,
        averageAttendance: 87,
        assignmentsGraded: 45,
    },
}

export default function TeacherDashboard() {
    return (
        <ProtectedRoute allowedRoles={['TEACHER']}>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Teacher Dashboard</h1>
                        <p className="text-gray-500 mt-1">
                            Welcome back! Manage your classes and track student progress.
                        </p>
                    </div>
                    <Link href="/">
                        <Button variant="outline" className="gap-2">
                            <Home className="h-4 w-4" />
                            Home
                        </Button>
                    </Link>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <StatCard
                        title="Total Courses"
                        value={mockData.stats.totalCourses}
                        description="Active courses"
                        icon={<BookOpen className="h-4 w-4" />}
                    />
                    <StatCard
                        title="Total Students"
                        value={mockData.stats.totalStudents}
                        description="Enrolled students"
                        icon={<Users className="h-4 w-4" />}
                    />
                    <StatCard
                        title="Classes This Week"
                        value={mockData.stats.classesThisWeek}
                        description="Scheduled classes"
                        icon={<Calendar className="h-4 w-4" />}
                    />
                    <StatCard
                        title="Pending Tasks"
                        value={mockData.stats.pendingTasks}
                        description="Need attention"
                        icon={<ClipboardList className="h-4 w-4" />}
                    />
                </div>

                {/* Main Grid */}
                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Today's Schedule - 2 columns */}
                    <Card className="lg:col-span-2">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle className="flex items-center gap-2">
                                <Calendar className="h-5 w-5" />
                                Today&apos;s Schedule
                            </CardTitle>
                            <Link href="/teacher/schedule">
                                <Button variant="outline" size="sm">
                                    View All
                                </Button>
                            </Link>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {mockData.todaySchedule.map((class_) => (
                                    <div
                                        key={class_.id}
                                        className="flex items-center justify-between border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                                    >
                                        <div className="flex items-start gap-4 flex-1">
                                            <div className="w-16 text-center">
                                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto">
                                                    <Clock className="h-5 w-5 text-blue-600" />
                                                </div>
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2">
                                                    <p className="font-semibold text-gray-900">
                                                        {class_.course}
                                                    </p>
                                                    <Badge variant="outline">{class_.batch}</Badge>
                                                </div>
                                                <p className="text-sm text-gray-600 mt-1">
                                                    {class_.time}
                                                </p>
                                                <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                                                    <span>📍 {class_.room}</span>
                                                    <span>👥 {class_.students} students</span>
                                                </div>
                                            </div>
                                        </div>
                                        <Button size="sm">Take Attendance</Button>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Pending Tasks */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <ClipboardList className="h-5 w-5" />
                                Pending Tasks
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {mockData.pendingTasks.map((task) => (
                                    <div
                                        key={task.id}
                                        className="border-l-4 border-l-orange-500 bg-orange-50 p-3 rounded-r"
                                    >
                                        <div className="flex items-start justify-between gap-2">
                                            <p className="text-sm font-medium text-gray-900 flex-1">
                                                {task.task}
                                            </p>
                                            <Badge
                                                variant="outline"
                                                className={
                                                    task.priority === 'high'
                                                        ? 'bg-red-100 text-red-700 border-red-200'
                                                        : task.priority === 'medium'
                                                            ? 'bg-yellow-100 text-yellow-700 border-yellow-200'
                                                            : 'bg-gray-100 text-gray-700 border-gray-200'
                                                }
                                            >
                                                {task.priority}
                                            </Badge>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-1">Due: {task.dueDate}</p>
                                    </div>
                                ))}
                            </div>
                            <Button variant="link" size="sm" className="w-full mt-4">
                                View All Tasks →
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                {/* Bottom Grid */}
                <div className="grid gap-6 lg:grid-cols-2">
                    {/* My Courses */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>My Courses</CardTitle>
                            <Link href="/teacher/classes">
                                <Button variant="outline" size="sm">
                                    Manage
                                </Button>
                            </Link>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {mockData.myCourses.map((course) => (
                                    <div
                                        key={course.id}
                                        className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                                    >
                                        <div className="flex items-center justify-between mb-3">
                                            <h3 className="font-semibold text-gray-900">{course.title}</h3>
                                            <Badge className="bg-blue-100 text-blue-700">
                                                {course.batches} {course.batches === 1 ? 'batch' : 'batches'}
                                            </Badge>
                                        </div>
                                        <div className="grid grid-cols-3 gap-4 text-sm">
                                            <div>
                                                <p className="text-gray-500">Students</p>
                                                <p className="font-semibold">{course.totalStudents}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-500">Attendance</p>
                                                <p className="font-semibold text-green-600">
                                                    {course.attendance}%
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-gray-500">Next Class</p>
                                                <p className="font-semibold text-xs">{course.nextClass}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Top Performing Students */}
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>Recent Students</CardTitle>
                            <Link href="/teacher/students">
                                <Button variant="outline" size="sm">
                                    View All
                                </Button>
                            </Link>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {mockData.recentStudents.map((student) => (
                                    <div
                                        key={student.id}
                                        className="flex items-center justify-between border-b pb-3 last:border-0"
                                    >
                                        <div>
                                            <p className="font-medium text-sm">{student.name}</p>
                                            <p className="text-xs text-gray-500">{student.course}</p>
                                        </div>
                                        <div className="text-right">
                                            <Badge
                                                variant="outline"
                                                className={
                                                    student.grade.startsWith('A')
                                                        ? 'bg-green-100 text-green-700'
                                                        : student.grade.startsWith('B')
                                                            ? 'bg-blue-100 text-blue-700'
                                                            : 'bg-yellow-100 text-yellow-700'
                                                }
                                            >
                                                {student.grade}
                                            </Badge>
                                            <p className="text-xs text-gray-500 mt-1">
                                                {student.attendance}% attendance
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Weekly Stats */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <TrendingUp className="h-5 w-5" />
                            This Week&apos;s Performance
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-3">
                            <div className="flex items-center gap-3 border rounded-lg p-4">
                                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                    <CheckCircle className="h-6 w-6 text-green-600" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold">{mockData.weeklyStats.classesCompleted}</p>
                                    <p className="text-sm text-gray-600">Classes Completed</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 border rounded-lg p-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <Users className="h-6 w-6 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold">
                                        {mockData.weeklyStats.averageAttendance}%
                                    </p>
                                    <p className="text-sm text-gray-600">Average Attendance</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 border rounded-lg p-4">
                                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                    <ClipboardList className="h-6 w-6 text-purple-600" />
                                </div>
                                <div>
                                    <p className="text-2xl font-bold">
                                        {mockData.weeklyStats.assignmentsGraded}
                                    </p>
                                    <p className="text-sm text-gray-600">Assignments Graded</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </ProtectedRoute>
    )
}

