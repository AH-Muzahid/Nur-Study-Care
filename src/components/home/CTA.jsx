import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ScrollAnimationWrapper } from '@/components/ui/scroll-animation'
import { Rocket, ArrowRight, Sparkles } from 'lucide-react'

export function CTA({ content }) {
    const {
        title = "Ready to Transform Your Future?",
        description = "Join thousands of students achieving their dreams with Nur Study Care. Your journey to success starts here.",
        primaryBtn = "Join Now",
        secondaryBtn = "Talk to Advisor"
    } = content || {}

    return (
        <section className="relative py-24 lg:py-32 overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-700 to-indigo-900 dark:from-indigo-950 dark:via-purple-950 dark:to-indigo-950"></div>

            {/* Animated Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)]"></div>

            {/* Glowing Orbs */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/30 rounded-full blur-[128px] -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500/30 rounded-full blur-[128px] translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

            <div className="relative z-10 max-w-5xl w-full mx-auto px-4 text-center">
                <ScrollAnimationWrapper variant="scaleUp">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium mb-8 shadow-lg">
                        <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse" />
                        <span className="tracking-wide uppercase text-xs font-bold text-indigo-100">Limited Seats Available</span>
                    </div>

                    {/* Headline */}
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 font-heading text-white tracking-tight leading-tight drop-shadow-sm">
                        {title}
                    </h2>

                    {/* Description */}
                    <p className="text-xl md:text-2xl text-indigo-100 mb-12 max-w-3xl mx-auto leading-relaxed opacity-90">
                        {description}
                    </p>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
                        <Link href="/courses" className="w-full sm:w-auto">
                            <Button size="xl" className="w-full sm:w-auto h-14 px-8 text-lg font-bold bg-white text-indigo-900 hover:bg-indigo-50 hover:scale-105 transition-all duration-300 rounded-2xl shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]">
                                {primaryBtn} <Rocket className="ml-2 w-5 h-5" />
                            </Button>
                        </Link>
                        <Link href="/contact" className="w-full sm:w-auto">
                            <Button size="xl" variant="outline" className="w-full sm:w-auto h-14 px-8 text-lg font-semibold text-white border-white/30 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-white rounded-2xl transition-all duration-300">
                                {secondaryBtn} <ArrowRight className="ml-2 w-5 h-5" />
                            </Button>
                        </Link>
                    </div>

                    {/* Trust Indicators */}
                    <div className="mt-12 flex items-center justify-center gap-6 text-indigo-200 text-sm font-medium opacity-80">
                        <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-green-400"></div> Verified Courses</span>
                        <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-green-400"></div> Expert Mentors</span>
                        <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-green-400"></div> Lifetime Access</span>
                    </div>
                </ScrollAnimationWrapper>
            </div>
        </section>
    )
}
