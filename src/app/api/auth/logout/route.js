import { NextResponse } from 'next/server'
import { removeSession } from '@/lib/auth-helpers'

export async function POST() {
    await removeSession()

    return NextResponse.json({
        success: true,
        message: 'Logged out successfully'
    })
}
