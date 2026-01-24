import React from 'react'
import Link from 'next/link'
import ContactForm from '@/components/contact/ContactForm'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ScrollAnimationWrapper } from '@/components/ui/scroll-animation'
import { Phone, Mail, MapPin, Clock, Send, Facebook, Youtube, Globe, Users, User } from 'lucide-react'

export const metadata = {
    title: 'যোগাযোগ - নূর স্টাডি কেয়ার',
    description: 'আমাদের সাথে যোগাযোগ করুন। ঠিকানা, ফোন নম্বর এবং লোকেশন।',
}

export default function ContactPage() {
    return (
        <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-background">
            {/* --- Hero Section --- */}
            <section className="relative pt-20 md:pt-32 pb-20 overflow-hidden bg-white dark:bg-[#0B1120]">
                <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-50 dark:opacity-5"></div>
                <div className="max-w-7xl w-full px-4 mx-auto relative z-10 text-center">
                    <ScrollAnimationWrapper variant="fadeUp">
                        <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-900/20 backdrop-blur-sm">
                            <Mail className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                            <span className="text-sm font-bold tracking-wide text-blue-700 dark:text-blue-300 uppercase">২৪/৭ সাপোর্ট</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6 text-gray-900 dark:text-white">
                            আমাদের সাথে <span className="text-primary-600">যোগাযোগ</span> করুন
                        </h1>
                        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
                            যেকোনো প্রয়োজনে আমাদের সাথে কথা বলুন। আমরা আপনার অপেক্ষায় আছি।
                        </p>
                    </ScrollAnimationWrapper>
                </div>
            </section>

            {/* --- Info & Form Grid --- */}
            <section className="py-12 md:py-20">
                <div className="max-w-7xl w-full px-4 mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">

                        {/* Left: Contact Info */}
                        <div className="space-y-10">
                            <ScrollAnimationWrapper variant="slideRight">
                                <h2 className="text-3xl font-bold font-heading mb-8">ঠিকানা ও সময়সূচী</h2>

                                <div className="space-y-8">
                                    {/* Item 1: Address */}
                                    <div className="flex gap-6 group">
                                        <div className="w-14 h-14 rounded-2xl bg-primary-50 dark:bg-primary-900/20 text-primary-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                                            <MapPin className="w-7 h-7" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold mb-2">প্রতিষ্ঠান</h3>
                                            <p className="text-muted-foreground leading-relaxed">
                                                নূর স্টাডি কেয়ার<br />
                                                উপজেলা নিউ গেটের দক্ষিণ পার্শ্বে,<br />
                                                মাস্টার পাড়া রোড সংলগ্ন, সাপাহার, নওগাঁ।
                                            </p>
                                        </div>
                                    </div>

                                    {/* Item 2: Phone */}
                                    <div className="flex gap-6 group">
                                        <div className="w-14 h-14 rounded-2xl bg-green-50 dark:bg-green-900/20 text-green-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                                            <Phone className="w-7 h-7" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold mb-2">ফোন নম্বর</h3>
                                            <p className="text-muted-foreground mb-1">01954214561, 01796085091</p>
                                            <p className="text-sm text-gray-400">সকাল ১০টা - রাত ৮টা</p>
                                        </div>
                                    </div>

                                    {/* Item 3: Email */}
                                    <div className="flex gap-6 group">
                                        <div className="w-14 h-14 rounded-2xl bg-orange-50 dark:bg-orange-900/20 text-orange-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                                            <Mail className="w-7 h-7" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold mb-2">ইমেইল</h3>
                                            <p className="text-muted-foreground">contact@nurstudycare.com</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Social Links */}
                                <div className="pt-10 border-t border-gray-200 dark:border-gray-800 mt-10">
                                    <h3 className="text-lg font-semibold mb-6">সোশ্যাল মিডিয়া</h3>
                                    <div className="flex gap-4 flex-wrap">
                                        {/* Page */}
                                        <Link href="https://www.facebook.com/profile.php?id=61559545551239" target="_blank" title="আমাদের পেজ" className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20">
                                            <Facebook className="w-6 h-6" />
                                        </Link>
                                        {/* Group */}
                                        <Link href="https://www.facebook.com/groups/1220500699358757" target="_blank" title="আমাদের গ্রুপ" className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-600/20">
                                            <Users className="w-6 h-6" />
                                        </Link>
                                        {/* Director */}
                                        <Link href="https://www.facebook.com/profile.php?id=100082759065197" target="_blank" title="পরিচালক" className="w-12 h-12 rounded-full bg-cyan-600 text-white flex items-center justify-center hover:bg-cyan-700 transition-colors shadow-lg shadow-cyan-600/20">
                                            <User className="w-6 h-6" />
                                        </Link>
                                        {/* YouTube */}
                                        <Link href="https://www.youtube.com/@nurstudycare" target="_blank" title="ইউটিউব চ্যানেল" className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center hover:bg-red-700 transition-colors shadow-lg shadow-red-600/20">
                                            <Youtube className="w-6 h-6" />
                                        </Link>
                                    </div>
                                </div>
                            </ScrollAnimationWrapper>
                        </div>

                        {/* Right: Contact Form */}
                        <div className="h-full">
                            <ContactForm />
                        </div>
                    </div>
                </div>
            </section>

            {/* --- Map Section --- */}
            <section className="h-[300px] md:h-[500px] w-full bg-gray-200 dark:bg-gray-800 relative z-0">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14436.42582845232!2d88.5756385!3d25.1264858!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fc93b6e7d6b3b5%3A0x6d9f3b3b3b3b3b3b!2sSapahar%2C%20Naogaon!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd"
                    className="w-full h-full border-0"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </section>
        </div>
    )
}
