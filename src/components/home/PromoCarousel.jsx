'use client'

import React, { useState, useEffect, useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { ScrollAnimationWrapper } from '@/components/ui/scroll-animation'

// Memoized Slide Item Component to prevent re-renders
const SlideItem = React.memo(({ slide, isActive }) => (
    <div className="flex-[0_0_100%] h-full min-w-0 relative group">
        <Link href={slide.link} className="absolute inset-0 z-20" aria-label={`View ${slide.title}`}>
            <span className="sr-only">View Details</span>
        </Link>

        {/* Background Image - Optimized */}
        <div className="absolute inset-0 transition-transform duration-1000 ease-out">
            <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover"
                priority={isActive} // Only prioritize if it's the first active slide
                loading={isActive ? "eager" : "lazy"}
                sizes="(max-width: 768px) 90vw, (max-width: 1200px) 70vw, 60vw"
                quality={85}
            />
            {/* Overlay Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent`} />
        </div>

        <div className="w-full pl-6 md:pl-12 lg:pl-16 pr-4 md:pr-12 relative z-10 pointer-events-none h-full flex flex-col justify-center">
            {/* Badge */}
            <div className="inline-block px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/20 text-[10px] md:text-xs font-bold text-white mb-4 uppercase tracking-wider self-start rounded-full">
                {slide.badge}
            </div>

            {/* Title */}
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white uppercase tracking-tight leading-[0.9] shadow-black/20 text-shadow font-heading mb-2">
                {slide.title}
            </h2>

            {/* Subtitle */}
            <div className="flex items-center gap-3 mb-4">
                <div className="h-0.5 w-8 md:w-12 bg-accent opacity-80"></div>
                <p className="text-lg md:text-2xl lg:text-3xl text-white font-medium uppercase tracking-widest">
                    {slide.subtitle}
                </p>
            </div>

            {/* Description */}
            <p className="text-white/90 max-w-lg text-sm md:text-base leading-relaxed hidden md:block border-l-2 border-white/30 pl-4 mb-8">
                {slide.description}
            </p>

            {/* Button */}
            <div className="mt-2 md:mt-6 pointer-events-auto inline-block self-start">
                <Button
                    size="lg"
                    asChild
                    className="bg-white text-black hover:bg-gray-100 font-bold rounded-none px-2 md:px-4 text-sm md:text-base transition-all hover:translate-x-1 h-8 md:h-8 border-l-4 border-accent"
                >
                    <Link href={slide.link}>
                        <span>{slide.buttonText || "LEARN MORE"}</span>
                    </Link>
                </Button>
            </div>
        </div>
    </div>
));
SlideItem.displayName = 'SlideItem';

export function PromoCarousel({ content }) {
    const slides = content?.slides || []

    // 1. Always call hooks first
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: true,
        duration: 40,
        skipSnaps: false,
        dragFree: false
    }, [Autoplay({ delay: 5000, stopOnInteraction: false })])

    const [selectedIndex, setSelectedIndex] = useState(0)
    const resumeTimerRef = React.useRef(null)

    const onSelect = useCallback((emblaApi) => {
        setSelectedIndex(emblaApi.selectedScrollSnap())
    }, [])

    useEffect(() => {
        if (!emblaApi) return
        onSelect(emblaApi)
        emblaApi.on('select', onSelect)
        emblaApi.on('reInit', onSelect)

        return () => {
            if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current)
        }
    }, [emblaApi, onSelect])

    const handleNext = useCallback(() => {
        if (!emblaApi) return

        const autoplay = emblaApi.plugins().autoplay
        if (!autoplay) return

        emblaApi.scrollNext()
        autoplay.stop()
        if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current)
        resumeTimerRef.current = setTimeout(() => {
            autoplay.play()
        }, 3000)
    }, [emblaApi])

    // 2. Return early if needed
    if (!slides.length) return null

    // 3. Logic dependent on slides existence
    const nextIndex = (selectedIndex + 1) % slides.length
    const nextSlide = slides[nextIndex] || slides[0]

    return (
        <section className="max-w-7xl mx-auto flex justify-center items-center py-4 md:py-6 overflow-hidden">
            <ScrollAnimationWrapper variant="fadeUp" className="w-full">
                <div className="flex w-full px-[2vw] gap-[1vw] md:gap-[0.5vw] h-[180px] md:h-[320px] lg:h-[430px]">

                    {/* Left Side (79vw) - Main Active Carousel */}
                    <div
                        className="relative w-[78vw] md:w-[80vw] h-full rounded-xl md:rounded-2xl overflow-hidden shadow-lg"
                        ref={emblaRef}
                    >
                        <div className="flex h-full select-none">
                            {slides.map((slide, index) => (
                                <SlideItem
                                    key={slide.id}
                                    slide={slide}
                                    isActive={index === 0} // Only first slide gets priority on initial load
                                />
                            ))}
                        </div>

                        {/* Navigation Dots - Kept simple inline as they update frequently */}
                        <div className="absolute bottom-3 md:bottom-6 left-1/2 transform -translate-x-1/2 flex gap-1.5 md:gap-2 z-30 pointer-events-none">
                            {slides.map((_, idx) => (
                                <div
                                    key={idx}
                                    className={`h-1 rounded-full transition-all duration-500 ease-out ${idx === selectedIndex ? 'w-6 md:w-12 bg-white' : 'w-1.5 md:w-2 bg-white/30'
                                        }`}
                                ></div>
                            ))}
                        </div>
                    </div>

                    {/* Right Side (18vw) - Always Visible Next Image Preview */}
                    <div
                        className="relative w-[20vw] h-full rounded-xl md:rounded-2xl overflow-hidden shadow-lg group cursor-pointer"
                        onClick={handleNext}
                    >
                        {/* Hover Effect Layer */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-white/10 z-40 transition-colors duration-300"></div>

                        {/* Animated Content for Next Slide */}
                        <div className="absolute inset-0 h-full w-full">
                            {/* Background matches the next slide exactly */}
                            <div className="absolute inset-0 h-full w-full transition-all duration-700 ease-in-out">
                                <Image
                                    src={nextSlide.image}
                                    alt="Next Slide Preview"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    sizes="(max-width: 768px) 30vw, 20vw"
                                    quality={50} // Lower quality for preview is fine, saves data
                                />
                                {/* Subtle darken overlay */}
                                <div className="absolute inset-0 bg-black/20" />
                            </div>

                            {/* Navigation Arrow Button */}
                            <div className="absolute bottom-2 right-2 md:bottom-4 md:right-4 z-50 transition-transform duration-300 group-hover:scale-110 group-active:scale-95">
                                <div className="h-6 w-6 md:h-10 md:w-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all shadow-lg border border-white/10">
                                    <ArrowRight className="h-3 w-3 md:h-5 md:w-5" />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </ScrollAnimationWrapper>
        </section>
    )
}
