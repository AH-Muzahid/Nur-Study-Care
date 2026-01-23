import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongoose'
import User from '@/models/User'
import { verifyAuthToken, checkRole } from '@/lib/auth/jwt-verify'
import { UserRole } from '@/constants/roles'
import { forbiddenError, successResponse, handleApiError } from '@/lib/api-response'

/**
 * GET /api/admin/users - Search users for profile creation
 * Only Admin can access
 */
export async function GET(request) {
    try {
        const decoded = await verifyAuthToken(request)
        if (!checkRole(decoded.role, [UserRole.ADMIN])) {
            return forbiddenError('Admin access required')
        }

        const { searchParams } = new URL(request.url)
        const role = searchParams.get('role')
        const search = searchParams.get('search') || ''

        await connectDB()

        const query = {}
        if (role) query.role = role
        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } }
            ]
        }

        const users = await User.find(query)
            .select('name email role avatar phone')
            .limit(10)

        return successResponse(users)
    } catch (error) {
        return handleApiError(error)
    }
}
