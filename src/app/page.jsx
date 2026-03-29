import AboutCompany from '@/components/Home/AboutCompany'
import Counter from '@/components/Home/Counter'
import Hero from '@/components/Home/Hero'
import Navbar from '@/components/Home/Navbar'
import ProductAndServices from '@/components/Home/ProductAndServices'
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
    </>
  )
}

export default page