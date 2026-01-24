import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { GraduationCap, Facebook, Mail, Phone, BookOpen, User, Award, Clock, MapPin, Quote } from 'lucide-react'
import { ScrollAnimationWrapper } from '@/components/ui/scroll-animation'
import { Button } from '@/components/ui/button'

export const metadata = {
    title: 'আমাদের শিক্ষকবৃন্দ - নূর স্টাডি কেয়ার',
    description: 'আমাদের অভিজ্ঞ ও দক্ষ শিক্ষক মণ্ডলী যারা আপনার সন্তানের উজ্জ্বল ভবিষ্যৎ গড়তে অঙ্গীকারবদ্ধ।',
}

export default function InstructorsPage() {
    return (
        <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-background transition-colors duration-500">
            {/* --- Hero Section --- */}
            <section className="relative pt-32 pb-12 lg:pb-20 overflow-hidden bg-white dark:bg-[#0B1120]">
                <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:20px_20px] opacity-50 dark:opacity-20 pointer-events-none"></div>
                <div className="max-w-7xl w-full px-4 mx-auto relative z-10 text-center">
                    <ScrollAnimationWrapper variant="fadeUp">
                        <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-purple-200 dark:border-purple-800 bg-purple-50/50 dark:bg-purple-900/20 backdrop-blur-sm">
                            <GraduationCap className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                            <span className="text-sm font-bold tracking-wide text-purple-700 dark:text-purple-300 uppercase">Faculty Members</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6 text-gray-900 dark:text-white">
                            আমাদের অভিজ্ঞ <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400">শিক্ষক মণ্ডলী</span>
                        </h1>
                        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
                            যারা নিরলস পরিশ্রমে গড়ে তুলছেন আগামীর ভবিষ্যৎ। আমাদের প্রতিটি শিক্ষক নিবেদিতপ্রাণ ও অভিজ্ঞ।
                        </p>
                    </ScrollAnimationWrapper>
                </div>
            </section>

            {/* --- Director Spotlight Section --- */}
            <section className="py-12 lg:py-20 px-4">
                <div className="max-w-6xl mx-auto">
                    <ScrollAnimationWrapper variant="fadeUp">
                        {/* Profile Card Container */}
                        <div className="relative bg-white dark:bg-[#111827] rounded-[2.5rem] p-6 md:p-12 shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800">
                            {/* Decorative Background Elements */}
                            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-500/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
                            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

                            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">

                                {/* Right: Content (Mobile First Order: 2) */}
                                <div className="order-2 lg:order-1 space-y-8">
                                    <div>
                                        <div className="inline-block px-3 py-1 rounded-lg bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 text-xs font-bold uppercase tracking-wider mb-4">
                                            Founder & Director
                                        </div>
                                        <h2 className="text-4xl md:text-5xl font-bold font-heading text-gray-900 dark:text-white mb-2">
                                            মোঃ আব্দুন নূর
                                        </h2>
                                        <p className="text-xl text-primary-600 dark:text-primary-400 font-medium">সিনিয়র শিক্ষক (গণিত ও পদার্থবিজ্ঞান)</p>
                                    </div>

                                    <div className="relative pl-6 border-l-4 border-primary-200 dark:border-primary-800">
                                        <Quote className="absolute top-0 left-6 -translate-y-full w-8 h-8 text-primary-200 dark:text-gray-700 opacity-50" />
                                        <p className="text-lg text-gray-600 dark:text-gray-300 italic leading-relaxed">
                                            &quot;প্রতিটি শিক্ষার্থীর মাঝে লুকিয়ে আছে অসীম সম্ভাবনা। আমাদের দায়িত্ব হলো সঠিক দিকনির্দেশনা ও যত্নের মাধ্যমে সেই সম্ভাবনাকে বাস্তবে রূপ দেওয়া।&quot;
                                        </p>
                                    </div>

                                    {/* Stats / Info Grid */}
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm font-medium uppercase tracking-wider">
                                                <Award className="w-4 h-4" /> শিক্ষাগত যোগ্যতা
                                            </div>
                                            <p className="text-base font-semibold text-gray-900 dark:text-white">B.Sc (Honours), M.Sc</p>
                                            <p className="text-xs text-gray-500">Mathematics</p>
                                        </div>
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm font-medium uppercase tracking-wider">
                                                <Clock className="w-4 h-4" /> অভিজ্ঞতা
                                            </div>
                                            <p className="text-base font-semibold text-gray-900 dark:text-white">১০+ বছর</p>
                                            <p className="text-xs text-gray-500">Teaching Experience</p>
                                        </div>
                                    </div>

                                    {/* Contacts */}
                                    <div className="flex flex-wrap gap-4 pt-4">
                                        <Link href="https://www.facebook.com/profile.php?id=100082759065197" target="_blank">
                                            <Button variant="outline" className="gap-2 rounded-xl border-gray-200 hover:border-blue-500 hover:text-blue-600">
                                                <Facebook className="w-4 h-4" /> Facebook
                                            </Button>
                                        </Link>
                                        <Link href="mailto:contact@nurstudycare.com">
                                            <Button variant="outline" className="gap-2 rounded-xl border-gray-200 hover:border-red-500 hover:text-red-600">
                                                <Mail className="w-4 h-4" /> Email
                                            </Button>
                                        </Link>
                                        <Link href="/contact">
                                            <Button className="gap-2 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-primary-600">
                                                <Phone className="w-4 h-4" /> Contact
                                            </Button>
                                        </Link>
                                    </div>
                                </div>

                                {/* Left: Image (Mobile First Order: 1) */}
                                <div className="order-1 lg:order-2 flex justify-center">
                                    <div className="relative w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl group">
                                        <Image
                                            src="/images/nur.png"
                                            alt="Md. Abdun Nur"
                                            fill
                                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>

                                        {/* Floating Badge */}
                                        <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="text-xs font-medium text-white/80 uppercase">Department</p>
                                                    <p className="font-bold">Science & Math</p>
                                                </div>
                                                <div className="w-10 h-10 rounded-full bg-white text-primary-600 flex items-center justify-center">
                                                    <User className="w-5 h-5" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ScrollAnimationWrapper>
                </div>
            </section>

            {/* --- Join Us Section --- */}
            <section className="py-20 bg-white dark:bg-[#0B1120] relative border-t border-gray-100 dark:border-gray-800">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <ScrollAnimationWrapper variant="fadeUp">
                        <div className="w-16 h-16 mx-auto bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 rounded-2xl flex items-center justify-center mb-6">
                            <BookOpen className="w-8 h-8" />
                        </div>
                        <h2 className="text-3xl font-bold font-heading mb-4">আপনি কি শিক্ষকতা করতে আগ্রহী?</h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                            আমরা খুঁজছি প্যাশনেট এবং দক্ষ শিক্ষক। যদি আপনি মনে করেন আপনি আমাদের টিমে ভ্যালু অ্যাড করতে পারবেন, তবে আজই যোগাযোগ করুন।
                        </p>
                        <Link href="/contact">
                            <Button size="lg" className="rounded-xl px-8 h-12 text-base font-semibold">
                                আমাদের সাথে যোগাযোগ করুন
                            </Button>
                        </Link>
                    </ScrollAnimationWrapper>
                </div>
            </section>
        </div>
    )
}
