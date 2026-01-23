import Link from 'next/link'

export function DashboardFooter() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="mt-auto border-t bg-white py-6 dark:bg-gray-950">
            <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-4 px-6 md:flex-row text-sm text-gray-500">
                <p>© {currentYear} Nur Study Care. All rights reserved.</p>
                <div className="flex gap-4">
                    <Link href="/privacy" className="hover:text-gray-900 dark:hover:text-gray-100">
                        Privacy Policy
                    </Link>
                    <Link href="/terms" className="hover:text-gray-900 dark:hover:text-gray-100">
                        Terms of Service
                    </Link>
                    <Link href="/help" className="hover:text-gray-900 dark:hover:text-gray-100">
                        Help Center
                    </Link>
                </div>
            </div>
        </footer>
    )
}
