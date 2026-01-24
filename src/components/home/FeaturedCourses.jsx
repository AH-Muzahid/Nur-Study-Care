"use client"
import React from 'react'
import { CourseCard } from '@/components/courses/CourseCard'
import { ScrollAnimationWrapper } from '@/components/ui/scroll-animation'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

export default function FeaturedCourses({ content }) {
    const router = useRouter()
    const {
        title = "Featured Courses",
        description = "Explore our top-rated courses",
        items = [] // This will be the real courses
    } = content || {}

    return (
        <section className="py-5 md:py-10 bg-background relative z-10">
            <div className="max-w-7xl w-full px-4 mx-auto">
                <ScrollAnimationWrapper variant="fadeUp">
                    <div className="text-center mb-16 max-w-3xl mx-auto space-y-4">
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight font-heading bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-600 dark:to-indigo-400">
                            {title}
                        </h2>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                            {content.description}
                        </p>
                    </div>
                </ScrollAnimationWrapper>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {content.items?.map((course, index) => (
                        <ScrollAnimationWrapper
                            key={index}
                            variant="blurSlideUp"
                            delay={index * 0.15}
                            className="h-full"
                        >
                            <CourseCard course={course} />
                        </ScrollAnimationWrapper>
                    ))}
                </div>
                <ScrollAnimationWrapper variant="fadeUp" delay={items.length * 0.15}>
                    <div className="flex justify-center mt-8">
                        <Button
                            variant="outline"
                            className="px-8 py-3 text-lg font-medium hover:scale-110 transition-all duration-300"
                            onClick={() => router.push('/courses')}
                        >
                            View All Courses
                        </Button>
                    </div>
                </ScrollAnimationWrapper>
            </div>
        </section>
    )
}
