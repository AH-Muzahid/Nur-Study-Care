"use client"

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search, X } from 'lucide-react'

export const CourseFilters = () => {
    const router = useRouter()
    const searchParams = useSearchParams()

    const [search, setSearch] = useState(searchParams.get('search') || '')
    const [level, setLevel] = useState(searchParams.get('level') || 'all')
    const [subject, setSubject] = useState(searchParams.get('subject') || 'all')

    const handleSearch = (e) => {
        e.preventDefault()
        applyFilters({ search, level, subject })
    }

    const applyFilters = (filters) => {
        const params = new URLSearchParams(searchParams)

        if (filters.search) params.set('search', filters.search)
        else params.delete('search')

        if (filters.level && filters.level !== 'all') params.set('level', filters.level)
        else params.delete('level')

        if (filters.subject && filters.subject !== 'all') params.set('subject', filters.subject)
        else params.delete('subject')

        // Reset to page 1 on filter change
        params.set('page', '1')

        router.push(`/courses?${params.toString()}`)
    }

    const clearFilters = () => {
        setSearch('')
        setLevel('all')
        setSubject('all')
        router.push('/courses')
    }

    return (
        <div className="bg-muted/30 p-6 rounded-lg mb-8 space-y-4">
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
                <div className="flex-grow relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search courses..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-9"
                    />
                </div>

                <Select value={level} onValueChange={(val) => { setLevel(val); applyFilters({ search, level: val, subject }) }}>
                    <SelectTrigger className="w-full md:w-[180px]">
                        <SelectValue placeholder="Level" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Levels</SelectItem>
                        <SelectItem value="SSC">SSC</SelectItem>
                        <SelectItem value="HSC">HSC</SelectItem>
                        <SelectItem value="Admission">Admission</SelectItem>
                        <SelectItem value="Job Preparation">Job Prep</SelectItem>
                    </SelectContent>
                </Select>

                <Select value={subject} onValueChange={(val) => { setSubject(val); applyFilters({ search, level, subject: val }) }}>
                    <SelectTrigger className="w-full md:w-[180px]">
                        <SelectValue placeholder="Subject" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Subjects</SelectItem>
                        <SelectItem value="Physics">Physics</SelectItem>
                        <SelectItem value="Chemistry">Chemistry</SelectItem>
                        <SelectItem value="Math">Math</SelectItem>
                        <SelectItem value="Biology">Biology</SelectItem>
                        <SelectItem value="English">English</SelectItem>
                        <SelectItem value="ICT">ICT</SelectItem>
                    </SelectContent>
                </Select>

                <Button type="submit">Search</Button>
                {(search || level !== 'all' || subject !== 'all') && (
                    <Button variant="ghost" onClick={clearFilters} type="button">
                        <X className="mr-2 h-4 w-4" /> Clear
                    </Button>
                )}
            </form>
        </div>
    )
}
