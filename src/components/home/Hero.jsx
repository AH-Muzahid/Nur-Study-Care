"use client"
import { useEffect, useState, useRef } from 'react'
import { GraduationCap, Users, Video, Award, TrendingUp, PlayCircle, Star, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollAnimationWrapper } from '@/components/ui/scroll-animation'

// Mapping labels to icons
const iconMap = {
    "Students Enrolled": Users,
    "Video Courses": PlayCircle,
    "Expert Teachers": GraduationCap,
    "Success Rate": TrendingUp,
    // Fallbacks
    "default": Star
}

// Counter Component for Animation
const Counter = ({ value }) => {
    const [count, setCount] = useState(0)
    const [isVisible, setIsVisible] = useState(false)
    const ref = useRef(null)

    // Parse value (e.g., "500+" -> 500, suffix "+")
    const match = value.match(/(\D*)(\d+(?:,\d+)*(?:\.\d+)?)(\D*)/) || ["", "", "0", ""]
    const prefix = match[1]
    const number = parseFloat(match[2].replace(/,/g, ''))
    const suffix = match[3]

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                }
            },
            { threshold: 0.1 }
        )
        if (ref.current) observer.observe(ref.current)
        return () => observer.disconnect()
    }, [])

    useEffect(() => {
        if (!isVisible) return

        let startTime
        const duration = 2000 // 2 seconds

        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp
            const progress = timestamp - startTime
            const percentage = Math.min(progress / duration, 1)

            // Ease out quart
            const ease = 1 - Math.pow(1 - percentage, 4)

            setCount(Math.floor(number * ease))

            if (percentage < 1) {
                requestAnimationFrame(animate)
            } else {
                setCount(number)
            }
        }

        requestAnimationFrame(animate)
    }, [isVisible, number])

    return (
        <span ref={ref} className="tabular-nums">
            {prefix}{count}{suffix}
        </span>
    )
}

export function Hero({ content }) {
    const {
        badge = "Admission Going On",
        title = "Unlock Your Potential with",
        titleHighlight = "Nur Study Care",
        description = "Join us today for better education.",
        stats = []
    } = content || {}

    return (
        <div className="relative flex flex-col items-center">
            {/* Hero Section - Theme Responsive */}
            <section className="relative w-full bg-white dark:bg-[#0B1120] pt-16 pb-28 lg:pt-24 lg:pb-40 overflow-hidden transition-colors duration-500 ease-in-out">
                {/* Background Pattern - Adaptive */}
                <div className="absolute inset-0 opacity-[0.4] dark:opacity-[0.15] transition-opacity duration-500">
                    <div className="absolute inset-0" style={{
                        backgroundImage: 'radial-gradient(var(--pattern-color) 1px, transparent 1px)',
                        backgroundSize: '32px 32px',
                        '--pattern-color': 'rgba(59, 130, 246, 0.5)' // Blue-ish for both modes but handled by opacity
                    }}></div>
                </div>


                {/* Glow Effects - Adaptive */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-full bg-blue-100/50 dark:bg-blue-500/20 blur-3xl rounded-full pointer-events-none"></div>


                <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
                    <ScrollAnimationWrapper variant="fadeUp">
                        {/* Badge - Adaptive */}
                        <div className="inline-flex items-center justify-center mx-auto mb-8">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 dark:bg-blue-900/30 dark:border-blue-500/30 dark:text-blue-400 text-sm font-semibold backdrop-blur-sm shadow-sm">
                                <span className="w-2 h-2 rounded-full bg-blue-500 dark:bg-blue-400 animate-pulse"></span>
                                {badge}
                            </div>
                        </div>

                        {/* Headline - Adaptive */}
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 dark:text-white mb-6 leading-[1.1]">
                            {title} <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600 dark:from-orange-400 dark:to-orange-600">
                                {titleHighlight}
                            </span>
                        </h1>

                        {/* Description - Adaptive */}
                        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                            {description}
                        </p>

                        {/* Buttons - Adaptive */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Button
                                onClick={() => router.push('/courses')}
                                size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8 h-12 rounded-lg text-base font-semibold transition-all duration-300 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40">
                                Explore courses<ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                            <Button href="https://www.youtube.com/@nurstudycare" target="_blank" size="lg" variant="outline" className="border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 px-8 h-12 rounded-lg text-base font-semibold backdrop-blur-sm">
                                View Demo
                            </Button>
                        </div>
                    </ScrollAnimationWrapper>
                </div>
            </section>

            {/* Dashboard Style Stats Strip - Clean & Professional */}
            <div className="w-full max-w-7xl px-4 -mt-16 relative z-20 pb-2">
                <ScrollAnimationWrapper variant="fadeUp" delay={0.2}>
                    <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-800/50 rounded-2xl shadow-xl shadow-gray-200/50 dark:shadow-none overflow-hidden transition-all duration-500">
                        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-gray-100 dark:divide-gray-800">
                            {stats.map((stat, index) => {
                                const Icon = iconMap[stat.label] || iconMap["default"]

                                // Modern minimal colors
                                const colors = [
                                    "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20",
                                    "text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20",
                                    "text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20",
                                    "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20"
                                ]
                                const colorClass = colors[index % colors.length]

                                return (
                                    <div key={index} className="p-6 flex items-center gap-4 group hover:bg-white/50 dark:hover:bg-gray-800/50 transition-colors duration-300">
                                        {/* Icon Box */}
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${colorClass} transition-transform duration-300 group-hover:scale-110`}>
                                            <Icon className="h-6 w-6" strokeWidth={2} />
                                        </div>

                                        {/* Content */}
                                        <div className="flex flex-col">
                                            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white leading-none tracking-tight tabular-nums">
                                                <Counter value={stat.value} />
                                            </h3>
                                            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mt-1">
                                                {stat.label}
                                            </p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </ScrollAnimationWrapper>
            </div>
        </div>
    )
}
