import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongoose'
import SiteContent from '@/models/SiteContent'
import { UserRole } from '@/constants/roles'

// GET: Fetch all site content (Public)
export async function GET() {
    try {
        await connectDB()
        const content = await SiteContent.find({})

        // Convert array to object for easier access { sectionName: contentObject }
        const formattedContent = content.reduce((acc, item) => {
            acc[item.section] = item.content
            return acc
        }, {})

        return NextResponse.json(formattedContent)
    } catch (error) {
        console.error('Error fetching site content:', error)
        return NextResponse.json({ error: 'Failed to fetch content' }, { status: 500 })
    }
}

// POST: Update site content (Admin only)
export async function POST(req) {
    try {
        const userRole = req.headers.get('x-user-role')
        const userId = req.headers.get('x-user-id')

        if (userRole !== UserRole.ADMIN) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const body = await req.json()
        const { section, content } = body

        if (!section || !content) {
            return NextResponse.json({ error: 'Section and content are required' }, { status: 400 })
        }

        await connectDB()

        const updatedContent = await SiteContent.findOneAndUpdate(
            { section },
            {
                content,
                lastUpdatedBy: userId
            },
            { upsert: true, new: true }
        )

        return NextResponse.json(updatedContent)
    } catch (error) {
        console.error('Error updating site content:', error)
        return NextResponse.json({ error: 'Failed to update content' }, { status: 500 })
    }
}
