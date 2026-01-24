import { courseService } from '@/services/courseService'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Clock, Users, BookOpen, Calendar, CheckCircle2, ShieldCheck, Star, PlayCircle, FileText, Award } from 'lucide-react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

export async function generateMetadata({ params }) {
    const { id } = await params
    try {
        const course = await courseService.getCourse(id)
        return {
            title: `${course.title} - Nur Study Care`,
            description: course.description.substring(0, 160),
        }
    } catch (error) {
        return {
            title: 'Course Not Found',
        }
    }
}

export default async function CourseDetailsPage({ params }) {
    const { id } = await params
    let course
    try {
        course = await courseService.getCourse(id)
    } catch (error) {
        notFound()
    }

    // Serialize Mongoose document to plain object for client components
    const serializedCourse = JSON.parse(JSON.stringify(course))

    // Mock data if missing
    const features = serializedCourse.features || [
        "Live Interactive Classes",
        "HD Recorded Video Lessons",
        "PDF Lecture Sheets & Notes",
        "Chapter-wise Weekly Exams",
        "Dedicated Solve Classes",
        "Personal Progress Tracking"
    ]
    const rating = 4.9
    const reviewCount = 1240
    const studentsEnrolled = 4500

    return (
        <div className="bg-slate-50 dark:bg-slate-950">
            {/* Immersive Hero Header */}
            <div className="relative bg-slate-900 text-white overflow-hidden pb-12 lg:pb-24 pt-16">
                {/* Background Patterns */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-3xl opacity-50" />
                    <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[400px] h-[400px] bg-purple-600/20 rounded-full blur-3xl opacity-50" />
                    <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5" />
                </div>

                <div className="max-w-7xl w-full mx-auto px-4 relative z-10">
                    <div className="max-w-4xl">
                        <div className="flex flex-wrap items-center gap-3 mb-6 animate-fade-in-up">
                            <Badge variant="secondary" className="bg-indigo-500/20 text-indigo-200 border-indigo-500/30 hover:bg-indigo-500/30 px-3 py-1">
                                {serializedCourse.level}
                            </Badge>
                            <Badge variant="outline" className="border-slate-600 text-slate-300">
                                {serializedCourse.subject}
                            </Badge>
                            <div className="flex items-center gap-1.5 text-yellow-400 text-sm font-medium">
                                <Star className="w-4 h-4 fill-current" />
                                <span>{rating}</span>
                                <span className="text-slate-400">({reviewCount} reviews)</span>
                            </div>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading mb-6 leading-tight text-white drop-shadow-sm">
                            {serializedCourse.title}
                        </h1>

                        <p className="text-xl text-slate-300 mb-8 max-w-2xl leading-relaxed">
                            {serializedCourse.description}
                        </p>

                        <div className="flex flex-wrap items-center gap-y-4 gap-x-8 text-sm font-medium text-slate-300">
                            <div className="flex items-center gap-2.5">
                                <div className="p-2 rounded-full bg-slate-800/50 backdrop-blur-sm border border-slate-700">
                                    <Users className="w-5 h-5 text-indigo-400" />
                                </div>
                                <span>{studentsEnrolled.toLocaleString()}+ Enrolled</span>
                            </div>
                            <div className="flex items-center gap-2.5">
                                <div className="p-2 rounded-full bg-slate-800/50 backdrop-blur-sm border border-slate-700">
                                    <Clock className="w-5 h-5 text-emerald-400" />
                                </div>
                                <span>{serializedCourse.duration} Months Duration</span>
                            </div>
                            <div className="flex items-center gap-2.5">
                                <div className="p-2 rounded-full bg-slate-800/50 backdrop-blur-sm border border-slate-700">
                                    <Calendar className="w-5 h-5 text-purple-400" />
                                </div>
                                <span>Last Updated: Jan 2026</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl w-full mx-auto px-4 relative -mt-0 lg:-mt-12 z-20 pb-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">

                    {/* Main Content Column */}
                    <div className="lg:col-span-2 space-y-10 lg:pt-12">
                        {/* What You'll Learn */}
                        <section className="bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100 dark:border-slate-800">
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                <CheckCircle2 className="w-6 h-6 text-indigo-600" />
                                What You Will Learn
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {features.map((feature, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <div className="mt-1 min-w-5">
                                            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                        </div>
                                        <span className="text-slate-600 dark:text-slate-300">{feature}</span>
                                    </div>
                                ))}
                                {serializedCourse.syllabus && serializedCourse.syllabus.map((item, i) => (
                                    <div key={`syllabus-${i}`} className="flex items-start gap-3">
                                        <div className="mt-1 min-w-5">
                                            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                        </div>
                                        <span className="text-slate-600 dark:text-slate-300">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Course Content / Syllabus */}
                        <section className="bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100 dark:border-slate-800">
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                <BookOpen className="w-6 h-6 text-indigo-600" />
                                Course Content
                            </h2>
                            <div className="space-y-4">
                                {/* Mock Curriculum Items */}
                                {[1, 2, 3].map((module) => (
                                    <div key={module} className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
                                        <div className="bg-slate-50 dark:bg-slate-800/50 p-4 flex justify-between items-center font-medium cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                                            <div className="flex items-center gap-3">
                                                <span className="text-slate-400 font-normal">Module 0{module}</span>
                                                <span>Introduction to {serializedCourse.subject} - Part {module}</span>
                                            </div>
                                            <span className="text-xs text-slate-500 bg-white dark:bg-slate-900 px-2 py-1 rounded border">4 Lectures • 45m</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Instructor */}
                        <section className="bg-white dark:bg-slate-900 rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100 dark:border-slate-800">
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                <Award className="w-6 h-6 text-indigo-600" />
                                Your Instructor
                            </h2>
                            <div className="flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left">
                                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-slate-100 dark:border-slate-800 relative bg-slate-200">
                                    {/* Placeholder Avatar */}
                                    <div className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-slate-400">
                                        {serializedCourse.teacher?.userId?.name?.charAt(0) || 'T'}
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-bold text-xl text-slate-900 dark:text-white mb-2">
                                        {serializedCourse.teacher?.userId?.name || 'Expert Instructor'}
                                    </h3>
                                    <p className="text-indigo-600 font-medium mb-3">Senior Faculty, {serializedCourse.subject}</p>
                                    <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-4">
                                        An experienced educator with over 10 years of teaching expertise. Passionate about simplifying complex concepts and helping students achieve their academic best.
                                    </p>
                                    <div className="flex items-center justify-center md:justify-start gap-4 text-sm text-slate-500">
                                        <span className="flex items-center gap-1"><Star className="w-4 h-4 fill-yellow-400 text-yellow-400" /> 4.9 Instructor Rating</span>
                                        <span className="flex items-center gap-1"><PlayCircle className="w-4 h-4" /> 10 Courses</span>
                                        <span className="flex items-center gap-1"><Users className="w-4 h-4" /> 25k+ Students</span>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Sidebar Column */}
                    <div className="lg:block relative">
                        <div className="sticky top-24 lg:-mt-24 z-30">
                            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                                {/* Video/Thumbnail Placeholder */}
                                <div className="aspect-video bg-slate-800 relative group cursor-pointer overflow-hidden">
                                    {serializedCourse.thumbnail && (
                                        <Image
                                            src={serializedCourse.thumbnail}
                                            alt={serializedCourse.title}
                                            fill
                                            className="object-cover opacity-80 group-hover:opacity-60 transition-opacity"
                                        />
                                    )}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/40 group-hover:scale-110 transition-transform">
                                            <PlayCircle className="w-8 h-8 text-white fill-white" />
                                        </div>
                                    </div>
                                    <div className="absolute bottom-3 left-0 w-full text-center text-white text-sm font-medium">
                                        Preview this course
                                    </div>
                                </div>

                                <div className="p-6 md:p-8">
                                    <div className="flex items-end gap-3 mb-6">
                                        <span className="text-4xl font-bold text-slate-900 dark:text-white">
                                            ৳{serializedCourse.fee.toLocaleString()}
                                        </span>
                                        <span className="text-lg text-slate-400 line-through mb-1.5">
                                            ৳{(serializedCourse.fee * 1.25).toLocaleString()}
                                        </span>
                                        <span className="text-sm font-bold text-rose-500 mb-2">20% OFF</span>
                                    </div>

                                    <Button size="lg" className="w-full text-lg font-bold h-12 rounded-xl shadow-lg shadow-indigo-500/20 mb-3 bg-indigo-600 hover:bg-indigo-700 text-white">
                                        Enroll Now
                                    </Button>
                                    <p className="text-center text-xs text-slate-500 mb-6">30-Day Money-Back Guarantee</p>

                                    <div className="space-y-4 mb-6">
                                        <h4 className="font-bold text-sm text-slate-900 dark:text-white">This course includes:</h4>
                                        <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                                            <li className="flex items-center gap-3">
                                                <PlayCircle className="w-4 h-4 text-indigo-500" />
                                                <span>50+ Hours of On-Demand Content</span>
                                            </li>
                                            <li className="flex items-center gap-3">
                                                <FileText className="w-4 h-4 text-indigo-500" />
                                                <span>20+ Practice Sheets & Notes</span>
                                            </li>
                                            <li className="flex items-center gap-3">
                                                <Users className="w-4 h-4 text-indigo-500" />
                                                <span>Dedicated Community Access</span>
                                            </li>
                                            <li className="flex items-center gap-3">
                                                <ShieldCheck className="w-4 h-4 text-indigo-500" />
                                                <span>Course Completion Certificate</span>
                                            </li>
                                        </ul>
                                    </div>

                                    <div className="flex justify-between items-center pt-6 border-t border-slate-100 dark:border-slate-800 text-sm font-medium">
                                        <Link href="#" className="text-slate-600 hover:text-indigo-600">Share</Link>
                                        <Link href="#" className="text-slate-600 hover:text-indigo-600">Gift this course</Link>
                                        <Link href="#" className="text-slate-600 hover:text-indigo-600">Apply Coupon</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
