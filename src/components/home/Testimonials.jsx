import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Quote } from 'lucide-react'

import { ScrollAnimationWrapper } from '@/components/ui/scroll-animation'

export default function Testimonials({ content }) {
    if (!content) return null

    return (
        <section className="py-20 bg-primary/5 overflow-hidden">
            <div className="max-w-7xl w-full px-4 mx-auto">
                <ScrollAnimationWrapper variant="fadeUp">
                    <div className="text-center mb-16 max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold tracking-tight mb-4 font-heading">{content.title}</h2>
                        <p className="text-muted-foreground text-lg">{content.description}</p>
                    </div>
                </ScrollAnimationWrapper>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {content.items?.map((item, index) => (
                        <ScrollAnimationWrapper key={index} variant="scaleUp" delay={index * 0.1}>
                            <Card className="border-none shadow-md h-full hover:shadow-lg transition-shadow duration-300">
                                <CardContent className="p-8 flex flex-col gap-4 h-full">
                                    <Quote className="w-10 h-10 text-primary/20" />
                                    <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed flex-grow">
                                        &ldquo;{item.message}&rdquo;
                                    </p>
                                    <div className="flex items-center gap-4 mt-4 pt-4 border-t">
                                        <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
                                            <span className="font-bold text-gray-500">{item.name?.charAt(0)}</span>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-foreground">{item.name}</h4>
                                            <p className="text-sm text-muted-foreground">{item.role}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </ScrollAnimationWrapper>
                    ))}
                </div>
            </div>
        </section>
    )
}
