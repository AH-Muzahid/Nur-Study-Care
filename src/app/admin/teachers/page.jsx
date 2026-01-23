'use client'

import React, { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
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
    User,
    GraduationCap,
    Loader2,
    Mail,
    Phone
} from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { toast } from 'sonner'

export default function AdminTeachersPage() {
    const [teachers, setTeachers] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')
    const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, pages: 1 })

    const fetchTeachers = useCallback(async () => {
        setLoading(true)
        try {
            const res = await fetch(`/api/teachers?page=${pagination.page}&limit=${pagination.limit}&search=${search}`)
            const data = await res.json()
            if (res.ok) {
                setTeachers(data.data.teachers || [])
                setPagination(data.data.pagination)
            }
        } catch (error) {
            toast.error('Failed to load teachers')
        } finally {
            setLoading(false)
        }
    }, [pagination.page, pagination.limit, search])

    useEffect(() => {
        fetchTeachers()
    }, [fetchTeachers])

    const handleSearch = (e) => {
        e.preventDefault()
        setPagination(prev => ({ ...prev, page: 1 }))
        fetchTeachers()
    }

    const getInitials = (name) => {
        return name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'T'
    }

    return (
        <div className="p-6 space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Teachers Management</h1>
                    <p className="text-muted-foreground underline text-primary-600">List and manage faculty profiles and qualifications.</p>
                </div>
                <Link href="/admin/teachers/new">
                    <Button className="bg-primary hover:bg-primary/90">
                        <Plus className="mr-2 h-4 w-4" /> Add New Teacher
                    </Button>
                </Link>
            </div>

            <Card>
                <CardHeader className="pb-3">
                    <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
                        <form onSubmit={handleSearch} className="relative w-full md:w-96">
                            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search by name, email or ID..."
                                className="pl-9"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </form>
                    </div>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="flex h-64 items-center justify-center">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        </div>
                    ) : teachers.length > 0 ? (
                        <div className="rounded-md border overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Teacher ID</TableHead>
                                        <TableHead>Teacher</TableHead>
                                        <TableHead>Subjects</TableHead>
                                        <TableHead>Experience</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {teachers.map((teacher) => (
                                        <TableRow key={teacher._id}>
                                            <TableCell className="font-mono text-xs text-primary font-semibold">
                                                {teacher.teacherId}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <Avatar className="h-10 w-10">
                                                        <AvatarImage src={teacher.userId?.avatar} />
                                                        <AvatarFallback className="bg-primary/10 text-primary font-bold">
                                                            {getInitials(teacher.userId?.name)}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div className="flex flex-col">
                                                        <span className="font-medium">{teacher.userId?.name}</span>
                                                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                            <Mail className="h-3 w-3" /> {teacher.userId?.email}
                                                        </div>
                                                    </div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex flex-wrap gap-1">
                                                    {teacher.subjects?.map((sub, i) => (
                                                        <Badge key={i} variant="secondary" className="text-[10px] px-1.5 py-0">
                                                            {sub}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </TableCell>
                                            <TableCell>{teacher.experience} Years</TableCell>
                                            <TableCell>
                                                {teacher.isActive ? (
                                                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none">Active</Badge>
                                                ) : (
                                                    <Badge className="bg-red-100 text-red-700 hover:bg-red-100 border-none">Inactive</Badge>
                                                )}
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
                                                            <Link href={`/admin/teachers/${teacher._id}/edit`}>
                                                                <Edit className="mr-2 h-4 w-4" /> Edit Profile
                                                            </Link>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem className="text-red-600">
                                                            <Trash2 className="mr-2 h-4 w-4" /> Deactivate
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
                            <div className="bg-primary/5 p-4 rounded-full text-primary">
                                <GraduationCap className="h-8 w-8" />
                            </div>
                            <div className="text-center">
                                <h3 className="text-lg font-medium">No teachers found</h3>
                                <p className="text-sm text-muted-foreground">Add your first faculty member to get started.</p>
                            </div>
                            <Link href="/admin/teachers/new">
                                <Button className="bg-primary hover:bg-primary/90">Add New Teacher</Button>
                            </Link>
                        </div>
                    )}

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
