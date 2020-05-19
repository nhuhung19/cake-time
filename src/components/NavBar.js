import React from 'react'
import {useEffect, useState} from "react"
import { Link} from 'react-router-dom'
export default function NavBar() {
  let [background, setBackground] = useState('nav-bar')

    const onScroll = () => {
        const backgroundcolor = window.scrollY < 100 ? "nav-bar" : "nav-bar-scroll";
            setBackground(backgroundcolor);
    }
    useEffect(() => {
      document.addEventListener("scroll", onScroll)
    }, [])
  return (
    <nav class={`navbar fixed-top ${background}`} >
      <div className="container">
        <a class="">CAKE TIME</a>
        <form class="form-inline">
          <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
          <button class={`btn btn-outline-light my-2 my-sm-0 ${background}`} type="submit">Search</button>
          <span className="ml-3"><i style={{fontSize: "22px"}} class="fas fa-cart-plus"></i></span>
          <Link class={`${background} ml-2`} style={{textDecoration: "none"}} to="/login">Login</Link>
        </form>
      </div>
    </nav>
  )
}
