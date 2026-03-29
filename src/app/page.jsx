import AboutCompany from '@/components/Home/AboutCompany'
import Counter from '@/components/Home/Counter'
import Hero from '@/components/Home/Hero'
import Navbar from '@/components/Home/Navbar'
import React from 'react'

function page() {
  return (
    <>
    <Navbar/>
    <Hero/>
    <AboutCompany/>
    <Counter/>
    </>
  )
}

export default page