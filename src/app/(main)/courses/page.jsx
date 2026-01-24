import { courseService } from '@/services/courseService'
import { CourseCard } from '@/components/courses/CourseCard'
import { CourseFilters } from '@/components/courses/CourseFilters'
import { CourseStatus } from '@/constants/roles'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { ScrollAnimationWrapper } from '@/components/ui/scroll-animation'

export const metadata = {
    title: 'All Courses - Nur Study Care',
    description: 'Browse our comprehensive list of academic and admission courses.',
}

export default async function CoursesPage({ searchParams }) {
    // Await searchParams for Next.js 15+ compatibility
    const params = await searchParams;

    const page = parseInt(params.page || '1')
    const limit = 9
    const search = params.search || ''
    const level = (params.level && params.level !== 'all') ? params.level : ''
    const subject = (params.subject && params.subject !== 'all') ? params.subject : ''

    const filters = {
        status: CourseStatus.ACTIVE,
        ...(search && { search }),
        ...(level && { level }),
        ...(subject && { subject })
    }

    let courses = []
    let pagination = { page: 1, limit: 9, total: 0, pages: 1 }

    try {
        const result = await courseService.listCourses(filters, { page, limit })
        courses = result.courses
        pagination = result.pagination
    } catch (error) {
        console.error('Failed to fetch courses:', error)
        // We can render a fallback UI here or just specific error message
        // For now, let's allow the page to render with empty courses and show the "No courses found" state
    }

    // Serialize Mongoose documents to plain objects for client components
    // Only parse if we have valid data, otherwise use defaults
    const serializedCourses = courses ? JSON.parse(JSON.stringify(courses)) : []
    const serializedPagination = pagination ? JSON.parse(JSON.stringify(pagination)) : { page: 1, pages: 1 }

    return (
        <div className="max-w-7xl w-full mx-auto px-4 py-8 min-h-screen">
            <ScrollAnimationWrapper variant="fadeUp">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold font-heading mb-2">Explore Our Courses</h1>
                    <p className="text-muted-foreground">Find the perfect course to achieve your academic goals.</p>
                </div>
            </ScrollAnimationWrapper>

            <ScrollAnimationWrapper variant="fadeUp" delay={0.1}>
                <CourseFilters />
            </ScrollAnimationWrapper>

            {serializedCourses.length > 0 ? (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        {serializedCourses.map((course, index) => (
                            <ScrollAnimationWrapper
                                key={course._id}
                                variant="blurSlideUp"
                                delay={index * 0.05} // Faster stagger for list
                                className="h-full"
                            >
                                <CourseCard course={course} />
                            </ScrollAnimationWrapper>
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-center items-center gap-4 mt-8">
                        {page > 1 ? (
                            <Button variant="outline" asChild>
                                <Link href={{ query: { ...params, page: page - 1 } }}>
                                    <ChevronLeft className="w-4 h-4 mr-2" /> Previous
                                </Link>
                            </Button>
                        ) : (
                            <Button variant="outline" disabled>
                                <ChevronLeft className="w-4 h-4 mr-2" /> Previous
                            </Button>
                        )}

                        <span className="text-sm font-medium">
                            Page {serializedPagination.page} of {serializedPagination.pages}
                        </span>

                        {page < serializedPagination.pages ? (
                            <Button variant="outline" asChild>
                                <Link href={{ query: { ...params, page: page + 1 } }}>
                                    Next <ChevronRight className="w-4 h-4 ml-2" />
                                </Link>
                            </Button>
                        ) : (
                            <Button variant="outline" disabled>
                                Next <ChevronRight className="w-4 h-4 ml-2" />
                            </Button>
                        )}
                    </div>
                </>
            ) : (
                <div className="text-center py-20 bg-muted/20 rounded-lg border border-dashed text-muted-foreground">
                    <h3 className="text-xl font-medium mb-2">No courses found</h3>
                    <p>Try adjusting your search or filters.</p>
                </div>
            )}
        </div>
    )
}
