'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { StatCard } from '@/components/ui/stat-card'
import { Button } from '@/components/ui/button'
import { BookOpen, Calendar, CreditCard, GraduationCap, Clock, Bell } from 'lucide-react'
import Link from 'next/link'

// Mock data
const mockData = {
    stats: {
        enrolledCourses: 4,
        upcomingClasses: 12,
        attendance: 85,
        duePayment: 2500,
    },
    courses: [
        {
            id: 1,
            title: 'HSC Physics',
            batch: 'Morning Batch',
            nextClass: 'Today 8:00 AM',
            teacher: 'Dr. Rahman',
            status: 'Active',
        },
        {
            id: 2,
            title: 'HSC Chemistry',
            batch: 'Evening Batch',
            nextClass: 'Tomorrow 4:00 PM',
            teacher: 'Prof. Karim',
            status: 'Active',
        },
        {
            id: 3,
            title: 'HSC Mathematics',
            batch: 'Morning Batch',
            nextClass: 'Friday 9:00 AM',
            teacher: 'Mr. Ali',
            status: 'Active',
        },
    ],
    todaySchedule: [
        {
            id: 1,
            course: 'HSC Physics',
            time: '8:00 AM - 10:00 AM',
            teacher: 'Dr. Rahman',
            room: 'Room 201',
        },
        {
            id: 2,
            course: 'HSC Chemistry',
            time: '4:00 PM - 6:00 PM',
            teacher: 'Prof. Karim',
            room: 'Room 105',
        },
    ],
    notices: [
        {
            id: 1,
            title: 'Holiday Notice - Winter Break',
            date: '2 days ago',
            type: 'holiday',
        },
        {
            id: 2,
            title: 'Exam Schedule Published',
            date: '5 days ago',
            type: 'exam',
        },
        {
            id: 3,
            title: 'New Batch Starting - SSC English',
            date: '1 week ago',
            type: 'general',
        },
    ],
    recentPayments: [
        {
            id: 1,
            course: 'HSC Physics',
            amount: 2000,
            date: '15 Jan 2026',
            status: 'Paid',
        },
        {
            id: 2,
            course: 'HSC Chemistry',
            amount: 2500,
            date: 'Due: 25 Jan 2026',
            status: 'Pending',
        },
    ],
}

export default function StudentDashboard() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Student Dashboard</h1>
                <p className="text-gray-500 mt-1">Welcome back! Here&apos;s your overview.</p>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    title="Enrolled Courses"
                    value={mockData.stats.enrolledCourses}
                    description="Active courses"
                    icon={<BookOpen className="h-4 w-4" />}
                />
                <StatCard
                    title="Upcoming Classes"
                    value={mockData.stats.upcomingClasses}
                    description="This week"
                    icon={<Calendar className="h-4 w-4" />}
                />
                <StatCard
                    title="Attendance"
                    value={`${mockData.stats.attendance}%`}
                    description="Overall attendance"
                    icon={<GraduationCap className="h-4 w-4" />}
                />
                <StatCard
                    title="Due Payment"
                    value={`৳${mockData.stats.duePayment.toLocaleString()}`}
                    description="Pending amount"
                    icon={<CreditCard className="h-4 w-4" />}
                />
            </div>

            {/* Main Content Grid */}
            <div className="grid gap-6 lg:grid-cols-3">
                {/* My Courses - Takes 2 columns */}
                <Card className="lg:col-span-2">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>My Courses</CardTitle>
                        <Link href="/student/courses">
                            <Button variant="outline" size="sm">
                                View All
                            </Button>
                        </Link>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {mockData.courses.map((course) => (
                                <div
                                    key={course.id}
                                    className="flex items-center justify-between border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                            <BookOpen className="h-6 w-6 text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">{course.title}</p>
                                            <p className="text-sm text-gray-600">{course.batch}</p>
                                            <p className="text-xs text-gray-500 mt-1">
                                                Teacher: {course.teacher}
                                            </p>
                                            <p className="text-xs text-blue-600 mt-1 flex items-center gap-1">
                                                <Clock className="h-3 w-3" />
                                                Next class: {course.nextClass}
                                            </p>
                                        </div>
                                    </div>
                                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                                        {course.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Today's Schedule */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Calendar className="h-5 w-5" />
                            Today&apos;s Classes
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {mockData.todaySchedule.map((class_) => (
                                <div
                                    key={class_.id}
                                    className="border-l-4 border-blue-500 bg-blue-50 p-3 rounded-r"
                                >
                                    <p className="font-medium text-sm text-gray-900">
                                        {class_.course}
                                    </p>
                                    <p className="text-xs text-gray-600 mt-1">{class_.time}</p>
                                    <p className="text-xs text-gray-500">{class_.teacher}</p>
                                    <p className="text-xs text-gray-500">{class_.room}</p>
                                </div>
                            ))}
                        </div>
                        <Link href="/student/schedule">
                            <Button variant="link" size="sm" className="w-full mt-4">
                                View Full Schedule →
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>

            {/* Bottom Grid */}
            <div className="grid gap-6 lg:grid-cols-2">
                {/* Recent Notices */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                            <Bell className="h-5 w-5" />
                            Recent Notices
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {mockData.notices.map((notice) => (
                                <div key={notice.id} className="border-b pb-3 last:border-0">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <p className="font-medium text-sm">{notice.title}</p>
                                            <p className="text-xs text-gray-500 mt-1">{notice.date}</p>
                                        </div>
                                        <span
                                            className={`text-xs px-2 py-1 rounded ${notice.type === 'holiday'
                                                ? 'bg-purple-100 text-purple-700'
                                                : notice.type === 'exam'
                                                    ? 'bg-red-100 text-red-700'
                                                    : 'bg-gray-100 text-gray-700'
                                                }`}
                                        >
                                            {notice.type}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Payment Status */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                            <CreditCard className="h-5 w-5" />
                            Payment Status
                        </CardTitle>
                        <Link href="/student/payments">
                            <Button variant="outline" size="sm">
                                Pay Now
                            </Button>
                        </Link>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {mockData.recentPayments.map((payment) => (
                                <div
                                    key={payment.id}
                                    className="flex items-center justify-between border-b pb-3 last:border-0"
                                >
                                    <div>
                                        <p className="font-medium text-sm">{payment.course}</p>
                                        <p className="text-xs text-gray-500 mt-1">{payment.date}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-semibold">
                                            ৳{payment.amount.toLocaleString()}
                                        </p>
                                        <span
                                            className={`text-xs px-2 py-1 rounded ${payment.status === 'Paid'
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-yellow-100 text-yellow-700'
                                                }`}
                                        >
                                            {payment.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
