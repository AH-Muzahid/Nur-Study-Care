'use client'

import { useState } from 'react'
import { Sidebar } from './Sidebar'
import { DashboardHeader } from './DashboardHeader'
import { DashboardFooter } from './DashboardFooter'

export function DashboardLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    return (
        <div className="flex min-h-screen bg-gray-50/50 dark:bg-gray-900/50">
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <div className="flex flex-1 flex-col transition-all duration-300 ease-in-out">
                <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />

                <main className="flex-1 p-4 lg:p-6 overflow-y-auto">
                    <div className="mx-auto max-w-7xl space-y-4">
                        {children}
                    </div>
                </main>

                <DashboardFooter />
            </div>
        </div>
    )
}
