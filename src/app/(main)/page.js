'use client'

import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { BookOpen, Users, GraduationCap, CheckCircle } from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const isAuthenticated = status === 'authenticated'
  const user = session?.user

  const getDashboardPath = () => {
    if (!isAuthenticated || !user) return '/login'
    if (user.role === 'ADMIN') return '/admin/dashboard'
    if (user.role === 'TEACHER') return '/teacher/dashboard'
    return '/student/dashboard'
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <section className="container mx-auto max-w-7xl px-4 py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Welcome to <span className="text-blue-600">Nur Study Care</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Your trusted partner in academic excellence. Quality coaching for SSC, HSC, and Admission tests.
        </p>
        <div className="flex gap-4 justify-center">
          {isAuthenticated ? (
            <Button size="lg" onClick={() => router.push(getDashboardPath())}>
              Go to Dashboard
            </Button>
          ) : (
            <>
              <Button size="lg" onClick={() => router.push('/register')}>
                Get Started
              </Button>
              <Button size="lg" variant="outline" onClick={() => router.push('/login')}>
                Sign In
              </Button>
            </>
          )}
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex justify-center mb-4">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <GraduationCap className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-center">Expert Teachers</h3>
            <p className="text-gray-600 text-center">
              Learn from experienced and qualified teachers dedicated to your success.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex justify-center mb-4">
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-center">Quality Content</h3>
            <p className="text-gray-600 text-center">
              Comprehensive study materials and structured courses for all levels.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex justify-center mb-4">
              <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-center">Small Batches</h3>
            <p className="text-gray-600 text-center">
              Limited students per batch for personalized attention and better results.
            </p>
          </div>
        </div>
      </section>

      <footer className="border-t bg-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>© {new Date().getFullYear()} Nur Study Care. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
