'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { StatCard } from '@/components/ui/stat-card'
import { BookOpen, Calendar, CreditCard, GraduationCap } from 'lucide-react'

export default function StudentDashboard() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Student Dashboard</h1>
                <p className="text-gray-500 mt-1">Welcome back! Here's your overview.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    title="Enrolled Courses"
                    value="4"
                    description="Active courses"
                    icon={<BookOpen className="h-4 w-4" />}
                />
                <StatCard
                    title="Upcoming Classes"
                    value="12"
                    description="This week"
                    icon={<Calendar className="h-4 w-4" />}
                />
                <StatCard
                    title="Attendance"
                    value="85%"
                    description="Overall attendance"
                    icon={<GraduationCap className="h-4 w-4" />}
                />
                <StatCard
                    title="Due Payment"
                    value="৳2,500"
                    description="Pending amount"
                    icon={<CreditCard className="h-4 w-4" />}
                />
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>My Courses</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-center justify-between border-b pb-3 last:border-0">
                                    <div>
                                        <p className="font-medium">Physics HSC Batch</p>
                                        <p className="text-sm text-gray-500">Next class: Today 3:00 PM</p>
                                    </div>
                                    <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-700">Active</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Recent Notices</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="border-b pb-3 last:border-0">
                                    <p className="font-medium text-sm">Holiday Notice - Winter Break</p>
                                    <p className="text-xs text-gray-500">Posted 2 days ago</p>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
const router = useRouter()
const { user } = useAuthStore()

// Fetch student profile
const { data: profile } = useQuery({
    queryKey: ['student', 'profile'],
    queryFn: async () => {
        const res = await fetch('/api/students/me', {
            credentials: 'include',
        })
        if (!res.ok) throw new Error('Failed to fetch profile')
        const data = await res.json()
        return data.data
    },
})

// Fetch enrollments
const { data: enrollments, isLoading } = useQuery({
    queryKey: ['enrollments', 'my'],
    queryFn: async () => {
        const res = await fetch('/api/enrollments?limit=10', {
            credentials: 'include',
        })
        if (!res.ok) throw new Error('Failed to fetch enrollments')
        const data = await res.json()
        return data.data
    },
})

// Fetch payments
const { data: payments } = useQuery({
    queryKey: ['payments', 'my'],
    queryFn: async () => {
        const res = await fetch('/api/payments?limit=5', {
            credentials: 'include',
        })
        if (!res.ok) throw new Error('Failed to fetch payments')
        const data = await res.json()
        return data.data
    },
})

// Fetch notices
const { data: notices } = useQuery({
    queryKey: ['notices', 'active'],
    queryFn: async () => {
        const res = await fetch('/api/notices?activeOnly=true&limit=5', {
            credentials: 'include',
        })
        if (!res.ok) throw new Error('Failed to fetch notices')
        const data = await res.json()
        return data.data
    },
})

if (isLoading) {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading dashboard...</p>
            </div>
        </div>
    )
}

return (
    <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div>
            <h1 className="text-3xl font-bold">Welcome, {user?.name}!</h1>
            <p className="text-gray-600 mt-1">Student Dashboard - Nur Study Care</p>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-3">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">My Courses</CardTitle>
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{enrollments?.enrollments?.length || 0}</div>
                    <p className="text-xs text-muted-foreground">Active enrollments</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Payments Made</CardTitle>
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{payments?.payments?.length || 0}</div>
                    <p className="text-xs text-muted-foreground">Recent transactions</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">New Notices</CardTitle>
                    <Bell className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{notices?.notices?.length || 0}</div>
                    <p className="text-xs text-muted-foreground">Unread announcements</p>
                </CardContent>
            </Card>
        </div>

        {/* My Courses */}
        <Card>
            <CardHeader>
                <CardTitle>My Courses</CardTitle>
            </CardHeader>
            <CardContent>
                {enrollments?.enrollments?.length > 0 ? (
                    <div className="space-y-3">
                        {enrollments.enrollments.map((enrollment) => (
                            <div
                                key={enrollment._id}
                                className="flex justify-between items-center p-3 border rounded-lg hover:bg-gray-50"
                            >
                                <div>
                                    <h3 className="font-semibold">{enrollment.course?.title}</h3>
                                    <p className="text-sm text-gray-600">
                                        {enrollment.course?.subject} - {enrollment.batchName}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        Status: <span className="font-medium">{enrollment.status}</span>
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-semibold">
                                        Due: ৳{enrollment.dueAmount?.toLocaleString()}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        of ৳{enrollment.totalFee?.toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-8 text-gray-500">
                        <BookOpen className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                        <p>No enrollments yet</p>
                        <Button className="mt-4" onClick={() => router.push('/courses')}>
                            Browse Courses
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>

        {/* Recent Notices */}
        <Card>
            <CardHeader>
                <CardTitle>Recent Notices</CardTitle>
            </CardHeader>
            <CardContent>
                {notices?.notices?.length > 0 ? (
                    <div className="space-y-3">
                        {notices.notices.map((notice) => (
                            <div
                                key={notice._id}
                                className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                                onClick={() => router.push(`/notices/${notice._id}`)}
                            >
                                <div className="flex justify-between items-start">
                                    <h3 className="font-semibold">{notice.title}</h3>
                                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                                        {notice.type}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-600 mt-1 line-clamp-2">{notice.content}</p>
                                <p className="text-xs text-gray-500 mt-2">
                                    {new Date(notice.publishDate).toLocaleDateString()}
                                </p>
                            </div>
                        ))}
                        <Button variant="outline" className="w-full" onClick={() => router.push('/notices')}>
                            View All Notices
                        </Button>
                    </div>
                ) : (
                    <p className="text-center py-4 text-gray-500">No notices available</p>
                )}
            </CardContent>
        </Card>
    </div>
)
}
