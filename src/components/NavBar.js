import React from 'react'
import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'
export default function NavBar(props) {
  let [background, setBackground] = useState('nav-bar')

  const onScroll = () => {
    const backgroundcolor = window.scrollY < 100 ? "nav-bar" : "nav-bar-scroll";
    setBackground(backgroundcolor);
  }
  useEffect(() => {
    document.addEventListener("scroll", onScroll)
  }, [])

  async function logout() {
    const res = await fetch(process.env.REACT_APP_SERVER + "/auth/logout", {
        headers: {authorization :`Bearer ${localStorage.getItem("token")}`}
    })
    if(res.status === 204){
      localStorage.removeItem("token")
      props.setUser(null)
    } else{
      alert("can not logout")
    }
  }
  // console.log(props.user)
  return (
    <nav className={`navbar fixed-top ${background}`} >
      <div className="container">
        <Link style={{textDecoration: "none"}} to="/" className={`${background}`}>CAKE TIME</Link>
        <form className="form-inline">
          <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
          <button className={`btn btn-outline-light my-2 my-sm-0 ${background}`} type="submit">Search</button>
          <li style={{ listStyleType: "none" }} className="nav-item dropdown">
            <span className="px-2 pb-3">{(props.user && props.user.name) ? props.user.name : ""}</span>
            <span data-toggle="dropdown" className="ml-2">
              <i style={{ fontSize: "22px", cursor: "pointer" }} class="fas fa-user-circle"></i>
            </span>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <Link to="/user/profile" className="dropdown-item" >Profile</Link>
              <Link to="/user/createproduct" className="dropdown-item" >Add Product</Link>
              <a className="dropdown-item" >Selling History</a>
            </div>
          </li>

          <span className="ml-3"><i style={{ fontSize: "22px", cursor: "pointer" }} class="fas fa-cart-plus"></i></span>
          {(props.user && props.user.name) 
          ? <Link className={`${background} ml-2`} style={{ textDecoration: "none" }} onClick={logout} to="/login">Logout</Link> 
          : <Link className={`${background} ml-2`} style={{ textDecoration: "none" }} to="/login">Login</Link>}
        </form>
      </div>
    </nav>
  )
}
