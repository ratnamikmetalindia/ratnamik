import React from 'react'
import Navbar from '@/components/Home/Navbar'
import Footer from '@/components/Home/Footer'
import Products from '@/components/products/Products'

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