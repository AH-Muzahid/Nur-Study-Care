import React from 'react'
import { CourseCard } from '@/components/courses/CourseCard'

import { ScrollAnimationWrapper } from '@/components/ui/scroll-animation'

export default function FeaturedCourses({ content }) {
    if (!content) return null

    return (
        <section className="py-10 bg-background relative z-10">
            <div className="max-w-7xl w-full px-4 mx-auto">
                <ScrollAnimationWrapper variant="fadeUp">
                    <div className="text-center mb-16 max-w-3xl mx-auto space-y-4">
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight font-heading bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-600 dark:to-indigo-400">
                            {content.title}
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
            </div>
        </section>
    )
}
