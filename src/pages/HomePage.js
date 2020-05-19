import React from 'react'
import NavBar from "../components/NavBar"
import Banner from "../components/Banner"
import Promotions from "../components/Promotions"
import Products from "../components/Products"
import Footer from "../components/Footer"

export default function HomePage() {
  return (
    <div>
      <NavBar />
      <Banner />
      <Products />
      <Promotions />
      <Footer />
    </div>
  )
}
