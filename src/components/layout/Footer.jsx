import Link from 'next/link'
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react'

export function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="bg-[#0a0826] text-gray-300 mt-auto border-t border-white/10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Main Footer Content */}
                <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* About Section */}
                    <div className="space-y-4">
                        <h3 className="text-white text-lg font-semibold">Nur Study Care</h3>
                        <p className="text-sm text-gray-400">
                            স্বপ্ন ছোঁয়ার এই পথে, NSC আছে তোমার সাথে...
                        </p>
                        <div className="flex space-x-4">
                            <Link href="#" className="hover:text-blue-400 transition-colors">
                                <Facebook className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="hover:text-blue-400 transition-colors">
                                <Twitter className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="hover:text-pink-400 transition-colors">
                                <Instagram className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="hover:text-red-400 transition-colors">
                                <Youtube className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h3 className="text-white text-lg font-semibold">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/" className="hover:text-white transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/courses" className="hover:text-white transition-colors">
                                    Courses
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="hover:text-white transition-colors">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="hover:text-white transition-colors">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Courses */}
                    <div className="space-y-4">
                        <h3 className="text-white text-lg font-semibold">Popular Courses</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/courses" className="hover:text-white transition-colors">
                                    HSC Physics
                                </Link>
                            </li>
                            <li>
                                <Link href="/courses" className="hover:text-white transition-colors">
                                    HSC Chemistry
                                </Link>
                            </li>
                            <li>
                                <Link href="/courses" className="hover:text-white transition-colors">
                                    HSC Mathematics
                                </Link>
                            </li>
                            <li>
                                <Link href="/courses" className="hover:text-white transition-colors">
                                    Admission Preparation
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-4">
                        <h3 className="text-white text-lg font-semibold">Contact Us</h3>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-start space-x-3">
                                <MapPin className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                                <span>123 Education Street, Dhaka-1205, Bangladesh</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Phone className="h-5 w-5 text-blue-400 flex-shrink-0" />
                                <span>+880 1234-567890</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Mail className="h-5 w-5 text-blue-400 flex-shrink-0" />
                                <span>info@nurstudycare.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <p className="text-sm text-gray-400">
                            © {currentYear} Nur Study Care. All rights reserved.
                        </p>
                        <div className="flex space-x-6 text-sm">
                            <Link href="/privacy" className="hover:text-white transition-colors">
                                Privacy Policy
                            </Link>
                            <Link href="/terms" className="hover:text-white transition-colors">
                                Terms of Service
                            </Link>
                            <Link href="/refund" className="hover:text-white transition-colors">
                                Refund Policy
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
