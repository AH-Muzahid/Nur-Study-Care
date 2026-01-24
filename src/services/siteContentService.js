import connectDB from '@/lib/mongoose'
import SiteContent from '@/models/SiteContent'

const defaultContent = {
    hero: {
        badge: "Admission Going On - HSC 2026 Batch",
        title: "Unlock Your Potential with",
        titleHighlight: "Nur Study Care",
        description: "Join the most trusted coaching platform for SSC, HSC, and Admission preparation. Expert teachers, personalized care, and proven results.",
        stats: [
            { value: "500+", label: "Students Enrolled" },
            { value: "50+", label: "Video Courses" },
            { value: "20+", label: "Expert Teachers" },
            { value: "100%", label: "Success Rate" }
        ]
    },
    promoCarousel: {
        slides: [
            {
                id: 1,
                title: "ADMISSION 2026",
                subtitle: "HSC Batch",
                description: "Secure your seat in the most prestigious coaching center.",
                gradient: "bg-gradient-to-r from-violet-600 to-indigo-600",
                image: "/images/slider/1.png",
                link: "/courses/hsc-2026",
                badge: "New Batch",
                buttonText: "LEARN MORE"
            },
            {
                id: 2,
                title: "MODEL TEST",
                subtitle: "Sharpen Skills",
                description: "Join our rigorous mock test series to guarantee your A+.",
                gradient: "bg-gradient-to-r from-emerald-500 to-teal-900",
                image: "/images/slider/2.png",
                link: "/courses/model-test-2025",
                badge: "Exam Special",
                buttonText: "LEARN MORE"
            },
            {
                id: 3,
                title: "SMART CLASS",
                subtitle: "Learn Future",
                description: "Experience the future of education with smart panels.",
                gradient: "bg-gradient-to-r from-orange-500 to-red-600",
                image: "/images/slider/3.png",
                link: "/about",
                badge: "Technology",
                buttonText: "LEARN MORE"
            },
            {
                id: 4,
                title: "SCHOLARSHIP",
                subtitle: "Merit Based",
                description: "Get up to 100% scholarship based on your results.",
                gradient: "bg-gradient-to-r from-pink-500 to-rose-600",
                image: "/images/slider/4.png",
                link: "/scholarship",
                badge: "Financial Aid",
                buttonText: "LEARN MORE"
            }
        ]
    },
    features: {
        title: "Why Choose Nur Study Care?",
        description: "We provide a holistic learning environment that combines traditional values with modern teaching methodologies.",
        items: [
            {
                title: "Expert Faculty",
                description: "Learn from top-tier teachers from BUET, DU, and DMC who are passionate about teaching.",
                icon: "Users",
                color: "text-blue-600 bg-blue-100 dark:bg-blue-900/30"
            },
            {
                title: "Comprehensive Material",
                description: "Access high-quality lecture sheets, notes, and question banks tailored for exams.",
                icon: "BookOpen",
                color: "text-purple-600 bg-purple-100 dark:bg-purple-900/30"
            },
            {
                title: "Live & Recorded Classes",
                description: "Join interactive live sessions or watch high-definition recorded classes anytime.",
                icon: "Video",
                color: "text-red-600 bg-red-100 dark:bg-red-900/30"
            },
            {
                title: "Exam-Based Approach",
                description: "Regular quizzes, model tests, and solve classes to ensure you are exam-ready.",
                icon: "Clock",
                color: "text-green-600 bg-green-100 dark:bg-green-900/30"
            },
            {
                title: "Personal Mentorship",
                description: "One-on-one guidance to solve your doubts and track your academic progress.",
                icon: "Award",
                color: "text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30"
            },
            {
                title: "Proven Track Record",
                description: "Consistently producing top rankers in board and admission exams every year.",
                icon: "ShieldCheck",
                color: "text-indigo-600 bg-indigo-100 dark:bg-indigo-900/30"
            }
        ]
    },
    cta: {
        title: "Ready to Start Your Journey?",
        description: "Join thousands of successful students who achieved their dreams with us. Enroll today and take the first step towards excellence.",
        primaryBtn: "Enroll Now",
        secondaryBtn: "Contact Us"
    },
    featuredCourses: {
        title: "Our Featured Courses",
        description: "Choose the best program for your academic goal.",
        items: [
            {
                _id: "mock-1",
                title: "HSC 2026 Academic Care",
                description: "Complete preparation for Physics, Chemistry, Math & Biology. Master the syllabus with expert guidance.",
                fee: 15000,
                duration: "12",
                subject: "Academic",
                discount: 10,
                features: ["Daily Live Classes", "Chapter-wise Exams", "Solve Classes", "Printed Lecture Sheets"],
                thumbnail: null,
                rating: 4.9,
                reviewCount: 342
            },
            {
                _id: "mock-2",
                title: "Engineering Admission",
                description: "Intensive care for BUET, CKRuET and other engineering universities. Crack the toughest exams.",
                fee: 18000,
                duration: "6",
                subject: "Engineering",
                discount: 15,
                features: ["BUET Question Solve", "Concept Building", "Weekly Model Tests", "Engineering Question Bank"],
                thumbnail: null,
                rating: 5.0,
                reviewCount: 850
            },
            {
                _id: "mock-3",
                title: "Medical Admission",
                description: "Specialized program for DMC and other medical college aspirants. Your journey to becoming a doctor starts here.",
                fee: 16000,
                duration: "5",
                subject: "Medical",
                discount: 5,
                features: ["GK & English Classes", "Daily Bio-Practice", "Medical Question Bank", "GKE Special Care"],
                thumbnail: null,
                rating: 4.8,
                reviewCount: 620
            }
        ]
    },
    directorsNote: {
        title: "Director's Note",
        content: "Welcome to Nur Study Care, where we believe in nurturing talent and guiding students towards their academic dreams. Our comprehensive approach ensures that every student receives the care and attention they need to succeed.",
        image: "/images/nur.png",
        name: "Md. Abdun Nur",
        designation: "Founder & Director"
    },
    instructors: {
        title: "Meet Our Expert Instructors",
        description: "Learn from the best minds in the country, dedicated to your success.",
        items: [
            {
                name: "Engr. Abrar Fahad",
                subject: "Physics",
                institution: "BUET",
                image: "/images/instructor1.jpg"
            },
            {
                name: "Dr. Sumaiya Khan",
                subject: "Biology",
                institution: "DMC",
                image: "/images/instructor2.jpg"
            },
            {
                name: "Tanvir Ahmed",
                subject: "Math",
                institution: "DU",
                image: "/images/instructor3.jpg"
            }
        ]
    },
    testimonials: {
        title: "What Our Students Say",
        description: "Hear from our successful alumni who have achieved their goals with us.",
        items: [
            {
                name: "Sarah Ahmed",
                role: "DMC, Batch 2023",
                message: "Nur Study Care helped me achieve my dream of getting into Dhaka Medical College. The mentorship was outstanding.",
                image: "/images/student1.jpg"
            },
            {
                name: "Rafiqul Islam",
                role: "BUET, Batch 2022",
                message: "The engineering admission program is top-notch. The rigorous exams and solve classes were game-changers.",
                image: "/images/student2.jpg"
            }
        ]
    }
}

export async function getSiteContent() {
    let contentDocs = []
    try {
        await connectDB()
        contentDocs = await SiteContent.find({})
    } catch (error) {
        console.error("Failed to fetch site content, using defaults:", error.message)
        // Continue with empty contentDocs to serve default content
    }

    // If no content in DB, return defaults (and maybe seed them?)
    // For now, let's just merge defaults with DB content
    const dbContent = contentDocs.reduce((acc, doc) => {
        acc[doc.section] = doc.content
        return acc
    }, {})

    // Fetch real featured courses from database
    let featuredCoursesContent = dbContent.featuredCourses || defaultContent.featuredCourses

    try {
        const { courseService } = await import('@/services/courseService')
        const featuredCourses = await courseService.getFeaturedCourses()

        if (featuredCourses && featuredCourses.length > 0) {
            // Use real featured courses
            featuredCoursesContent = {
                title: dbContent.featuredCourses?.title || defaultContent.featuredCourses.title,
                description: dbContent.featuredCourses?.description || defaultContent.featuredCourses.description,
                items: featuredCourses.map(course => ({
                    _id: course._id,
                    title: course.title,
                    description: course.description,
                    fee: course.fee,
                    duration: course.duration,
                    subject: course.subject,
                    thumbnail: course.thumbnail,
                    batches: course.batches,
                    level: course.level,
                }))
            }
        }
    } catch (error) {
        console.error("Failed to fetch featured courses:", error.message)
        // Fall back to default/DB content
    }

    return {
        hero: dbContent.hero || defaultContent.hero,
        features: dbContent.features || defaultContent.features,
        cta: dbContent.cta || defaultContent.cta,
        featuredCourses: featuredCoursesContent,
        directorsNote: dbContent.directorsNote || defaultContent.directorsNote,
        instructors: dbContent.instructors || defaultContent.instructors,
        testimonials: dbContent.testimonials || defaultContent.testimonials,
        promoCarousel: dbContent.promoCarousel || defaultContent.promoCarousel
    }
}
