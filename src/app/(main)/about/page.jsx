import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ScrollAnimationWrapper } from '@/components/ui/scroll-animation'
import { ArrowRight, Star, Target, Compass, Lightbulb, Heart, History, Globe, BookOpen, Check } from 'lucide-react'

export const metadata = {
    title: 'আমাদের গল্প - নূর স্টাডি কেয়ার',
    description: 'আমাদের অনুপ্রেরণা, লক্ষ্য এবং আগামীর স্বপ্ন।',
}

export default function AboutPage() {
    return (
        <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-black selection:bg-primary-500/30">
            {/* --- Hero: Creative & Bold --- */}
            <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-20">
                {/* Animated Gradient Background */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,36,209,0.15),transparent_50%)]"></div>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(0,198,255,0.1),transparent_50%)]"></div>

                {/* Floating Elements (Decorative) */}
                <div className="absolute top-1/4 left-10 w-20 h-20 bg-gradient-to-tr from-primary-400 to-indigo-500 rounded-full blur-3xl opacity-60 animate-floating"></div>
                <div className="absolute bottom-1/4 right-10 w-32 h-32 bg-gradient-to-tr from-cyan-400 to-blue-500 rounded-full blur-3xl opacity-50 animate-floating" style={{ animationDelay: '1s' }}></div>

                <div className="max-w-7xl w-full px-4 mx-auto relative z-10 text-center">
                    <ScrollAnimationWrapper variant="scaleUp">
                        <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-primary-200 dark:border-primary-800 bg-primary-50/50 dark:bg-primary-900/20 backdrop-blur-sm">
                            <Star className="w-4 h-4 text-primary-600 dark:text-primary-400 fill-current" />
                            <span className="text-sm font-bold tracking-wide text-primary-700 dark:text-primary-300 uppercase">আমাদের পরিচয়</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black font-heading tracking-tight mb-6 leading-tight">
                            স্বপ্নের <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 via-indigo-500 to-cyan-500 dark:from-primary-400 dark:via-indigo-400 dark:to-cyan-400">শুরু</span> যেখানে
                        </h1>
                        <p className="text-xl md:text-3xl font-light text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-normal">
                            &quot;একটি স্ফুলিঙ্গ থেকে আলোকবর্তিকা, আমাদের গল্প কেবল শিক্ষার নয়, এটি স্বপ্ন জয়ের গল্প।&quot;
                        </p>
                    </ScrollAnimationWrapper>
                </div>
            </section>

            {/* --- The "Ideal Combo" Section: Story + Inspiration + Mission --- */}
            <section className="py-20 lg:py-32 relative">
                <div className="max-w-7xl w-full px-4 mx-auto">
                    {/* BENTO GRID LAYOUT */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-auto">

                        {/* 1. The Story (Large Block) */}
                        <div className="md:col-span-8 row-span-2 relative group rounded-3xl overflow-hidden border border-white/50 dark:border-white/10 shadow-xl bg-white dark:bg-[#0F1115]">
                            <ScrollAnimationWrapper variant="fadeUp" className="h-full">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-primary-100 dark:bg-primary-900/20 rounded-full blur-[100px] -z-0 translate-x-1/2 -translate-y-1/2 group-hover:bg-primary-200 dark:group-hover:bg-primary-900/30 transition-colors duration-700"></div>

                                <div className="p-8 md:p-12 h-full flex flex-col relative z-10">
                                    <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6 flex items-center gap-3">
                                        <BookOpen className="w-8 h-8 text-primary-600" />
                                        আমাদের গল্প
                                    </h2>
                                    <div className="space-y-6 text-lg text-gray-600 dark:text-gray-300 leading-relaxed flex-grow">
                                        <p>
                                            শুরুটা হয়েছিল খুব ছোট পরিসরে। লক্ষ্য ছিল একটাই—গতানুগতিক শিক্ষার বাইরে গিয়ে এমন কিছু করা, যেখানে শিক্ষার্থীরা কেবল বইয়ের পাতা মুখস্থ করবে না, বরং শিখবে আগ্রহ নিয়ে।
                                        </p>
                                        <p>
                                            নূর স্টাডি কেয়ারের প্রতিটি ইটের গাঁথুনিতে মিশে আছে আমাদের ভালোবাসা। আমরা চেয়েছিলাম এমন একটি আঙিনা, যা হবে শিক্ষার্থীদের দ্বিতীয় ঘর। আজ আমরা গর্বিত, কারণ আমরা কেবল ভালো ছাত্র তৈরি করছি না, আমরা ভালো মানুষ গড়ার কারিগর হিসেবে কাজ করছি।
                                        </p>
                                    </div>
                                    {/* Visual Decor */}
                                    <div className="mt-8 h-2 w-24 bg-gradient-to-r from-primary-500 to-cyan-500 rounded-full"></div>
                                </div>
                            </ScrollAnimationWrapper>
                        </div>

                        {/* 2. Director's Inspiration (Portrait Block) */}
                        <div className="md:col-span-4 row-span-2 relative group rounded-3xl overflow-hidden border border-white/50 dark:border-white/10 shadow-xl bg-primary-900 text-white">
                            <ScrollAnimationWrapper variant="scaleUp" className="h-full">
                                {/* Image Background with Overlay */}
                                <div className="absolute inset-0 z-0">
                                    <Image
                                        src="/images/nur.png"
                                        alt="Md. Abdun Nur"
                                        fill
                                        className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-primary-900/50 to-transparent"></div>
                                </div>

                                <div className="relative z-10 p-8 h-full flex flex-col justify-end">
                                    <div className="mb-6">
                                        <Compass className="w-10 h-10 text-cyan-400 mb-4" />
                                        <blockquote className="text-xl font-medium italic leading-relaxed text-gray-100">
                                            &quot;শিক্ষা হলো অন্তরের আলো। আমাদের কাজ সেই আলো জ্বালিয়ে দেওয়া, পথ দেখানো।&quot;
                                        </blockquote>
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold font-heading">মোঃ আব্দুন নূর</h3>
                                        <p className="text-cyan-200 text-sm tracking-widest uppercase mt-1">পরিচালক ও প্রতিষ্ঠাতা</p>
                                    </div>
                                </div>
                            </ScrollAnimationWrapper>
                        </div>

                        {/* 3. Mission (Horizontal Block Left) */}
                        <div className="md:col-span-6 min-h-[300px] relative group rounded-3xl overflow-hidden border border-white/50 dark:border-white/10 shadow-xl bg-gradient-to-br from-indigo-50 to-white dark:from-indigo-950/30 dark:to-black">
                            <ScrollAnimationWrapper variant="slideRight" className="h-full">
                                <div className="p-8 h-full flex flex-col">
                                    <div className="w-12 h-12 rounded-2xl bg-indigo-500 text-white flex items-center justify-center mb-6 shadow-lg shadow-indigo-500/25">
                                        <Target className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4 font-heading group-hover:text-indigo-600 transition-colors">আমাদের মিশন</h3>
                                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                        প্রতিটি শিক্ষার্থীর সুপ্ত প্রতিভার বিকাশ ঘটানো এবং তাদের আধুনিক বিশ্বের চ্যালেঞ্জ মোকাবেলায় দক্ষ করে গড়ে তোলা। গুণগত শিক্ষা এবং নৈতিকতার সংমিশ্রণই আমাদের অঙ্গীকার।
                                    </p>
                                </div>
                            </ScrollAnimationWrapper>
                        </div>

                        {/* 4. Vision (Horizontal Block Right) */}
                        <div className="md:col-span-6 min-h-[300px] relative group rounded-3xl overflow-hidden border border-white/50 dark:border-white/10 shadow-xl bg-gradient-to-br from-cyan-50 to-white dark:from-cyan-950/30 dark:to-black">
                            <ScrollAnimationWrapper variant="slideLeft" className="h-full">
                                <div className="p-8 h-full flex flex-col">
                                    <div className="w-12 h-12 rounded-2xl bg-cyan-500 text-white flex items-center justify-center mb-6 shadow-lg shadow-cyan-500/25">
                                        <Lightbulb className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4 font-heading group-hover:text-cyan-600 transition-colors">আমাদের ভিশন</h3>
                                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                        একটি জ্ঞানভিত্তিক সমাজ বিনির্মাণে নেতৃত্ব দেওয়া, যেখানে আমাদের শিক্ষার্থীরা সততা ও দক্ষতায় হবে অতুলনীয়। আমরা আগামীর স্বপ্নদ্রষ্টা তৈরি করতে চাই।
                                    </p>
                                </div>
                            </ScrollAnimationWrapper>
                        </div>

                    </div>
                </div>
            </section>

            {/* --- "Why It Matters" (The Soul) --- */}
            <section className="py-24 bg-white dark:bg-[#0B1120] relative overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-800 to-transparent"></div>
                <div className="max-w-7xl w-full px-4 mx-auto text-center">
                    <ScrollAnimationWrapper variant="fadeUp">
                        <div className="max-w-3xl mx-auto mb-16">
                            <h2 className="text-3xl md:text-5xl font-bold font-heading mb-6">আমাদের অঙ্গীকার</h2>
                            <p className="text-lg text-muted-foreground">আমরা বিশ্বাস করি, ভালো ফলাফল কেবল বই পড়ার মাধ্যমে আসে না, বরং সঠিক যত্ন এবং উৎসাহ থেকেই জন্ম নেয় সফলতা।</p>
                        </div>
                    </ScrollAnimationWrapper>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Heart,
                                title: 'নিবিড় যত্ন',
                                desc: 'আমরা বিশ্বাস করি প্রতিটি শিক্ষার্থী অনন্য। তাই আমরা তাদের শুধু ছাত্র হিসেবে নয়, বরং পরিবারের সদস্য হিসেবে বিবেচনা করি। আমাদের অভিজ্ঞ শিক্ষকমণ্ডলী প্রতিটি শিক্ষার্থীর দুর্বলতা খুঁজে বের করে তা সমাধানে ব্যক্তিগতভাবে সহায়তা করেন।'
                            },
                            {
                                icon: Star,
                                title: 'মানসম্মত শিক্ষা',
                                desc: 'আমাদের লক্ষ্য কেবল পাঠ্যবই শেষ করা নয়, বরং শিক্ষার প্রকৃত মান নিশ্চিত করা। সৃজনশীল পাঠদান পদ্ধতি এবং নিয়মিত মূল্যায়নের মাধ্যমে আমরা শিক্ষার্থীদের মেধার সর্বোচ্চ বিকাশ নিশ্চিত করি। এখানে শিক্ষার মানে কোনো আপোষ করা হয় না।'
                            },
                            {
                                icon: Globe,
                                title: 'আগামীর প্রস্তুতি',
                                desc: 'নূর স্টাডি কেয়ার শিক্ষার্থীদের কেবল বর্তমান ক্লাসের জন্য নয়, বরং ভবিষ্যতের ভর্তি পরীক্ষা ও কর্মজীবনের চ্যালেঞ্জ মোকাবিলার উপযোগী করে গড়ে তোলে। আমরা তাদের মধ্যে আত্মবিশ্বাস ও নেতৃত্বের গুণাবলী জাগিয়ে তুলি।'
                            },
                        ].map((item, i) => (
                            <ScrollAnimationWrapper key={i} variant="scaleUp" delay={i * 0.1} className="h-full">
                                <div className="flex flex-col items-center p-8 rounded-3xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 hover:border-primary-500/30 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 h-full relative overflow-hidden group">
                                    {/* Hover Gradient Background */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                    <div className="w-20 h-20 rounded-full bg-white dark:bg-gray-800 shadow-xl flex items-center justify-center mb-8 text-primary-600 dark:text-primary-400 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500 relative z-10 border border-gray-50 dark:border-gray-700">
                                        <item.icon className="w-10 h-10" strokeWidth={1.5} />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4 font-heading group-hover:text-primary-600 transition-colors relative z-10">{item.title}</h3>
                                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed relative z-10 text-base">
                                        {item.desc}
                                    </p>
                                </div>
                            </ScrollAnimationWrapper>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- CTA --- */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-primary-600">
                    <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-20"></div>
                </div>
                <div className="max-w-7xl w-full px-4 mx-auto relative z-10 text-center text-white">
                    <ScrollAnimationWrapper variant="fadeUp">
                        <h2 className="text-4xl md:text-6xl font-bold font-heading mb-8">শুরু হোক আপনার পথচলা</h2>
                        <Button size="lg" className="bg-white text-primary-700 hover:bg-gray-100 font-bold text-lg px-10 h-14 rounded-full shadow-2xl transition-transform hover:-translate-y-1" asChild>
                            <Link href="/contact">
                                আমাদের সাথে যুক্ত হোন <ArrowRight className="ml-2" />
                            </Link>
                        </Button>
                    </ScrollAnimationWrapper>
                </div>
            </section>
        </div>
    )
}
