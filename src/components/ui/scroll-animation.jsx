"use client"
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

export function ScrollAnimationWrapper({
    children,
    className,
    variant = "fadeUp",
    delay = 0,
    duration = 0.5,
    threshold = 0.1
}) {
    // Using declarative animation for better reliability
    const variants = {
        fadeUp: {
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0 }
        },
        fadeIn: {
            hidden: { opacity: 0 },
            visible: { opacity: 1 }
        },
        scaleUp: {
            hidden: { opacity: 0, scale: 0.8 },
            visible: { opacity: 1, scale: 1 }
        },
        slideRight: {
            hidden: { opacity: 0, x: -50 },
            visible: { opacity: 1, x: 0 }
        },
        slideLeft: {
            hidden: { opacity: 0, x: 50 },
            visible: { opacity: 1, x: 0 }
        },
        // Blur Reveal Variants
        blurIn: {
            hidden: { opacity: 0, filter: 'blur(10px)' },
            visible: { opacity: 1, filter: 'blur(0px)' }
        },
        blurSlideUp: {
            hidden: { opacity: 0, y: 50, filter: 'blur(10px)' },
            visible: { opacity: 1, y: 0, filter: 'blur(0px)' }
        },
        blurSlideRight: { // Comes from Left to Right
            hidden: { opacity: 0, x: -50, filter: 'blur(10px)' },
            visible: { opacity: 1, x: 0, filter: 'blur(0px)' }
        },
        blurSlideLeft: { // Comes from Right to Left
            hidden: { opacity: 0, x: 50, filter: 'blur(10px)' },
            visible: { opacity: 1, x: 0, filter: 'blur(0px)' }
        }
    }

    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: threshold, margin: "0px 0px -50px 0px" }}
            variants={variants[variant]}
            transition={{
                duration,
                delay,
                ease: [0.25, 0.46, 0.45, 0.94] // Smooth cubic-bezier
            }}
            className={cn(className)}
        >
            {children}
        </motion.div>
    )
}
