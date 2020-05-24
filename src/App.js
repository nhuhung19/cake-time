import React, { useState, useEffect } from 'react';
import {Switch, Route} from 'react-router-dom'
import NavBar from './components/NavBar'
import Banner from './components/Banner'
import Footer from './components/Footer'
import LandingPage from './pages/LandingPage'
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import ProductsPage from "./pages/ProductsPage"
import SingleProduct from "./pages/SingleProduct"
import UserProfileRoute from "./components/UserProfileRoute"
import UserProfilePage from "./pages/UserProfilePage"
import UserProductsPage from "./pages/UserProductsPage"
import UserPasswordPage from "./pages/UserPasswordPage"
import PostProductPage from "./pages/PostProductPage"
// import AuthRouter from "./components/AuthRouter"
import NoMoreLogin from "./components/NoMoreLogin"
import './css/login.css'
import './App.css';

const NavRoute = ({exact, path, component:Component, ...props}) => (
  <Route {...props} exact={exact} path={path} render={() =>(
    <div>
      <NavBar setUser={props.setUser} user={props.user}/>
      <Banner />
      <Component {...props} />
      <Footer />
    </div>
  )} />
)

function App() {
  const [user, setUser] = useState(null)
  useEffect(() => {
    checkUser()
  },[])
  async function checkUser(){
    const urlToken = window.location.href.split("?token=")[1]
    ? window.location.href.split("?token=")[1]
    :null
    const localToken = localStorage.getItem("token")
    const token = urlToken || localToken
    console.log(token)
    if(!token) return
    const res = await fetch(process.env.REACT_APP_SERVER + "/users/me", {
      headers: {authorization: `Bearer ${token}`}
    })
    const body = await res.json()
    console.log(body)
    if(body.status === "success"){
      setUser(body.data)
      localStorage.setItem("token", token)
    } else {
      setUser(null)
      localStorage.removeItem("token")
    }
  }
  
  
  return (
    <div>
      <Switch>
        <NavRoute path="/" setUser={setUser} user={user} exact component={LandingPage}/>
        <NavRoute path="/products" setUser={setUser} user={user} exact component={ProductsPage}/>
        <NavRoute path="/productId" setUser={setUser} user={user} exact component={SingleProduct}/>
        <UserProfileRoute path="/user/profile" setUser={setUser} user={user} exact component={UserProfilePage}/>
        <UserProfileRoute path="/user/products" setUser={setUser} user={user} exact component={UserProductsPage}/>
        <UserProfileRoute path="/user/password" setUser={setUser} user={user} exact component={UserPasswordPage}/>
        <UserProfileRoute path="/user/createproduct" setUser={setUser} user={user} exact component={PostProductPage}/>
        <NoMoreLogin path="/login" user={user} setUser={setUser} exact component={LoginPage} />
        <NoMoreLogin path="/register" user={user} exact component={RegisterPage}/>
      </Switch>
    </div>
   
  );
}

export default App;
