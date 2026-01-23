import Link from 'next/link'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Clock, BookOpen, Star, CheckCircle2, ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export const CourseCard = ({ course }) => {
    // Mock data for demonstration if not present in course object
    const discount = course.discount || 0
    const features = course.features || [
        "Live Interactive Classes",
        "PDF Lecture Notes",
        "Dedicated Q&A Sessions"
    ]
    const rating = course.rating || 4.8
    const reviewCount = course.reviewCount || 120

    // Calculate discounted price
    const originalPrice = course.fee
    const discountedPrice = discount > 0
        ? originalPrice - (originalPrice * (discount / 100))
        : originalPrice

    return (
        <Link href={`/courses/${course._id}`} className="group relative flex flex-col h-full bg-white dark:bg-slate-950 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 block">
            {/* Image Section */}
            <div className="relative aspect-video w-full overflow-hidden bg-slate-100 dark:bg-slate-900">
                {course.thumbnail ? (
                    <Image
                        src={course.thumbnail}
                        alt={course.title}
                        fill
                        className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                ) : (
                    <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-indigo-500/10 to-purple-500/10 dark:from-indigo-500/20 dark:to-purple-500/20">
                        <BookOpen className="w-16 h-16 text-indigo-500/40" />
                    </div>
                )}

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-70 transition-opacity" />

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                    <Badge className="bg-white/90 dark:bg-slate-950/90 text-primary hover:bg-white backdrop-blur-md shadow-sm border-0 font-bold uppercase tracking-wider text-[10px]">
                        {course.subject}
                    </Badge>
                </div>

                {discount > 0 && (
                    <div className="absolute top-3 right-3">
                        <Badge variant="destructive" className="font-bold shadow-lg animate-pulse">
                            {discount}% OFF
                        </Badge>
                    </div>
                )}

                {/* Bottom Content on Image */}
                <div className="absolute bottom-3 left-3 right-3 text-white">
                    <div className="flex items-center gap-1.5 text-xs font-medium mb-1 text-yellow-400">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span>{rating}</span>
                        <span className="text-white/70">({reviewCount} reviews)</span>
                    </div>
                    <h3 className="font-bold text-xl leading-snug line-clamp-2 drop-shadow-md group-hover:text-indigo-300 transition-colors">
                        {course.title}
                    </h3>
                </div>
            </div>

            {/* Content Section */}
            <div className="flex flex-col flex-grow p-5">
                {/* Meta info */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-900 px-2.5 py-1 rounded-full">
                        <Clock className="w-3.5 h-3.5 text-indigo-500" />
                        <span className="font-medium">{course.duration} Months</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-900 px-2.5 py-1 rounded-full">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="font-medium">{course.batches?.length || 0} Batches</span>
                    </div>
                </div>

                {/* Features */}
                <div className="mb-6 space-y-2">
                    {features.slice(0, 3).map((feature, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                            <span className="line-clamp-1">{feature}</span>
                        </div>
                    ))}
                </div>

                <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-end justify-between gap-4">
                        <div className="flex flex-col">
                            <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Course Fee</span>
                            <div className="flex items-baseline gap-2">
                                <span className="text-2xl font-bold text-primary">৳{discountedPrice.toLocaleString()}</span>
                                {discount > 0 && (
                                    <span className="text-sm text-muted-foreground line-through decoration-red-500/50 decoration-2">
                                        ৳{originalPrice.toLocaleString()}
                                    </span>
                                )}
                            </div>
                        </div>

                        <Button className="rounded-xl shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all pointer-events-none">
                            <span className="flex items-center gap-2">
                                Enroll Now <ArrowRight className="w-4 h-4" />
                            </span>
                        </Button>
                    </div>
                </div>
            </div>
        </Link>
    )
}
