'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { StatCard } from '@/components/ui/stat-card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
    Users,
    BookOpen,
    DollarSign,
    GraduationCap,
    TrendingUp,
    TrendingDown,
    UserPlus,
    Calendar,
    AlertCircle,
    CheckCircle,
    Clock,
} from 'lucide-react'
import Link from 'next/link'

// Mock data
const mockData = {
    stats: {
        totalStudents: 250,
        studentsChange: '+12 from last month',
        totalTeachers: 18,
        activeCourses: 24,
        revenue: 245000,
        revenueChange: '+8% from last month',
    },
    recentEnrollments: [
        {
            id: 1,
            student: 'Karim Ahmed',
            course: 'HSC Physics',
            date: 'Today',
            amount: 3000,
            status: 'Paid',
        },
        {
            id: 2,
            student: 'Fatima Rahman',
            course: 'HSC Chemistry',
            date: 'Yesterday',
            amount: 3500,
            status: 'Paid',
        },
        {
            id: 3,
            student: 'Rahim Hossain',
            course: 'SSC English',
            date: '2 days ago',
            amount: 2000,
            status: 'Pending',
        },
        {
            id: 4,
            student: 'Ayesha Khan',
            course: 'Admission Prep',
            date: '3 days ago',
            amount: 4500,
            status: 'Paid',
        },
    ],
    monthlyRevenue: [
        { month: 'Jan', amount: 245000 },
        { month: 'Dec', amount: 228000 },
        { month: 'Nov', amount: 210000 },
        { month: 'Oct', amount: 195000 },
        { month: 'Sep', amount: 185000 },
        { month: 'Aug', amount: 178000 },
    ],
    topCourses: [
        { id: 1, name: 'HSC Physics', students: 45, revenue: 90000 },
        { id: 2, name: 'HSC Chemistry', students: 38, revenue: 76000 },
        { id: 3, name: 'Admission Prep', students: 52, revenue: 156000 },
        { id: 4, name: 'HSC Mathematics', students: 42, revenue: 75600 },
    ],
    recentActivities: [
        {
            id: 1,
            type: 'enrollment',
            message: 'New student enrolled in HSC Physics',
            time: '5 min ago',
        },
        {
            id: 2,
            type: 'payment',
            message: 'Payment received ৳3,500',
            time: '15 min ago',
        },
        {
            id: 3,
            type: 'teacher',
            message: 'New teacher added - Prof. Karim',
            time: '1 hour ago',
        },
        {
            id: 4,
            type: 'course',
            message: 'New batch started - SSC English',
            time: '2 hours ago',
        },
    ],
    pendingApprovals: [
        { id: 1, type: 'Enrollment', item: 'Karim Ahmed - HSC Physics', priority: 'high' },
        { id: 2, type: 'Payment', item: '৳2,500 - Pending verification', priority: 'medium' },
        { id: 3, type: 'Teacher Request', item: 'Leave application', priority: 'low' },
    ],
}

export default function AdminDashboard() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                    <p className="text-gray-500 mt-1">Complete overview of your coaching center</p>
                </div>
                <div className="flex gap-2">
                    <Link href="/admin/students">
                        <Button variant="outline">
                            <UserPlus className="h-4 w-4 mr-2" />
                            Add Student
                        </Button>
                    </Link>
                    <Link href="/admin/courses">
                        <Button>
                            <BookOpen className="h-4 w-4 mr-2" />
                            Add Course
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    title="Total Students"
                    value={mockData.stats.totalStudents}
                    description={mockData.stats.studentsChange}
                    icon={<Users className="h-4 w-4" />}
                />
                <StatCard
                    title="Total Teachers"
                    value={mockData.stats.totalTeachers}
                    description="Active teachers"
                    icon={<GraduationCap className="h-4 w-4" />}
                />
                <StatCard
                    title="Active Courses"
                    value={mockData.stats.activeCourses}
                    description="Running courses"
                    icon={<BookOpen className="h-4 w-4" />}
                />
                <StatCard
                    title="Revenue (This Month)"
                    value={`৳${mockData.stats.revenue.toLocaleString()}`}
                    description={mockData.stats.revenueChange}
                    icon={<DollarSign className="h-4 w-4" />}
                />
            </div>

            {/* Main Grid */}
            <div className="grid gap-6 lg:grid-cols-3">
                {/* Revenue Chart - 2 columns */}
                <Card className="lg:col-span-2">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                            <TrendingUp className="h-5 w-5" />
                            Monthly Revenue Trend
                        </CardTitle>
                        <select className="text-sm border rounded-md px-3 py-1">
                            <option>Last 6 Months</option>
                            <option>Last 12 Months</option>
                            <option>This Year</option>
                        </select>
                    </CardHeader>
                    <CardContent>
                        {/* Simple bar chart with mock data */}
                        <div className="space-y-3">
                            {mockData.monthlyRevenue.map((item, index) => (
                                <div key={item.month} className="flex items-center gap-3">
                                    <span className="text-sm font-medium text-gray-600 w-12">
                                        {item.month}
                                    </span>
                                    <div className="flex-1 bg-gray-200 rounded-full h-8 relative overflow-hidden">
                                        <div
                                            className="bg-blue-500 h-full rounded-full flex items-center justify-end px-3"
                                            style={{
                                                width: `${(item.amount / mockData.monthlyRevenue[0].amount) * 100}%`,
                                            }}
                                        >
                                            <span className="text-xs font-semibold text-white">
                                                ৳{(item.amount / 1000).toFixed(0)}k
                                            </span>
                                        </div>
                                    </div>
                                    {index === 0 && (
                                        <TrendingUp className="h-4 w-4 text-green-600" />
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="mt-6 grid grid-cols-3 gap-4 border-t pt-4">
                            <div className="text-center">
                                <p className="text-2xl font-bold text-green-600">
                                    +{((mockData.monthlyRevenue[0].amount / mockData.monthlyRevenue[1].amount - 1) * 100).toFixed(1)}%
                                </p>
                                <p className="text-xs text-gray-600">Growth Rate</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-bold">
                                    ৳{(mockData.monthlyRevenue.reduce((sum, item) => sum + item.amount, 0) / 1000).toFixed(0)}k
                                </p>
                                <p className="text-xs text-gray-600">Total (6 months)</p>
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-bold">
                                    ৳{(mockData.monthlyRevenue.reduce((sum, item) => sum + item.amount, 0) / mockData.monthlyRevenue.length / 1000).toFixed(0)}k
                                </p>
                                <p className="text-xs text-gray-600">Average</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Pending Approvals */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <AlertCircle className="h-5 w-5 text-orange-600" />
                            Pending Approvals
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {mockData.pendingApprovals.map((item) => (
                                <div
                                    key={item.id}
                                    className="border-l-4 border-orange-500 bg-orange-50 p-3 rounded-r"
                                >
                                    <div className="flex items-start justify-between gap-2">
                                        <div className="flex-1">
                                            <Badge
                                                variant="outline"
                                                className={
                                                    item.priority === 'high'
                                                        ? 'bg-red-100 text-red-700'
                                                        : item.priority === 'medium'
                                                            ? 'bg-yellow-100 text-yellow-700'
                                                            : 'bg-gray-100 text-gray-700'
                                                }
                                            >
                                                {item.type}
                                            </Badge>
                                            <p className="text-sm font-medium mt-1">{item.item}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Button variant="outline" size="sm" className="w-full mt-4">
                            View All Requests →
                        </Button>
                    </CardContent>
                </Card>
            </div>

            {/* Bottom Grid */}
            <div className="grid gap-6 lg:grid-cols-2">
                {/* Top Performing Courses */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Top Performing Courses</CardTitle>
                        <Link href="/admin/courses">
                            <Button variant="outline" size="sm">
                                View All
                            </Button>
                        </Link>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {mockData.topCourses.map((course, index) => (
                                <div
                                    key={course.id}
                                    className="flex items-center justify-between border-b pb-3 last:border-0"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                            <span className="text-sm font-bold text-blue-600">
                                                {index + 1}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="font-medium text-sm">{course.name}</p>
                                            <p className="text-xs text-gray-500">
                                                {course.students} students enrolled
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-semibold text-green-600">
                                            ৳{(course.revenue / 1000).toFixed(0)}k
                                        </p>
                                        <p className="text-xs text-gray-500">Revenue</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Recent Enrollments */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Recent Enrollments</CardTitle>
                        <Link href="/admin/enrollments">
                            <Button variant="outline" size="sm">
                                View All
                            </Button>
                        </Link>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {mockData.recentEnrollments.map((enrollment) => (
                                <div
                                    key={enrollment.id}
                                    className="flex items-center justify-between border-b pb-3 last:border-0"
                                >
                                    <div>
                                        <p className="font-medium text-sm">{enrollment.student}</p>
                                        <p className="text-xs text-gray-500">{enrollment.course}</p>
                                        <p className="text-xs text-gray-400">{enrollment.date}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-semibold">
                                            ৳{enrollment.amount.toLocaleString()}
                                        </p>
                                        <Badge
                                            variant="outline"
                                            className={
                                                enrollment.status === 'Paid'
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-yellow-100 text-yellow-700'
                                            }
                                        >
                                            {enrollment.status}
                                        </Badge>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Activity */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Clock className="h-5 w-5" />
                        Recent Activity
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {mockData.recentActivities.map((activity) => (
                            <div key={activity.id} className="flex items-center gap-3">
                                <div
                                    className={`w-2 h-2 rounded-full ${activity.type === 'enrollment'
                                        ? 'bg-blue-500'
                                        : activity.type === 'payment'
                                            ? 'bg-green-500'
                                            : activity.type === 'teacher'
                                                ? 'bg-purple-500'
                                                : 'bg-orange-500'
                                        }`}
                                />
                                <div className="flex-1">
                                    <p className="text-sm text-gray-900">{activity.message}</p>
                                    <p className="text-xs text-gray-500">{activity.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
