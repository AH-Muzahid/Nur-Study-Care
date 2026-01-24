import React from 'react'
import { cn } from "@/lib/utils"
import Image from 'next/image'
import Marquee from "@/components/magicui/marquee"
import { ScrollAnimationWrapper } from '@/components/ui/scroll-animation'

const reviews = [
    {
        name: "Jack",
        username: "@jack",
        body: "I've never seen anything like this before. It's amazing. I love it.",
        img: "https://avatar.vercel.sh/jack",
    },
    {
        name: "Jill",
        username: "@jill",
        body: "I don't know what to say. I'm speechless. This is amazing.",
        img: "https://avatar.vercel.sh/jill",
    },
    {
        name: "John",
        username: "@john",
        body: "I'm at a loss for words. This is amazing. I love it.",
        img: "https://avatar.vercel.sh/john",
    },
    {
        name: "Jane",
        username: "@jane",
        body: "I'm at a loss for words. This is amazing. I love it.",
        img: "https://avatar.vercel.sh/jane",
    },
    {
        name: "Jenny",
        username: "@jenny",
        body: "I'm at a loss for words. This is amazing. I love it.",
        img: "https://avatar.vercel.sh/jenny",
    },
    {
        name: "James",
        username: "@james",
        body: "I'm at a loss for words. This is amazing. I love it.",
        img: "https://avatar.vercel.sh/james",
    },
]

const ReviewCard = ({ img, name, username, body }) => {
    return (
        <figure
            className={cn(
                "relative h-40 w-72 md:w-80 cursor-pointer overflow-hidden rounded-xl border p-4 mx-2", // width adjusted for mobile
                // light styles
                "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
                // dark styles
                "dark:border-white/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
            )}
        >
            <div className="flex flex-row items-center gap-2">
                <Image className="rounded-full" width={32} height={32} alt={name || "User"} src={img} unoptimized />
                <div className="flex flex-col">
                    <figcaption className="text-sm font-medium font-heading dark:text-white">
                        {name}
                    </figcaption>
                    <p className="text-xs font-medium text-gray-500 dark:text-white/40">{username}</p>
                </div>
            </div>
            <blockquote className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300">{body}</blockquote>
        </figure>
    )
}

export default function Testimonials({ content }) {
    // Prepare rows. Use content.items if available and map them, else use default reviews.
    // Mapping content items to ReviewCard format:
    const data = content?.items?.length > 0 ? content.items.map((item, idx) => ({
        name: item.name,
        username: item.role || "@student",
        body: item.message,
        img: `https://avatar.vercel.sh/${item.name?.replace(/\s/g, '') || 'user'}`
    })) : reviews;

    const firstRow = data.slice(0, Math.ceil(data.length / 2));
    const secondRow = data.slice(Math.ceil(data.length / 2));

    // Ensure we have enough items to scroll smoothly? If data is small, duplication handled by Marquee repeat prop usually.

    return (
        <section className="py-10 bg-primary/5 dark:bg-background overflow-hidden relative">
            <div className="max-w-7xl w-full px-4 mx-auto md:mb-10 mb-5">
                <ScrollAnimationWrapper variant="fadeUp">
                    <div className="text-center max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold tracking-tight mb-4 font-heading">{content?.title || "Testimonials"}</h2>
                        <p className="text-muted-foreground text-lg">{content?.description || "What our students say about us."}</p>
                    </div>
                </ScrollAnimationWrapper>
            </div>

            <div className="relative flex h-[280px] md:h-[500px] w-full flex-col items-center justify-center overflow-hidden bg-background md:shadow-xl">
                <Marquee pauseOnHover className="[--duration:20s]">
                    {firstRow.map((review, idx) => (
                        <ReviewCard key={review.username + idx} {...review} />
                    ))}
                </Marquee>
                <Marquee reverse pauseOnHover className="[--duration:15s] mt-2 hidden md:flex">
                    {secondRow.map((review, idx) => (
                        <ReviewCard key={review.username + idx} {...review} />
                    ))}
                </Marquee>

                {/* Gradient Filters - Hidden on Mobile */}
                <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-[#0B1120] hidden md:block"></div>
                <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-[#0B1120] hidden md:block"></div>
            </div>
        </section>
    )
}
