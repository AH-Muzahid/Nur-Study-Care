import React from 'react'
import Image from 'next/image'
import { ScrollAnimationWrapper } from '@/components/ui/scroll-animation'

export default function DirectorsNote({ content }) {
    if (!content) return null

    return (
        <section className="py-5 bg-muted/30 overflow-hidden">
            <div className="max-w-7xl w-full px-4 mx-auto">
                <div className="flex flex-col lg:flex-row items-center gap-12">
                    {/* Image Side - Slides from Left */}
                    <div className="w-full lg:w-1/2 relative">
                        <ScrollAnimationWrapper variant="slideRight" duration={0.8}>
                            <div className="relative aspect-[4/3] w-full max-w-lg mx-auto overflow-hidden rounded-2xl shadow-xl">
                                {/* Placeholder for image if not provided */}
                                <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-400">
                                    {content.image ? (
                                        <Image src={content.image} alt={content.name} fill className="object-cover" />
                                    ) : (
                                        <span className="text-xl font-bold opacity-30">Director</span>
                                    )}
                                </div>
                            </div>
                            {/* Decorative element */}
                            <div className="absolute -z-10 top-[-20px] left-[-20px] w-24 h-24 bg-primary/20 rounded-full blur-2xl"></div>
                            <div className="absolute -z-10 bottom-[-20px] right-[-20px] w-32 h-32 bg-secondary/20 rounded-full blur-2xl"></div>
                        </ScrollAnimationWrapper>
                    </div>

                    {/* Content Side - Slides from Right */}
                    <div className="w-full lg:w-1/2 space-y-6">
                        <ScrollAnimationWrapper variant="slideLeft" duration={0.8} delay={0.2}>
                            <h2 className="text-3xl font-bold tracking-tight font-heading">{content.title}</h2>
                            <blockquote className="text-lg text-gray-600 dark:text-gray-300 italic border-l-4 border-primary pl-6 py-2 bg-background/50 rounded-r-lg">
                                &ldquo;{content.content}&rdquo;
                            </blockquote>
                            <div>
                                <h4 className="font-bold text-xl text-foreground">{content.name}</h4>
                                <p className="text-muted-foreground">{content.designation}</p>
                            </div>
                        </ScrollAnimationWrapper>
                    </div>
                </div>
            </div>
        </section>
    )
}
