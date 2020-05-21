import React from 'react'
import Banner from '../components/Banner'
import Promotions from '../components/Promotions'
import Products from '../components/Products'
import Footer from '../components/Footer'

export default function LandingPage() {
  return (
    <div>
      <Banner />
      <Products />
      <Promotions />
      <Footer />
    </div>
  )
}
