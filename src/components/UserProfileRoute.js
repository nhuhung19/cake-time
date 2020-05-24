import React from 'react'
import {Link, Route } from 'react-router-dom'
import NavBar from './NavBar'
import Banner from './Banner'
import Footer from './Footer'

export default function UserProfileRoute({exact, path, component:Component, ...props}) {
  return (
    <Route {...props} exact={exact} path={path} render={() =>(
      <div>
        <NavBar setUser={props.setUser} user={props.user}/>
        <Banner />
        <div className="container my-5">
          <div className="row">
            <div className="col-lg-3 ">
              <div style={{border: "1px solid #ddd"}} className="p-3 bg-white rounded-lg">
                <div>DashBoard</div>
                <hr/>
                <p><Link to="/user/profile">Profile</Link></p>
                <p><Link to="/user/password">Change Password</Link></p>
                <p><Link to="/user/products">Products</Link></p>
                <p><Link to="/user/createproduct">Post Product</Link></p>
              </div>
            </div>
            <div className="col-lg-9">
              <div style={{border: "1px solid #ddd"}} className="p-4 bg-white rounded-lg" >
                <Component {...props} />
              </div>
            </div>
          </div>
        <div className="divider-d-dashed my-5"></div>
        </div>
        <Footer />
      </div>
    )} />
  )
}