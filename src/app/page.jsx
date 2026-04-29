import AboutCompany from '@/components/Home/AboutCompany'
import ContactUs from '@/components/Home/ContactUs'
import Counter from '@/components/Home/Counter'
import Footer from '@/components/Home/Footer'
import Hero from '@/components/Home/Hero'
import Navbar from '@/components/Home/Navbar'
import ProductAndServices from '@/components/Home/ProductAndServices'
import ProductGallery from '@/components/Home/ProductGallery'
import WhyChooseUs from '@/components/Home/WhyChooseUs'
import React from 'react'

export const metadata = {
  title: "Ratnamik Metal India",
  description:
    "Ratnamik Metal is a leading manufacturer and supplier of stainless steel flanges, buttweld fittings, forged fittings, pipes, fasteners, and industrial metal products in Mumbai, India. High-quality materials with reliable performance for industrial applications.",
  
  keywords: [
    "stainless steel flanges India",
    "buttweld fittings manufacturer Mumbai",
    "forged fittings supplier India",
    "industrial pipes supplier Mumbai",
    "metal products manufacturer India",
    "SS flanges supplier Mumbai",
    "pipe fittings manufacturer India",
    "Ratnamik Metal India"
  ],

  metadataBase: new URL("https://www.ratnamikmetal.com"),

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "Ratnamik Metal India | Industrial Metal Products Manufacturer",
    description:
      "Explore high-quality stainless steel flanges, fittings, pipes, and industrial products from Ratnamik Metal, Mumbai.",
    url: "https://www.ratnamikmetal.com",
    siteName: "Ratnamik Metal",
    locale: "en_IN",
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
  },
};

function page() {
  return (
    <>
    <Navbar/>
    <Hero/>
    <AboutCompany/>
    <Counter/>
    <ProductAndServices/>
    <WhyChooseUs/>
    <ProductGallery/>
    <ContactUs/>
    <Footer/>
    </>
  )
}

export default page