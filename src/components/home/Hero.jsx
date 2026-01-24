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
        stats = []
    } = content || {}

    const description = "স্বপ্ন ছোঁয়ার এই পথে, NSC আছে তোমার সাথে..."

    return (
        <div className="relative flex flex-col items-center">
            {/* Hero Section - Redesigned Premium */}
            <section className="relative w-full pt-12 md:pt-24 pb-20 md:pb-24 lg:pt-32 lg:pb-32 overflow-hidden">
                {/* Background Pattern - Restored */}
                <div className="absolute inset-0 opacity-[0.4] dark:opacity-[0.15] transition-opacity duration-500 z-0 pointer-events-none">
                    <div className="absolute inset-0" style={{
                        backgroundImage: 'radial-gradient(var(--pattern-color) 1px, transparent 1px)',
                        backgroundSize: '32px 32px',
                        '--pattern-color': 'rgba(209, 172, 36, 0.4)' // Using Primary color (Purple) for pattern to match theme, or Blue
                    }}></div>
                </div>
                {/* Glow Effect - Restored Original Blueish Pillar */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-full bg-blue-100/50 dark:bg-blue-500/20 blur-3xl rounded-full pointer-events-none"></div>

                <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
                    <ScrollAnimationWrapper variant="fadeUp">
                        {/* Premium Badge */}
                        <div className="inline-flex items-center justify-center mb-8">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 backdrop-blur-md shadow-sm transition-transform hover:scale-105 duration-300">
                                <span className="relative flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-primary-500"></span>
                                </span>
                                <span className="text-sm font-semibold text-gray-700 dark:text-gray-200 tracking-wide">{badge}</span>
                            </div>
                        </div>

                        {/* Massive Headline - Brand Name Dominant */}
                        <div className="space-y-4 mb-8">
                            <span className="text-lg md:text-xl font-medium text-gray-500 dark:text-gray-400 tracking-wider uppercase">
                                Unlock Your Potential with
                            </span>
                            <h1 className="text-6xl md:text-8xl lg:text-8xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-gray-900 via-blue-800 to-gray-900 dark:from-white dark:via-blue-200 dark:to-gray-400 drop-shadow-sm font-heading leading-none">
                                {titleHighlight}
                            </h1>
                        </div>

                        {/* Content Card container */}
                        <div className="bg-white/40 dark:bg-gray-900/40 backdrop-blur-md border border-white/20 dark:border-gray-800 rounded-2xl p-6 md:p-8 mb-10 shadow-lg max-w-3xl mx-auto hover:bg-white/50 dark:hover:bg-gray-900/50 transition-colors duration-300">
                            <p className="text-xl md:text-2xl font-bold text-primary-700 dark:text-primary-300 mb-6 leading-relaxed">
                                &quot;{description}&quot;
                            </p>
                            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-primary-400 to-transparent rounded-full mx-auto mb-6 opacity-50"></div>
                            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
                                অভিজ্ঞ শিক্ষক মণ্ডলী ও আধুনিক পাঠদান পদ্ধতির সমন্বয়ে আমরা নিশ্চিত করি সেরা প্রস্তুতি।
                                HSC, SSC এবং অ্যাডমিশন এর জন্য উত্তরবঙ্গের অন্যতম নির্ভরযোগ্য প্রতিষ্ঠান।
                            </p>

                            {/* Action Buttons - Integrated */}
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 pt-6 border-t border-gray-200/50 dark:border-gray-700/50">
                                <Button
                                    onClick={() => router.push('/courses')}
                                    size="lg" className="h-12 px-8 rounded-xl bg-primary-600 hover:bg-primary-700 text-white text-base font-bold shadow-lg shadow-primary-600/20 hover:shadow-primary-600/40 transition-all duration-300 w-full sm:w-auto">
                                    Explore Courses <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                                <Button
                                    onClick={() => window.open('https://www.youtube.com/@nurstudycare', '_blank')}
                                    size="lg" variant="outline" className="h-12 px-8 rounded-xl border border-gray-300 dark:border-gray-600 bg-transparent text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 text-base font-semibold w-full sm:w-auto transition-all duration-300">
                                    <PlayCircle className="mr-2 h-5 w-5" /> Watch Demo
                                </Button>
                            </div>
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
