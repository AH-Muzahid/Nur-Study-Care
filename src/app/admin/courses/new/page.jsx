'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { ArrowLeft, Save, Loader2, Plus, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'

export default function NewCoursePage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [fetchingTeachers, setFetchingTeachers] = useState(true)
    const [teachers, setTeachers] = useState([])

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        subject: '',
        level: '',
        duration: 4,
        fee: 0,
        teacher: '',
        syllabus: [''],
        status: 'DRAFT',
        thumbnail: ''
    })

    useEffect(() => {
        fetchTeachers()
    }, [])

    const fetchTeachers = async () => {
        try {
            const res = await fetch('/api/teachers?limit=100')
            const data = await res.json()
            if (res.ok) {
                setTeachers(data.data.teachers || [])
            }
        } catch (error) {
            console.error('Failed to fetch teachers')
        } finally {
            setFetchingTeachers(false)
        }
    }

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const handleSyllabusChange = (index, value) => {
        const newSyllabus = [...formData.syllabus]
        newSyllabus[index] = value
        setFormData(prev => ({ ...prev, syllabus: newSyllabus }))
    }

    const addSyllabusItem = () => {
        setFormData(prev => ({ ...prev, syllabus: [...prev.syllabus, ''] }))
    }

    const removeSyllabusItem = (index) => {
        const newSyllabus = formData.syllabus.filter((_, i) => i !== index)
        setFormData(prev => ({ ...prev, syllabus: newSyllabus }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        // Basic validation
        if (!formData.teacher) {
            toast.error('Please select a teacher')
            setLoading(false)
            return
        }

        try {
            const res = await fetch('/api/courses', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    duration: Number(formData.duration),
                    fee: Number(formData.fee),
                    syllabus: formData.syllabus.filter(s => s.trim() !== '')
                })
            })

            const data = await res.json()

            if (res.ok) {
                toast.success('Course created successfully!')
                router.push('/admin/courses')
            } else {
                toast.error(data.message || 'Failed to create course')
            }
        } catch (error) {
            toast.error('Something went wrong')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="p-6 max-w-4xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" asChild>
                    <Link href="/admin/courses">
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                </Button>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Create New Course</h1>
                    <p className="text-muted-foreground underline">Fill in the details to launch a new academic program.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Basic Information</CardTitle>
                        <CardDescription>Essential details about the course.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="title">Course Title</Label>
                            <Input
                                id="title"
                                placeholder="e.g. HSC 2026 Physics First Paper"
                                value={formData.title}
                                onChange={(e) => handleChange('title', e.target.value)}
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                placeholder="Describe what students will learn..."
                                rows={4}
                                value={formData.description}
                                onChange={(e) => handleChange('description', e.target.value)}
                                required
                            />
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="subject">Subject</Label>
                                <Input
                                    id="subject"
                                    placeholder="e.g. Physics, Math, English"
                                    value={formData.subject}
                                    onChange={(e) => handleChange('subject', e.target.value)}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="level">Level</Label>
                                <Select
                                    value={formData.level}
                                    onValueChange={(val) => handleChange('level', val)}
                                    required
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Level" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="SSC">SSC</SelectItem>
                                        <SelectItem value="HSC">HSC</SelectItem>
                                        <SelectItem value="Admission">Admission</SelectItem>
                                        <SelectItem value="Job Preparation">Job Preparation</SelectItem>
                                        <SelectItem value="Other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="duration">Duration (Months)</Label>
                                <Input
                                    id="duration"
                                    type="number"
                                    value={formData.duration}
                                    onChange={(e) => handleChange('duration', e.target.value)}
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="fee">Course Fee (BDT)</Label>
                                <Input
                                    id="fee"
                                    type="number"
                                    value={formData.fee}
                                    onChange={(e) => handleChange('fee', e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Instructor & Media</CardTitle>
                        <CardDescription>Assign a teacher and add promotional content.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="teacher">Assigned Teacher</Label>
                            <Select
                                value={formData.teacher}
                                onValueChange={(val) => handleChange('teacher', val)}
                                disabled={fetchingTeachers}
                                required
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder={fetchingTeachers ? "Loading teachers..." : "Select Teacher"} />
                                </SelectTrigger>
                                <SelectContent>
                                    {teachers.length > 0 ? (
                                        teachers.map(t => (
                                            <SelectItem key={t._id} value={t._id}>
                                                {t.userId?.name} ({t.teacherId})
                                            </SelectItem>
                                        ))
                                    ) : (
                                        <SelectItem value="none" disabled>No teachers found</SelectItem>
                                    )}
                                </SelectContent>
                            </Select>
                            {teachers.length === 0 && !fetchingTeachers && (
                                <p className="text-xs text-red-500">You must create a teacher profile first.</p>
                            )}
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="thumbnail">Thumbnail URL (Optional)</Label>
                            <Input
                                id="thumbnail"
                                placeholder="https://..."
                                value={formData.thumbnail}
                                onChange={(e) => handleChange('thumbnail', e.target.value)}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="status">Course Status</Label>
                            <Select value={formData.status} onValueChange={(val) => handleChange('status', val)}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="DRAFT">Draft</SelectItem>
                                    <SelectItem value="ACTIVE">Active</SelectItem>
                                    <SelectItem value="ARCHIVED">Archived</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <div className="flex justify-between items-center">
                            <div>
                                <CardTitle>Course Syllabus</CardTitle>
                                <CardDescription>List key topics covered in this course.</CardDescription>
                            </div>
                            <Button type="button" variant="outline" size="sm" onClick={addSyllabusItem}>
                                <Plus className="h-4 w-4 mr-2" /> Add Topic
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {formData.syllabus.map((item, index) => (
                            <div key={index} className="flex gap-2">
                                <Input
                                    placeholder={`Topic #${index + 1}`}
                                    value={item}
                                    onChange={(e) => handleSyllabusChange(index, e.target.value)}
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => removeSyllabusItem(index)}
                                    disabled={formData.syllabus.length === 1}
                                >
                                    <Trash2 className="h-4 w-4 text-red-500" />
                                </Button>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                <div className="flex justify-end gap-4">
                    <Button variant="outline" type="button" onClick={() => router.back()}>Cancel</Button>
                    <Button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 min-w-32">
                        {loading ? (
                            <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        ) : (
                            <Save className="h-4 w-4 mr-2" />
                        )}
                        Save Course
                    </Button>
                </div>
            </form>
        </div>
    )
}
