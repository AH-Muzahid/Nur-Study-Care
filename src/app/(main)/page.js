import { Hero } from '@/components/home/Hero'
import { Features } from '@/components/home/Features'
import { CTA } from '@/components/home/CTA'
import FeaturedCourses from '@/components/home/FeaturedCourses'
import DirectorsNote from '@/components/home/DirectorsNote'
// import Instructors from '@/components/home/Instructors'
import Testimonials from '@/components/home/Testimonials'
import { getSiteContent } from '@/services/siteContentService'
import { PromoCarousel } from '@/components/home/PromoCarousel'

export const metadata = {
  title: 'Home - Nur Study Care',
  description: 'Best coaching center for SSC, HSC, and Admission preparation.',
}

export default async function Home() {
  const content = await getSiteContent()

  // Serialize Mongoose documents to plain objects for client components
  const serializedContent = JSON.parse(JSON.stringify(content))

  return (
    <main className="min-h-screen">
      <Hero content={serializedContent.hero} />
      <PromoCarousel content={serializedContent.promoCarousel} />
      <FeaturedCourses content={serializedContent.featuredCourses} />
      <Features content={serializedContent.features} />
      <DirectorsNote content={serializedContent.directorsNote} />
      {/* <Instructors content={serializedContent.instructors} /> */}
      <Testimonials content={serializedContent.testimonials} />
      <CTA content={serializedContent.cta} />
    </main>
  )
}
