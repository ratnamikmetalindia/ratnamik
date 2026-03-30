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