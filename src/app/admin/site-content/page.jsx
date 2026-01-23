'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { Save, Loader2, Plus, Trash2 } from 'lucide-react'

// Initial structure matching defaults
const initialContent = {
    hero: {
        badge: '',
        title: '',
        titleHighlight: '',
        description: '',
        stats: []
    },
    features: {
        title: '',
        description: '',
        items: []
    },
    cta: {
        title: '',
        description: '',
        primaryBtn: '',
        secondaryBtn: ''
    },
    featuredCourses: {
        title: '',
        description: '',
        items: []
    },
    directorsNote: {
        title: '',
        content: '',
        image: '',
        name: '',
        designation: ''
    },
    instructors: {
        title: '',
        description: '',
        items: []
    },
    testimonials: {
        title: '',
        description: '',
        items: []
    },
    promoCarousel: {
        slides: []
    }
}

export default function SiteContentPage() {
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [content, setContent] = useState(initialContent)

    useEffect(() => {
        fetchContent()
    }, [])

    const fetchContent = async () => {
        try {
            const res = await fetch('/api/site-content')
            const data = await res.json()
            if (res.ok) {
                // Merge with initial to ensure structure
                setContent({
                    hero: { ...initialContent.hero, ...data.hero },
                    features: { ...initialContent.features, ...data.features },
                    cta: { ...initialContent.cta, ...data.cta },
                    featuredCourses: { ...initialContent.featuredCourses, ...data.featuredCourses },
                    directorsNote: { ...initialContent.directorsNote, ...data.directorsNote },
                    instructors: { ...initialContent.instructors, ...data.instructors },
                    testimonials: { ...initialContent.testimonials, ...data.testimonials },
                    promoCarousel: { ...initialContent.promoCarousel, ...data.promoCarousel }
                })
            }
        } catch (error) {
            toast.error('Failed to load content')
        } finally {
            setLoading(false)
        }
    }

    const handleSave = async (section) => {
        setSaving(true)
        try {
            const res = await fetch('/api/site-content', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    section: section,
                    content: content[section]
                })
            })

            if (!res.ok) throw new Error('Failed to save')

            toast.success(`${section.charAt(0).toUpperCase() + section.slice(1)} updated successfully!`)
        } catch (error) {
            toast.error('Error saving content')
        } finally {
            setSaving(false)
        }
    }

    const updateField = (section, field, value) => {
        setContent(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value
            }
        }))
    }

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
        )
    }

    return (
        <div className="container mx-auto p-6 space-y-8 max-w-5xl">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Site Content</h1>
                    <p className="text-muted-foreground">Manage text and content for your landing page (Bangla/English).</p>
                </div>
            </div>

            <Tabs defaultValue="hero" className="w-full">
                <TabsList className="flex flex-wrap w-full h-auto gap-2 mb-8 bg-muted p-1 rounded-lg">
                    <TabsTrigger value="hero" className="flex-1">Hero</TabsTrigger>
                    <TabsTrigger value="promoCarousel" className="flex-1">Promo Slider</TabsTrigger>
                    <TabsTrigger value="features" className="flex-1">Features</TabsTrigger>
                    <TabsTrigger value="cta" className="flex-1">CTA</TabsTrigger>
                    <TabsTrigger value="featuredCourses" className="flex-1">Courses</TabsTrigger>
                    <TabsTrigger value="directorsNote" className="flex-1">Director</TabsTrigger>
                    <TabsTrigger value="instructors" className="flex-1">Instructors</TabsTrigger>
                    <TabsTrigger value="testimonials" className="flex-1">Testimonials</TabsTrigger>
                </TabsList>

                {/* Hero Section Tab */}
                <TabsContent value="hero">
                    <Card>
                        <CardHeader>
                            <CardTitle>Hero Section</CardTitle>
                            <CardDescription>Edit the main top section of your home page.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-2">
                                <Label>Badge Text (Top Pill)</Label>
                                <Input
                                    value={content.hero.badge}
                                    onChange={(e) => updateField('hero', 'badge', e.target.value)}
                                    placeholder="e.g. Admission Going On"
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label>Main Title</Label>
                                <Input
                                    value={content.hero.title}
                                    onChange={(e) => updateField('hero', 'title', e.target.value)}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label>Highlighted Title (Gradient Text)</Label>
                                <Input
                                    value={content.hero.titleHighlight}
                                    onChange={(e) => updateField('hero', 'titleHighlight', e.target.value)}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label>Description</Label>
                                <Textarea
                                    value={content.hero.description}
                                    onChange={(e) => updateField('hero', 'description', e.target.value)}
                                    rows={4}
                                />
                            </div>
                            <div className="flex justify-end pt-4">
                                <Button onClick={() => handleSave('hero')} disabled={saving}>
                                    {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    Save Hero Changes
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Promo Carousel Tab */}
                <TabsContent value="promoCarousel">
                    <Card>
                        <CardHeader>
                            <CardTitle>Promo Carousel</CardTitle>
                            <CardDescription>Manage the main image slider below hero.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">Slides</h3>
                                {content.promoCarousel.slides?.map((slide, index) => (
                                    <Card key={index} className="p-4 border border-gray-200 dark:border-gray-800">
                                        <div className="grid gap-4 md:grid-cols-2">
                                            <div className="col-span-2 flex justify-between items-center">
                                                <span className="font-semibold text-sm text-gray-500">Slide #{index + 1}</span>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => {
                                                        const newSlides = content.promoCarousel.slides.filter((_, i) => i !== index)
                                                        updateField('promoCarousel', 'slides', newSlides)
                                                    }}
                                                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>

                                            <div className="space-y-2">
                                                <Label>Badge (Top Pill)</Label>
                                                <Input
                                                    value={slide.badge}
                                                    onChange={(e) => {
                                                        const newSlides = [...content.promoCarousel.slides]
                                                        newSlides[index].badge = e.target.value
                                                        updateField('promoCarousel', 'slides', newSlides)
                                                    }}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Title (Big Text)</Label>
                                                <Input
                                                    value={slide.title}
                                                    onChange={(e) => {
                                                        const newSlides = [...content.promoCarousel.slides]
                                                        newSlides[index].title = e.target.value
                                                        updateField('promoCarousel', 'slides', newSlides)
                                                    }}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Subtitle (Accent Text)</Label>
                                                <Input
                                                    value={slide.subtitle}
                                                    onChange={(e) => {
                                                        const newSlides = [...content.promoCarousel.slides]
                                                        newSlides[index].subtitle = e.target.value
                                                        updateField('promoCarousel', 'slides', newSlides)
                                                    }}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Image URL (e.g. /images/slider/1.png)</Label>
                                                <Input
                                                    value={slide.image}
                                                    onChange={(e) => {
                                                        const newSlides = [...content.promoCarousel.slides]
                                                        newSlides[index].image = e.target.value
                                                        updateField('promoCarousel', 'slides', newSlides)
                                                    }}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Link URL</Label>
                                                <Input
                                                    value={slide.link}
                                                    onChange={(e) => {
                                                        const newSlides = [...content.promoCarousel.slides]
                                                        newSlides[index].link = e.target.value
                                                        updateField('promoCarousel', 'slides', newSlides)
                                                    }}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Button Text</Label>
                                                <Input
                                                    value={slide.buttonText}
                                                    onChange={(e) => {
                                                        const newSlides = [...content.promoCarousel.slides]
                                                        newSlides[index].buttonText = e.target.value
                                                        updateField('promoCarousel', 'slides', newSlides)
                                                    }}
                                                    placeholder="LEARN MORE"
                                                />
                                            </div>
                                            <div className="col-span-2 space-y-2">
                                                <Label>Description</Label>
                                                <Textarea
                                                    value={slide.description}
                                                    onChange={(e) => {
                                                        const newSlides = [...content.promoCarousel.slides]
                                                        newSlides[index].description = e.target.value
                                                        updateField('promoCarousel', 'slides', newSlides)
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                                <Button
                                    variant="outline"
                                    className="w-full dashed-border"
                                    onClick={() => {
                                        const newSlides = [...(content.promoCarousel.slides || []), {
                                            title: '', subtitle: '', description: '', image: '', link: '', badge: '', buttonText: 'LEARN MORE'
                                        }]
                                        updateField('promoCarousel', 'slides', newSlides)
                                    }}
                                >
                                    <Plus className="mr-2 h-4 w-4" /> Add Slide
                                </Button>
                            </div>

                            <div className="flex justify-end pt-4">
                                <Button onClick={() => handleSave('promoCarousel')} disabled={saving}>
                                    {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    Save Carousel
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Features Tab */}
                <TabsContent value="features">
                    <Card>
                        <CardHeader>
                            <CardTitle>Features Section</CardTitle>
                            <CardDescription>Manage the feature cards.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid gap-2">
                                <Label>Section Title</Label>
                                <Input
                                    value={content.features.title}
                                    onChange={(e) => updateField('features', 'title', e.target.value)}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label>Section Description</Label>
                                <Textarea
                                    value={content.features.description}
                                    onChange={(e) => updateField('features', 'description', e.target.value)}
                                />
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">Feature Items</h3>
                                {content.features.items?.map((item, index) => (
                                    <Card key={index} className="p-4 border border-gray-200 dark:border-gray-800">
                                        <div className="grid gap-4 md:grid-cols-2">
                                            <div className="col-span-2 flex justify-between items-center">
                                                <span className="font-semibold text-sm text-gray-500">Feature #{index + 1}</span>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => {
                                                        const newItems = content.features.items.filter((_, i) => i !== index)
                                                        updateField('features', 'items', newItems)
                                                    }}
                                                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Title</Label>
                                                <Input
                                                    value={item.title}
                                                    onChange={(e) => {
                                                        const newItems = [...content.features.items]
                                                        newItems[index].title = e.target.value
                                                        updateField('features', 'items', newItems)
                                                    }}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Icon Name</Label>
                                                <Input
                                                    value={item.icon}
                                                    onChange={(e) => {
                                                        const newItems = [...content.features.items]
                                                        newItems[index].icon = e.target.value
                                                        updateField('features', 'items', newItems)
                                                    }}
                                                    placeholder="e.g. Users, BookOpen"
                                                />
                                            </div>
                                            <div className="col-span-2 space-y-2">
                                                <Label>Description</Label>
                                                <Textarea
                                                    value={item.description}
                                                    onChange={(e) => {
                                                        const newItems = [...content.features.items]
                                                        newItems[index].description = e.target.value
                                                        updateField('features', 'items', newItems)
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                                <Button
                                    variant="outline"
                                    className="w-full dashed-border"
                                    onClick={() => {
                                        const newItems = [...(content.features.items || []), { title: '', description: '', icon: 'Users', color: 'text-gray-600' }]
                                        updateField('features', 'items', newItems)
                                    }}
                                >
                                    <Plus className="mr-2 h-4 w-4" /> Add Feature Item
                                </Button>
                            </div>

                            <div className="flex justify-end pt-4">
                                <Button onClick={() => handleSave('features')} disabled={saving}>
                                    {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    Save Features
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* CTA Tab */}
                <TabsContent value="cta">
                    <Card>
                        <CardHeader>
                            <CardTitle>Call To Action</CardTitle>
                            <CardDescription>Edit the bottom banner section.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-2">
                                <Label>Title</Label>
                                <Input
                                    value={content.cta.title}
                                    onChange={(e) => updateField('cta', 'title', e.target.value)}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label>Description</Label>
                                <Textarea
                                    value={content.cta.description}
                                    onChange={(e) => updateField('cta', 'description', e.target.value)}
                                />
                            </div>
                            <div className="grid gap-4 md:grid-cols-2">
                                <div className="grid gap-2">
                                    <Label>Primary Button Text</Label>
                                    <Input
                                        value={content.cta.primaryBtn}
                                        onChange={(e) => updateField('cta', 'primaryBtn', e.target.value)}
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label>Secondary Button Text</Label>
                                    <Input
                                        value={content.cta.secondaryBtn}
                                        onChange={(e) => updateField('cta', 'secondaryBtn', e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="flex justify-end pt-4">
                                <Button onClick={() => handleSave('cta')} disabled={saving}>
                                    {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    Save CTA
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Featured Courses Tab */}
                <TabsContent value="featuredCourses">
                    <Card>
                        <CardHeader>
                            <CardTitle>Featured Courses</CardTitle>
                            <CardDescription>Manage your top courses.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid gap-2">
                                <Label>Title</Label>
                                <Input value={content.featuredCourses.title} onChange={(e) => updateField('featuredCourses', 'title', e.target.value)} />
                            </div>
                            <div className="grid gap-2">
                                <Label>Description</Label>
                                <Textarea value={content.featuredCourses.description} onChange={(e) => updateField('featuredCourses', 'description', e.target.value)} />
                            </div>

                            {/* Course Items */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">Courses</h3>
                                {content.featuredCourses.items?.map((item, index) => (
                                    <Card key={index} className="p-4 border">
                                        <div className="grid gap-4 md:grid-cols-2">
                                            <div className="col-span-2 flex justify-between">
                                                <span className="font-semibold text-sm">Course #{index + 1}</span>
                                                <Button variant="ghost" size="sm" onClick={() => {
                                                    const newItems = content.featuredCourses.items.filter((_, i) => i !== index)
                                                    updateField('featuredCourses', 'items', newItems)
                                                }} className="text-red-500"><Trash2 className="h-4 w-4" /></Button>
                                            </div>
                                            <div className="space-y-2"><Label>Title</Label><Input value={item.title} onChange={(e) => {
                                                const newItems = [...content.featuredCourses.items]; newItems[index].title = e.target.value; updateField('featuredCourses', 'items', newItems)
                                            }} /></div>
                                            <div className="space-y-2"><Label>Badge</Label><Input value={item.badge} onChange={(e) => {
                                                const newItems = [...content.featuredCourses.items]; newItems[index].badge = e.target.value; updateField('featuredCourses', 'items', newItems)
                                            }} /></div>
                                            <div className="space-y-2"><Label>Price</Label><Input value={item.price} onChange={(e) => {
                                                const newItems = [...content.featuredCourses.items]; newItems[index].price = e.target.value; updateField('featuredCourses', 'items', newItems)
                                            }} /></div>
                                            <div className="space-y-2"><Label>Duration</Label><Input value={item.duration} onChange={(e) => {
                                                const newItems = [...content.featuredCourses.items]; newItems[index].duration = e.target.value; updateField('featuredCourses', 'items', newItems)
                                            }} /></div>
                                            <div className="col-span-2 space-y-2"><Label>Description</Label><Textarea value={item.description} onChange={(e) => {
                                                const newItems = [...content.featuredCourses.items]; newItems[index].description = e.target.value; updateField('featuredCourses', 'items', newItems)
                                            }} /></div>
                                        </div>
                                    </Card>
                                ))}
                                <Button variant="outline" className="w-full dashed-border" onClick={() => {
                                    const newItems = [...(content.featuredCourses.items || []), { title: '', description: '', price: '', duration: '', badge: '' }]
                                    updateField('featuredCourses', 'items', newItems)
                                }}><Plus className="mr-2 h-4 w-4" /> Add Course</Button>
                            </div>
                            <div className="flex justify-end pt-4"><Button onClick={() => handleSave('featuredCourses')} disabled={saving}>{saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Save Courses</Button></div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Directors Note Tab */}
                <TabsContent value="directorsNote">
                    <Card>
                        <CardHeader>
                            <CardTitle>Director&apos;s Note</CardTitle>
                            <CardDescription>Message from the Director.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-2"><Label>Title</Label><Input value={content.directorsNote.title} onChange={(e) => updateField('directorsNote', 'title', e.target.value)} /></div>
                            <div className="grid gap-2"><Label>Name</Label><Input value={content.directorsNote.name} onChange={(e) => updateField('directorsNote', 'name', e.target.value)} /></div>
                            <div className="grid gap-2"><Label>Designation</Label><Input value={content.directorsNote.designation} onChange={(e) => updateField('directorsNote', 'designation', e.target.value)} /></div>
                            <div className="grid gap-2"><Label>Content</Label><Textarea rows={6} value={content.directorsNote.content} onChange={(e) => updateField('directorsNote', 'content', e.target.value)} /></div>
                            <div className="flex justify-end pt-4"><Button onClick={() => handleSave('directorsNote')} disabled={saving}>{saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Save Director&apos;s Note</Button></div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Instructors Tab */}
                <TabsContent value="instructors">
                    <Card>
                        <CardHeader>
                            <CardTitle>Instructors</CardTitle>
                            <CardDescription>Manage your team of instructors.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid gap-2"><Label>Title</Label><Input value={content.instructors.title} onChange={(e) => updateField('instructors', 'title', e.target.value)} /></div>
                            <div className="grid gap-2"><Label>Description</Label><Textarea value={content.instructors.description} onChange={(e) => updateField('instructors', 'description', e.target.value)} /></div>

                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">Instructors List</h3>
                                {content.instructors.items?.map((item, index) => (
                                    <Card key={index} className="p-4 border">
                                        <div className="grid gap-4 md:grid-cols-2">
                                            <div className="col-span-2 flex justify-between"><span className="font-semibold text-sm">Instructor #{index + 1}</span><Button variant="ghost" size="sm" onClick={() => {
                                                const newItems = content.instructors.items.filter((_, i) => i !== index); updateField('instructors', 'items', newItems)
                                            }} className="text-red-500"><Trash2 className="h-4 w-4" /></Button></div>
                                            <div className="space-y-2"><Label>Name</Label><Input value={item.name} onChange={(e) => {
                                                const newItems = [...content.instructors.items]; newItems[index].name = e.target.value; updateField('instructors', 'items', newItems)
                                            }} /></div>
                                            <div className="space-y-2"><Label>Subject</Label><Input value={item.subject} onChange={(e) => {
                                                const newItems = [...content.instructors.items]; newItems[index].subject = e.target.value; updateField('instructors', 'items', newItems)
                                            }} /></div>
                                            <div className="space-y-2"><Label>Institution</Label><Input value={item.institution} onChange={(e) => {
                                                const newItems = [...content.instructors.items]; newItems[index].institution = e.target.value; updateField('instructors', 'items', newItems)
                                            }} /></div>
                                        </div>
                                    </Card>
                                ))}
                                <Button variant="outline" className="w-full dashed-border" onClick={() => {
                                    const newItems = [...(content.instructors.items || []), { name: '', subject: '', institution: '', image: '' }]; updateField('instructors', 'items', newItems)
                                }}><Plus className="mr-2 h-4 w-4" /> Add Instructor</Button>
                            </div>
                            <div className="flex justify-end pt-4"><Button onClick={() => handleSave('instructors')} disabled={saving}>{saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Save Instructors</Button></div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Testimonials Tab */}
                <TabsContent value="testimonials">
                    <Card>
                        <CardHeader>
                            <CardTitle>Testimonials</CardTitle>
                            <CardDescription>Student success stories.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid gap-2"><Label>Title</Label><Input value={content.testimonials.title} onChange={(e) => updateField('testimonials', 'title', e.target.value)} /></div>
                            <div className="grid gap-2"><Label>Description</Label><Textarea value={content.testimonials.description} onChange={(e) => updateField('testimonials', 'description', e.target.value)} /></div>

                            <div className="space-y-4">
                                <h3 className="text-lg font-medium">Testimonials List</h3>
                                {content.testimonials.items?.map((item, index) => (
                                    <Card key={index} className="p-4 border">
                                        <div className="grid gap-4 md:grid-cols-2">
                                            <div className="col-span-2 flex justify-between"><span className="font-semibold text-sm">Story #{index + 1}</span><Button variant="ghost" size="sm" onClick={() => {
                                                const newItems = content.testimonials.items.filter((_, i) => i !== index); updateField('testimonials', 'items', newItems)
                                            }} className="text-red-500"><Trash2 className="h-4 w-4" /></Button></div>
                                            <div className="space-y-2"><Label>Student Name</Label><Input value={item.name} onChange={(e) => {
                                                const newItems = [...content.testimonials.items]; newItems[index].name = e.target.value; updateField('testimonials', 'items', newItems)
                                            }} /></div>
                                            <div className="space-y-2"><Label>Role/Batch</Label><Input value={item.role} onChange={(e) => {
                                                const newItems = [...content.testimonials.items]; newItems[index].role = e.target.value; updateField('testimonials', 'items', newItems)
                                            }} /></div>
                                            <div className="col-span-2 space-y-2"><Label>Message</Label><Textarea value={item.message} onChange={(e) => {
                                                const newItems = [...content.testimonials.items]; newItems[index].message = e.target.value; updateField('testimonials', 'items', newItems)
                                            }} /></div>
                                        </div>
                                    </Card>
                                ))}
                                <Button variant="outline" className="w-full dashed-border" onClick={() => {
                                    const newItems = [...(content.testimonials.items || []), { name: '', role: '', message: '', image: '' }]; updateField('testimonials', 'items', newItems)
                                }}><Plus className="mr-2 h-4 w-4" /> Add Testimonial</Button>
                            </div>
                            <div className="flex justify-end pt-4"><Button onClick={() => handleSave('testimonials')} disabled={saving}>{saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Save Testimonials</Button></div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
