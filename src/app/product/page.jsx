import React from 'react'
import Product from '@/components/products/Product'
import Footer from '@/components/Home/Footer'
import Navbar from '@/components/Home/Navbar'

function page() {
  return (
    <div>
        <Navbar/>
        <Product/>
        <Footer/>
    </div>
  )
}

export default page