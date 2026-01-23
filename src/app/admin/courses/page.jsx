'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import {
    Plus,
    Search,
    Edit,
    Trash2,
    MoreVertical,
    Eye,
    BookOpen,
    Loader2
} from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { toast } from 'sonner'

export default function AdminCoursesPage() {
    const [courses, setCourses] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')
    const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, pages: 1 })

    const fetchCourses = useCallback(async () => {
        setLoading(true)
        try {
            const res = await fetch(`/api/courses?page=${pagination.page}&limit=${pagination.limit}&search=${search}`)
            const data = await res.json()
            if (res.ok) {
                setCourses(data.data.courses)
                setPagination(data.data.pagination)
            }
        } catch (error) {
            toast.error('Failed to load courses')
        } finally {
            setLoading(false)
        }
    }, [pagination.page, pagination.limit, search])

    useEffect(() => {
        fetchCourses()
    }, [fetchCourses])

    const handleSearch = (e) => {
        e.preventDefault()
        setPagination(prev => ({ ...prev, page: 1 }))
        fetchCourses()
    }

    const getStatusBadge = (status) => {
        switch (status) {
            case 'ACTIVE':
                return <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none">Active</Badge>
            case 'DRAFT':
                return <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100 border-none">Draft</Badge>
            case 'ARCHIVED':
                return <Badge className="bg-red-100 text-red-700 hover:bg-red-100 border-none">Archived</Badge>
            default:
                return <Badge variant="outline">{status}</Badge>
        }
    }

    return (
        <div className="p-6 space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Courses Management</h1>
                    <p className="text-muted-foreground underline">Create, edit and manage academic courses and batches.</p>
                </div>
                <Link href="/admin/courses/new">
                    <Button className="bg-primary hover:bg-primary/90">
                        <Plus className="mr-2 h-4 w-4" /> Add New Course
                    </Button>
                </Link>
            </div>

            <Card>
                <CardHeader className="pb-3">
                    <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                        <form onSubmit={handleSearch} className="relative w-full md:w-96">
                            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search by title, subject or ID..."
                                className="pl-9"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </form>
                        <div className="flex gap-2">
                            {/* Filter buttons could go here */}
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="flex h-64 items-center justify-center">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        </div>
                    ) : courses.length > 0 ? (
                        <div className="rounded-md border overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Course ID</TableHead>
                                        <TableHead>Title</TableHead>
                                        <TableHead>Subject/Level</TableHead>
                                        <TableHead>Fee</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Batches</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {courses.map((course) => (
                                        <TableRow key={course._id}>
                                            <TableCell className="font-mono text-xs text-primary font-semibold uppercase">
                                                {course.courseId}
                                            </TableCell>
                                            <TableCell className="font-medium">{course.title}</TableCell>
                                            <TableCell>
                                                <div className="flex flex-col">
                                                    <span>{course.subject}</span>
                                                    <span className="text-xs text-muted-foreground">{course.level}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>৳ {course.fee?.toLocaleString()}</TableCell>
                                            <TableCell>{getStatusBadge(course.status)}</TableCell>
                                            <TableCell>
                                                <Badge variant="secondary">{course.batches?.length || 0} Batches</Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon">
                                                            <MoreVertical className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem asChild>
                                                            <Link href={`/courses/${course._id}`} target="_blank">
                                                                <Eye className="mr-2 h-4 w-4" /> Preview
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem asChild>
                                                            <Link href={`/admin/courses/${course._id}/edit`}>
                                                                <Edit className="mr-2 h-4 w-4" /> Edit
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem className="text-red-600">
                                                            <Trash2 className="mr-2 h-4 w-4" /> Delete
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-64 space-y-4 border-2 border-dashed rounded-lg">
                            <div className="bg-gray-100 p-4 rounded-full">
                                <BookOpen className="h-8 w-8 text-gray-400" />
                            </div>
                            <div className="text-center">
                                <h3 className="text-lg font-medium">No courses found</h3>
                                <p className="text-sm text-muted-foreground">Get started by creating your first course.</p>
                            </div>
                            <Link href="/admin/courses/new">
                                <Button className="bg-primary hover:bg-primary/90">Add New Course</Button>
                            </Link>
                        </div>
                    )}

                    {/* Simple Pagination */}
                    {pagination.pages > 1 && (
                        <div className="flex justify-end gap-2 mt-4">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setPagination(p => ({ ...p, page: p.page - 1 }))}
                                disabled={pagination.page <= 1}
                            >
                                Previous
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setPagination(p => ({ ...p, page: p.page + 1 }))}
                                disabled={pagination.page >= pagination.pages}
                            >
                                Next
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
