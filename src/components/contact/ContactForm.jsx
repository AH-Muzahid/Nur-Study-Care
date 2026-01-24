'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Send } from 'lucide-react'
import { ScrollAnimationWrapper } from '@/components/ui/scroll-animation'

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        message: ''
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const { name, phone, message } = formData

        // Construct WhatsApp Message
        const text = `*New Inquiry from Website*%0A%0A*Name:* ${name}%0A*Phone:* ${phone}%0A*Message:* ${message}`

        // Phone Number: Using the specific WhatsApp number provided
        const recipientNumber = '8801724982725'

        const whatsappUrl = `https://wa.me/${recipientNumber}?text=${text}`

        window.open(whatsappUrl, '_blank')
    }

    return (
        <div className="bg-white dark:bg-gray-900 p-8 md:p-10 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800 relative overflow-hidden h-full">
            <ScrollAnimationWrapper variant="slideLeft" className="h-full">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/10 rounded-full blur-3xl -z-0 translate-x-1/2 -translate-y-1/2"></div>

                <h2 className="text-2xl font-bold font-heading mb-8 relative z-10">মেসেজ পাঠান</h2>
                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">আপনার নাম</label>
                        <Input
                            name="name"
                            required
                            placeholder="আপনার নাম লিখুন"
                            className="bg-gray-50 dark:bg-gray-800 h-12 rounded-xl"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">মোবাইল নম্বর</label>
                        <Input
                            name="phone"
                            required
                            placeholder="017XXXXXXXX"
                            className="bg-gray-50 dark:bg-gray-800 h-12 rounded-xl"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">আপনার বার্তা</label>
                        <Textarea
                            name="message"
                            required
                            placeholder="কি জানতে চান বিস্তারিত লিখুন..."
                            className="bg-gray-50 dark:bg-gray-800 min-h-[140px] rounded-xl resize-none"
                            value={formData.message}
                            onChange={handleChange}
                        />
                    </div>
                    <Button type="submit" size="lg" className="w-full h-12 text-lg font-bold rounded-xl mt-4 bg-green-600 hover:bg-green-700 text-white">
                        <Send className="w-5 h-5 mr-2" /> হোয়াটসঅ্যাপে পাঠান
                    </Button>
                </form>
            </ScrollAnimationWrapper>
        </div>
    )
}
