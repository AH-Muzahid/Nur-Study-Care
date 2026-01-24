import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BookOpen, Users, Video, Clock, Award, ShieldCheck } from 'lucide-react'
import { ScrollAnimationWrapper } from '@/components/ui/scroll-animation'

// Icon mapping for dynamic content
const iconMap = {
    Users,
    BookOpen,
    Video,
    Clock,
    Award,
    ShieldCheck
}

// Helper to extract color name and return corresponding solid bg class
const getSolidColorClass = (colorString = '') => {
    if (colorString.includes('blue')) return 'bg-blue-500';
    if (colorString.includes('purple')) return 'bg-purple-500';
    if (colorString.includes('red')) return 'bg-red-500';
    if (colorString.includes('green')) return 'bg-green-500';
    if (colorString.includes('yellow')) return 'bg-yellow-500';
    if (colorString.includes('indigo')) return 'bg-indigo-500';
    if (colorString.includes('pink')) return 'bg-pink-500';
    if (colorString.includes('orange')) return 'bg-orange-500';
    if (colorString.includes('teal')) return 'bg-teal-500';
    if (colorString.includes('cyan')) return 'bg-cyan-500';
    return 'bg-blue-600'; // Fallback
}

export function Features({ content }) {
    const {
        title = "Why Choose Us?",
        description = "We offer the best.",
        items = []
    } = content || {}

    return (
        <section className="py-10 md:py-20 bg-gray-50 dark:bg-gray-950/50 relative overflow-hidden">
            {/* Dotted Pattern Background - Subtle Orange Dots */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.3]" style={{
                backgroundImage: `radial-gradient(#fb923c 1.5px, transparent 1.5px)`,
                backgroundSize: '20px 20px'
            }}></div>

            <div className="max-w-7xl w-full mx-auto px-4 relative z-10">
                <ScrollAnimationWrapper variant="blurSlideUp" duration={0.8}>
                    <div className="text-center mb-10 md:mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-gray-50 mb-6 leading-tight">
                            {title}
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
                            {description}
                        </p>
                    </div>
                </ScrollAnimationWrapper>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
                    {items.map((feature, index) => {
                        const Icon = iconMap[feature.icon] || Users // Fallback icon
                        const solidColorClass = getSolidColorClass(feature.color);

                        // Alternate directions: Even -> From Left, Odd -> From Right
                        // This creates the "coming from both sides" effect
                        const animationVariant = index % 2 === 0 ? "blurSlideRight" : "blurSlideLeft";

                        return (
                            <ScrollAnimationWrapper
                                key={index}
                                variant={animationVariant}
                                delay={index * 0.15}
                                duration={0.7}
                                className="h-full"
                            >
                                <div className="relative group h-full">
                                    {/* Border Container with Hover Lift */}
                                    <div className="relative h-full rounded-2xl p-[2px] transition-all duration-300 group-hover:-translate-y-2">

                                        {/* Rotating Gradient Border (Orange Themed) */}
                                        <div className="absolute inset-0 rounded-3xl p-[3px] overflow-hidden opacity-100">
                                            <div
                                                className="absolute -inset-[50%] animate-slow-rotate"
                                                style={{
                                                    background: 'conic-gradient(from 0deg at 50% 50%, transparent 0deg, #f97316 25deg, #ef4444 50deg, transparent 75deg, transparent 180deg, #a855f7 205deg, #fb923c 230deg, transparent 255deg, transparent 360deg)'
                                                }}
                                            ></div>
                                        </div>

                                        {/* Default Static Border (Visible when NOT hovering) */}
                                        <div className="absolute inset-0 rounded-3xl border border-gray-200 dark:border-gray-800 transition-opacity duration-300 group-hover:opacity-0 bg-transparent"></div>

                                        {/* Card Content */}
                                        <Card className="relative h-full border-none bg-white dark:bg-[#0b0c15] rounded-3xl overflow-hidden z-10 hover:bg-gradient-to-tl transition-all duration-500">

                                            {/* Decorative Corner Shape (Top Right) */}
                                            <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full opacity-[0.08] ${solidColorClass} transition-transform duration-500 group-hover:scale-150`}></div>

                                            <div className="px-5 py-1 flex flex-col items-start h-full relative z-10">
                                                {/* Solid Icon Box */}
                                                <div className={`mb-4 w-14 h-14 rounded-xl flex items-center justify-center text-white shadow-lg shadow-orange-500/10 ${solidColorClass} transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                                                    <Icon className="h-7 w-7" strokeWidth={2} />
                                                </div>

                                                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white transition-colors duration-300 group-hover:text-orange-600">
                                                    {feature.title}
                                                </h3>

                                                <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                                                    {feature.description}
                                                </p>
                                            </div>
                                        </Card>
                                    </div>
                                </div>
                            </ScrollAnimationWrapper>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
