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
            <section className="relative w-full bg-white dark:bg-[#0B1120] pt-20 pb-28 lg:pt-32 lg:pb-40 overflow-hidden transition-colors duration-300">
                {/* Background Pattern - Adaptive */}
                <div className="absolute inset-0 opacity-[0.4] dark:opacity-[0.15]">
                    <div className="absolute inset-0" style={{
                        backgroundImage: 'radial-gradient(var(--pattern-color) 1px, transparent 1px)',
                        backgroundSize: '32px 32px',
                        '--pattern-color': 'rgba(59, 130, 246, 0.5)' // Blue-ish for both modes but handled by opacity
                    }}></div>
                </div>

                {/* Glow Effects - Adaptive */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-full bg-blue-100/50 dark:bg-blue-500/20 blur-[100px] rounded-full pointer-events-none mix-blend-multiply dark:mix-blend-normal"></div>

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
                            <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8 h-12 rounded-lg text-base font-semibold transition-all duration-300 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40">
                                Get Started Free <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                            <Button size="lg" variant="outline" className="border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 px-8 h-12 rounded-lg text-base font-semibold backdrop-blur-sm">
                                Live Demo
                            </Button>
                        </div>
                    </ScrollAnimationWrapper>
                </div>
            </section>

            {/* Floating Stats Card - Sleek & Compact (Adaptive) */}
            <div className="w-full max-w-6xl px-4 -mt-16 relative z-20 pb-16">
                <ScrollAnimationWrapper variant="fadeUp" delay={0.3}>
                    <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md rounded-2xl shadow-xl shadow-blue-900/5 dark:shadow-black/30 border border-white/40 dark:border-gray-700/30 p-8">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:divide-x divide-gray-100 dark:divide-gray-800">
                            {stats.map((stat, index) => {
                                const Icon = iconMap[stat.label] || iconMap["default"]

                                // Clean minimal colors - Adaptive
                                const styles = [
                                    "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20",
                                    "text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20",
                                    "text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20",
                                    "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20"
                                ]
                                const styleClass = styles[index % styles.length]

                                return (
                                    <div key={index} className="flex flex-col items-center text-center px-2 group cursor-default">
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 ${styleClass} transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3`}>
                                            <Icon className="h-6 w-6" strokeWidth={2} />
                                        </div>

                                        <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1 tracking-tight tabular-nums">
                                            <Counter value={stat.value} />
                                        </h3>

                                        <p className="text-xs font-semibold tracking-wider text-gray-500 uppercase">
                                            {stat.label}
                                        </p>
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
