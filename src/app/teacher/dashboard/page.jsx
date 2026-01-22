'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { StatCard } from '@/components/ui/stat-card'
import { BookOpen, Users, Calendar, ClipboardList } from 'lucide-react'

export default function TeacherDashboard() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Teacher Dashboard</h1>
                <p className="text-gray-500 mt-1">Manage your classes and students.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    title="Total Courses"
                    value="3"
                    description="Active courses"
                    icon={<BookOpen className="h-4 w-4" />}
                />
                <StatCard
                    title="Total Students"
                    value="45"
                    description="Enrolled students"
                    icon={<Users className="h-4 w-4" />}
                />
                <StatCard
                    title="Classes This Week"
                    value="8"
                    description="Scheduled classes"
                    icon={<Calendar className="h-4 w-4" />}
                />
                <StatCard
                    title="Pending Tasks"
                    value="5"
                    description="Attendance & grades"
                    icon={<ClipboardList className="h-4 w-4" />}
                />
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Today's Schedule</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {[
                                { time: '10:00 AM', course: 'Physics HSC Batch A', room: 'Room 101' },
                                { time: '2:00 PM', course: 'Chemistry HSC Batch B', room: 'Room 203' },
                                { time: '4:00 PM', course: 'Physics Admission Test', room: 'Room 101' },
                            ].map((item, i) => (
                                <div key={i} className="flex items-start justify-between border-b pb-3 last:border-0">
                                    <div>
                                        <p className="font-medium">{item.course}</p>
                                        <p className="text-sm text-gray-500">{item.room}</p>
                                    </div>
                                    <span className="text-sm font-medium text-blue-600">{item.time}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Pending Tasks</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {[
                                { task: 'Mark attendance for Physics Batch A', date: 'Today' },
                                { task: 'Submit exam results for Chemistry', date: 'Due tomorrow' },
                                { task: 'Review assignments', date: 'Due in 3 days' },
                            ].map((item, i) => (
                                <div key={i} className="border-b pb-3 last:border-0">
                                    <p className="font-medium text-sm">{item.task}</p>
                                    <p className="text-xs text-gray-500">{item.date}</p>
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

// Fetch teacher profile
const { data: profile } = useQuery({
    queryKey: ['teacher', 'profile'],
    queryFn: async () => {
        const res = await fetch('/api/teachers/me', {
            credentials: 'include',
        })
        if (!res.ok) throw new Error('Failed to fetch profile')
        const data = await res.json()
        return data.data
    },
})

// Fetch my courses
const { data: courses, isLoading } = useQuery({
    queryKey: ['courses', 'my'],
    queryFn: async () => {
        const res = await fetch('/api/courses?limit=20', {
            credentials: 'include',
        })
        if (!res.ok) throw new Error('Failed to fetch courses')
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

const totalBatches = courses?.courses?.reduce((sum, course) => sum + (course.batches?.length || 0), 0) || 0
const totalStudents = courses?.courses?.reduce((sum, course) => {
    return sum + (course.batches?.reduce((bSum, batch) => bSum + (batch.enrolled || 0), 0) || 0)
}, 0) || 0

return (
    <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div>
            <h1 className="text-3xl font-bold">Welcome, {user?.name}!</h1>
            <p className="text-gray-600 mt-1">Teacher Dashboard - Nur Study Care</p>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-3">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">My Courses</CardTitle>
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{courses?.courses?.length || 0}</div>
                    <p className="text-xs text-muted-foreground">Active courses</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Batches</CardTitle>
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{totalBatches}</div>
                    <p className="text-xs text-muted-foreground">Running batches</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{totalStudents}</div>
                    <p className="text-xs text-muted-foreground">Enrolled students</p>
                </CardContent>
            </Card>
        </div>

        {/* My Courses */}
        <Card>
            <CardHeader>
                <CardTitle>My Courses</CardTitle>
            </CardHeader>
            <CardContent>
                {courses?.courses?.length > 0 ? (
                    <div className="space-y-3">
                        {courses.courses.map((course) => (
                            <div
                                key={course._id}
                                className="flex justify-between items-start p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                                onClick={() => router.push(`/courses/${course._id}`)}
                            >
                                <div className="flex-1">
                                    <h3 className="font-semibold">{course.title}</h3>
                                    <p className="text-sm text-gray-600">
                                        {course.subject} - {course.level}
                                    </p>
                                    <div className="flex gap-4 mt-2">
                                        <span className="text-xs text-gray-500">
                                            {course.batches?.length || 0} batches
                                        </span>
                                        <span className="text-xs text-gray-500">
                                            {course.batches?.reduce((sum, b) => sum + (b.enrolled || 0), 0) || 0} students
                                        </span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className={`text-xs px-2 py-1 rounded ${course.status === 'ACTIVE' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                                        }`}>
                                        {course.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-8 text-gray-500">
                        <BookOpen className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                        <p>No courses assigned yet</p>
                    </div>
                )}
            </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
            <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" onClick={() => router.push('/teacher/students')}>
                        View Students
                    </Button>
                    <Button variant="outline" onClick={() => router.push('/teacher/attendance')}>
                        Mark Attendance
                    </Button>
                    <Button variant="outline" onClick={() => router.push('/teacher/grades')}>
                        Add Grades
                    </Button>
                    <Button variant="outline" onClick={() => router.push('/notices/new')}>
                        Create Notice
                    </Button>
                </div>
            </CardContent>
        </Card>
    </div>
)
}
