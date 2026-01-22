'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { StatCard } from '@/components/ui/stat-card'
import { Users, BookOpen, DollarSign, GraduationCap, TrendingUp } from 'lucide-react'

export default function AdminDashboard() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-gray-500 mt-1">Overview of your coaching center.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatCard
                    title="Total Students"
                    value="250"
                    description="+12 from last month"
                    icon={<Users className="h-4 w-4" />}
                    trend={{ value: '12%', isPositive: true }}
                />
                <StatCard
                    title="Total Teachers"
                    value="18"
                    description="Active teachers"
                    icon={<GraduationCap className="h-4 w-4" />}
                />
                <StatCard
                    title="Active Courses"
                    value="24"
                    description="Running courses"
                    icon={<BookOpen className="h-4 w-4" />}
                />
                <StatCard
                    title="Revenue (This Month)"
                    value="৳2,45,000"
                    description="+8% from last month"
                    icon={<DollarSign className="h-4 w-4" />}
                    trend={{ value: '8%', isPositive: true }}
                />
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <TrendingUp className="h-5 w-5" />
                            Revenue Overview
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-75 flex items-center justify-center text-gray-400">
                            Revenue chart will be displayed here
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Recent Enrollments</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {[
                                { name: 'Rafi Ahmed', course: 'Physics HSC', date: '2 hours ago' },
                                { name: 'Sadia Islam', course: 'Chemistry HSC', date: '5 hours ago' },
                                { name: 'Mahir Khan', course: 'Math Admission', date: '1 day ago' },
                                { name: 'Nusrat Jahan', course: 'English HSC', date: '1 day ago' },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center justify-between border-b pb-3 last:border-0">
                                    <div>
                                        <p className="font-medium text-sm">{item.name}</p>
                                        <p className="text-xs text-gray-500">{item.course}</p>
                                    </div>
                                    <span className="text-xs text-gray-400">{item.date}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">Payment Status</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span>Collected</span>
                                <span className="font-medium">৳2,00,000</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span>Pending</span>
                                <span className="font-medium text-orange-600">৳45,000</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">Attendance (Today)</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span>Present</span>
                                <span className="font-medium text-green-600">180</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span>Absent</span>
                                <span className="font-medium text-red-600">15</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="text-base">Course Capacity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span>Filled</span>
                                <span className="font-medium">85%</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span>Available Seats</span>
                                <span className="font-medium">45</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

