import React from 'react'
import Navbar from '@/components/Home/Navbar'
import Footer from '@/components/Home/Footer'
import Products from '@/components/products/Products'

export const metadata = {
  title: "Industrial Metal Products | Flanges, Fittings, Pipes Supplier in Mumbai - Ratnamik Metal",
  description:
    "Explore a wide range of industrial metal products including stainless steel flanges, buttweld fittings, forged fittings, pipes, fasteners, and more. Ratnamik Metal is a trusted supplier based in Mumbai, India.",
  
  keywords: [
    "industrial metal products India",
    "stainless steel flanges Mumbai",
    "buttweld fittings supplier India",
    "forged fittings Mumbai",
    "pipes supplier Mumbai India",
    "fasteners manufacturer India",
    "flanges fittings supplier Mumbai",
    "Ratnamik Metal products"
  ],

  metadataBase: new URL("https://www.ratnamikmetal.com"),

  alternates: {
    canonical: "/products",
  },

  openGraph: {
    title: "Industrial Metal Products | Ratnamik Metal",
    description:
      "Browse high-quality flanges, fittings, pipes, and industrial metal products from Ratnamik Metal, Mumbai.",
    url: "https://www.ratnamikmetal.com/products",
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
    <div>
        <Navbar/>
        <Products/>
        <Footer/>
    </div>
  )
}

export default page