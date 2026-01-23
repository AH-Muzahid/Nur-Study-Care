import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ScrollAnimationWrapper } from '@/components/ui/scroll-animation'

export function CTA({ content }) {
    const {
        title = "Ready to Start Your Journey?",
        description = "Join us now.",
        primaryBtn = "Enroll Now",
        secondaryBtn = "Contact Us"
    } = content || {}

    return (
        <section className="py-24 bg-primary dark:bg-primary/90 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-primary-800/20 rounded-full blur-3xl" />

            <div className="max-w-7xl w-full mx-auto px-4 text-center relative z-10">
                <ScrollAnimationWrapper variant="fadeUp">
                    <h2 className="text-3xl lg:text-5xl font-bold mb-6 font-heading">
                        {title}
                    </h2>
                    <p className="text-primary-100 mb-10 max-w-2xl mx-auto text-lg/relaxed">
                        {description}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/register">
                            <Button size="lg" className="w-full sm:w-auto bg-white text-primary-900 hover:bg-gray-100 font-bold border-none shadow-xl transform transition hover:scale-105 active:scale-95">
                                {primaryBtn}
                            </Button>
                        </Link>
                        <Link href="/contact">
                            <Button size="lg" variant="outline" className="w-full sm:w-auto text-white border-white hover:bg-white/10 hover:text-white">
                                {secondaryBtn}
                            </Button>
                        </Link>
                    </div>
                </ScrollAnimationWrapper>
            </div>
        </section>
    )
}
