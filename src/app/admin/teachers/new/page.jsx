'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import {
    ArrowLeft,
    Save,
    Loader2,
    Search,
    User as UserIcon,
    Plus,
    Trash2
} from 'lucide-react'
import Link from 'next/link'
import { toast } from 'sonner'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default function NewTeacherPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [searching, setSearching] = useState(false)
    const [searchResults, setSearchResults] = useState([])
    const [userSearchText, setUserSearchText] = useState('')
    const [selectedUser, setSelectedUser] = useState(null)

    const [formData, setFormData] = useState({
        subjects: [''],
        experience: 0,
        salary: 0,
        qualifications: [{ degree: '', institution: '', year: new Date().getFullYear() }],
    })

    const handleUserSearch = async (e) => {
        e.preventDefault()
        if (!userSearchText) return
        setSearching(true)
        try {
            const res = await fetch(`/api/admin/users?search=${userSearchText}&role=TEACHER`)
            const data = await res.json()
            if (res.ok) {
                setSearchResults(data.data)
                if (data.data.length === 0) toast.info('No teachers found with that name/email')
            }
        } catch (error) {
            toast.error('Search failed')
        } finally {
            setSearching(false)
        }
    }

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const handleSubjectChange = (index, value) => {
        const newSubjects = [...formData.subjects]
        newSubjects[index] = value
        setFormData(prev => ({ ...prev, subjects: newSubjects }))
    }

    const addSubject = () => {
        setFormData(prev => ({ ...prev, subjects: [...prev.subjects, ''] }))
    }

    const removeSubject = (index) => {
        const newSubjects = formData.subjects.filter((_, i) => i !== index)
        setFormData(prev => ({ ...prev, subjects: newSubjects }))
    }

    const handleQualChange = (index, field, value) => {
        const newQuals = [...formData.qualifications]
        newQuals[index][field] = field === 'year' ? Number(value) : value
        setFormData(prev => ({ ...prev, qualifications: newQuals }))
    }

    const addQual = () => {
        setFormData(prev => ({
            ...prev,
            qualifications: [...prev.qualifications, { degree: '', institution: '', year: new Date().getFullYear() }]
        }))
    }

    const removeQual = (index) => {
        const newQuals = formData.qualifications.filter((_, i) => i !== index)
        setFormData(prev => ({ ...prev, qualifications: newQuals }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!selectedUser) {
            toast.error('Please select a user first')
            return
        }

        setLoading(true)
        try {
            const res = await fetch('/api/teachers', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: selectedUser._id,
                    ...formData,
                    subjects: formData.subjects.filter(s => s.trim() !== ''),
                    experience: Number(formData.experience),
                    salary: Number(formData.salary)
                })
            })

            const data = await res.json()
            if (res.ok) {
                toast.success('Teacher profile created!')
                router.push('/admin/teachers')
            } else {
                toast.error(data.error || 'Failed to create profile')
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
                    <Link href="/admin/teachers">
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                </Button>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Create Teacher Profile</h1>
                    <p className="text-muted-foreground underline text-primary-600">Link a user account to a faculty profile.</p>
                </div>
            </div>

            <div className="grid gap-6">
                {/* User Selection Part */}
                <Card className={selectedUser ? "border-primary/50 bg-primary/5" : ""}>
                    <CardHeader>
                        <CardTitle>1. Select User Account</CardTitle>
                        <CardDescription>Search for an existing user with &apos;Teacher&apos; role.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {!selectedUser ? (
                            <div className="space-y-4">
                                <form onSubmit={handleUserSearch} className="flex gap-2">
                                    <Input
                                        placeholder="Email or Name..."
                                        value={userSearchText}
                                        onChange={(e) => setUserSearchText(e.target.value)}
                                    />
                                    <Button type="submit" disabled={searching}>
                                        {searching ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                                        <span className="ml-2">Search</span>
                                    </Button>
                                </form>

                                <div className="space-y-2">
                                    {searchResults.map(user => (
                                        <div
                                            key={user._id}
                                            className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted cursor-pointer transition-colors"
                                            onClick={() => setSelectedUser(user)}
                                        >
                                            <div className="flex items-center gap-3">
                                                <Avatar>
                                                    <AvatarImage src={user.avatar} />
                                                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="font-medium">{user.name}</p>
                                                    <p className="text-xs text-muted-foreground">{user.email}</p>
                                                </div>
                                            </div>
                                            <Badge variant="outline">{user.role}</Badge>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center justify-between p-2">
                                <div className="flex items-center gap-4">
                                    <Avatar className="h-12 w-12 border-2 border-primary">
                                        <AvatarImage src={selectedUser.avatar} />
                                        <AvatarFallback>{selectedUser.name[0]}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="text-lg font-bold">{selectedUser.name}</p>
                                        <p className="text-sm text-muted-foreground">{selectedUser.email}</p>
                                    </div>
                                </div>
                                <Button variant="ghost" size="sm" onClick={() => setSelectedUser(null)}>Change User</Button>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Profile Details Part */}
                {selectedUser && (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>2. Professional Details</CardTitle>
                                <CardDescription>Academic and professional background.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Experience (Years)</Label>
                                        <Input
                                            type="number"
                                            value={formData.experience}
                                            onChange={(e) => handleChange('experience', e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Salary (Monthly BDT)</Label>
                                        <Input
                                            type="number"
                                            value={formData.salary}
                                            onChange={(e) => handleChange('salary', e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex justify-between items-center">
                                        <Label>Expert Subjects</Label>
                                        <Button type="button" variant="outline" size="sm" onClick={addSubject}>
                                            <Plus className="h-4 w-4 mr-1" /> Add
                                        </Button>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        {formData.subjects.map((sub, i) => (
                                            <div key={i} className="flex gap-2">
                                                <Input
                                                    placeholder="Subject..."
                                                    value={sub}
                                                    onChange={(e) => handleSubjectChange(i, e.target.value)}
                                                />
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => removeSubject(i)}
                                                    disabled={formData.subjects.length === 1}
                                                >
                                                    <Trash2 className="h-4 w-4 text-red-500" />
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <div className="flex justify-between items-center">
                                    <div>
                                        <CardTitle>3. Qualifications</CardTitle>
                                        <CardDescription>Degrees and institutions.</CardDescription>
                                    </div>
                                    <Button type="button" variant="outline" size="sm" onClick={addQual}>
                                        <Plus className="h-4 w-4 mr-1" /> Add
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {formData.qualifications.map((qual, i) => (
                                    <div key={i} className="p-4 border rounded-lg space-y-3 relative">
                                        <div className="grid md:grid-cols-3 gap-3">
                                            <div className="space-y-1">
                                                <Label className="text-xs">Degree</Label>
                                                <Input
                                                    placeholder="e.g. M.Sc in Physics"
                                                    value={qual.degree}
                                                    onChange={(e) => handleQualChange(i, 'degree', e.target.value)}
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <Label className="text-xs">Institution</Label>
                                                <Input
                                                    placeholder="e.g. Dhaka University"
                                                    value={qual.institution}
                                                    onChange={(e) => handleQualChange(i, 'institution', e.target.value)}
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <Label className="text-xs">Year</Label>
                                                <Input
                                                    type="number"
                                                    value={qual.year}
                                                    onChange={(e) => handleQualChange(i, 'year', e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        {formData.qualifications.length > 1 && (
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                className="absolute top-2 right-2 text-red-500"
                                                onClick={() => removeQual(i)}
                                            >
                                                Remove
                                            </Button>
                                        )}
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        <div className="flex justify-end gap-3">
                            <Button variant="outline" type="button" onClick={() => router.back()}>Cancel</Button>
                            <Button type="submit" disabled={loading} className="min-w-32 bg-primary">
                                {loading && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
                                <Save className="h-4 w-4 mr-2" /> Save Profile
                            </Button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    )
}
