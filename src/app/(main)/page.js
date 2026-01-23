import { Hero } from '@/components/home/Hero'
import { Features } from '@/components/home/Features'
import { CTA } from '@/components/home/CTA'
import FeaturedCourses from '@/components/home/FeaturedCourses'
import DirectorsNote from '@/components/home/DirectorsNote'
import Instructors from '@/components/home/Instructors'
import Testimonials from '@/components/home/Testimonials'
import { getSiteContent } from '@/services/siteContentService'
import { PromoCarousel } from '@/components/home/PromoCarousel'

export const metadata = {
  title: 'Home - Nur Study Care',
  description: 'Best coaching center for SSC, HSC, and Admission preparation.',
}

export default async function Home() {
  const content = await getSiteContent()

  return (
    <main className="min-h-screen">
      <Hero content={content.hero} />
      <PromoCarousel content={content.promoCarousel} />
      <Features content={content.features} />
      <FeaturedCourses content={content.featuredCourses} />
      <DirectorsNote content={content.directorsNote} />
      <Instructors content={content.instructors} />
      <Testimonials content={content.testimonials} />
      <CTA content={content.cta} />
    </main>
  )
}
