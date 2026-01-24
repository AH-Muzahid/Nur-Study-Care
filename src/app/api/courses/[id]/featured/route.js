import { NextResponse } from 'next/server'
import { courseService } from '@/services/courseService'
import { getSession } from '@/lib/auth-helpers'
import { UserRole } from '@/constants/roles'

export async function PATCH(request, { params }) {
    try {
        const session = await getSession()

        if (!session || session.role !== UserRole.ADMIN) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            )
        }

        const { id } = await params
        const course = await courseService.toggleFeatured(id)

        return NextResponse.json({
            message: 'Featured status updated successfully',
            course: JSON.parse(JSON.stringify(course))
        })
    } catch (error) {
        console.error('Toggle featured error:', error)
        return NextResponse.json(
            { error: error.message },
            { status: error.message.includes('Maximum') ? 400 : 500 }
        )
    }
}
