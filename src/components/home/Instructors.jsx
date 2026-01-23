import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { User } from 'lucide-react'

import { ScrollAnimationWrapper } from '@/components/ui/scroll-animation'

export default function Instructors({ content }) {
    if (!content) return null

    return (
        <section className="py-20 bg-background overflow-hidden">
            <div className="max-w-7xl w-full px-4 mx-auto">
                <ScrollAnimationWrapper variant="fadeUp">
                    <div className="text-center mb-16 max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold tracking-tight mb-4 font-heading">{content.title}</h2>
                        <p className="text-muted-foreground text-lg">{content.description}</p>
                    </div>
                </ScrollAnimationWrapper>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {content.items?.map((instructor, index) => (
                        <ScrollAnimationWrapper key={index} variant="scaleUp" delay={index * 0.1}>
                            <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300 border-none bg-muted/30">
                                <div className="aspect-square relative bg-gray-200 dark:bg-gray-700">
                                    {/* Placeholder for image */}
                                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                                        <User className="w-16 h-16 opacity-50 transition-transform duration-500 group-hover:scale-110" />
                                    </div>
                                </div>
                                <CardContent className="text-center p-6">
                                    <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">{instructor.name}</h3>
                                    <p className="text-primary font-medium text-sm mb-2">{instructor.subject}</p>
                                    <p className="text-muted-foreground text-xs">{instructor.institution}</p>
                                </CardContent>
                            </Card>
                        </ScrollAnimationWrapper>
                    ))}
                </div>
            </div>
        </section>
    )
}
