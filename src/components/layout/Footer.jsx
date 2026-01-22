export function Footer() {
    return (
        <footer className="border-t bg-white py-6 mt-auto">
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                    <p className="text-sm text-gray-600">
                        © {new Date().getFullYear()} Nur Study Care. All rights reserved.
                    </p>
                    <div className="flex gap-4">
                        <a href="#" className="text-sm text-gray-600 hover:text-blue-600">
                            Privacy Policy
                        </a>
                        <a href="#" className="text-sm text-gray-600 hover:text-blue-600">
                            Terms of Service
                        </a>
                        <a href="#" className="text-sm text-gray-600 hover:text-blue-600">
                            Contact
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )
}
