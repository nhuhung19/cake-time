import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Banner from "./components/Banner";
import Footer from "./components/Footer";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProductsPage from "./pages/ProductsPage";
import SingleProduct from "./pages/SingleProduct";
import UserProfileRoute from "./components/UserProfileRoute";
import UserProfilePage from "./pages/UserProfilePage";
import UserProductsPage from "./pages/UserProductsPage";
import UserPasswordPage from "./pages/UserPasswordPage";
import PostProductPage from "./pages/PostProductPage";
// import AuthRouter from "./components/AuthRouter"
import NoMoreLogin from "./components/NoMoreLogin";
import "./css/login.css";
import "./css/button.css";
import "./App.css";

const NavRoute = ({ exact, path, component: Component, ...props }) => (
  <Route
    {...props}
    exact={exact}
    path={path}
    render={() => (
      <div>
        <NavBar 
          numProduct={props.numProduct} 
          setUser={props.setUser} 
          user={props.user} />
        <Banner />
        <Component 
          numProduct={props.numProduct} 
          setNumProduct={props.setNumProduct} 
          {...props} />
        <Footer />
      </div>
    )}
  />
);
const SingleProductRoute = ({
  exact,
  path,
  component: Component,
  ...props
}) => (
  <Route
    {...props}
    exact={exact}
    path={path}
    render={() => (
      <div>
        <NavBar numProduct={props.numProduct} setNumProduct={props.setNumProduct} setUser={props.setUser} user={props.user} />
        <Component numProduct={props.numProduct} setNumProduct={props.setNumProduct} {...props} />
        <div className="divider-d-dashed mb-5"></div>
        <Footer />
      </div>
    )}
  />
);

function App() {
  const [user, setUser] = useState(null);
  const [runUseEffect, setRunUseEffect] = useState(false);
  let [numProduct, setNumProduct] = useState(0);
  useEffect(async () => {
    await checkUser();
    setRunUseEffect(true);
  }, []);
  async function checkUser() {
    const urlToken = window.location.href.split("?token=")[1]
      ? window.location.href.split("?token=")[1].split("#_=_").join("")
      : null;
    const localToken = localStorage.getItem("token");
    const token = urlToken || localToken;
    console.log(token);
    if (!token) return;
    const res = await fetch(process.env.REACT_APP_SERVER + "/users/profile", {
      headers: { authorization: `Bearer ${token}` },
    });
    const body = await res.json();
    // console.log(body)
    if (body.status === "success") {
      setUser(body.data);
      localStorage.setItem("token", token);
    } else {
      setUser(null);
      localStorage.removeItem("token");
    }
  }
  if (!runUseEffect) {
    return <div>...Loading</div>;
  }

  return (
    <div>
      <Switch>
        <NavRoute
          path="/"
          setUser={setUser}
          user={user}
          numProduct={numProduct}
          setNumProduct={setNumProduct}
          exact
          component={LandingPage}
        />
        <NavRoute
          path="/category/:cId/products"
          setUser={setUser}
          user={user}
          numProduct={numProduct}
          setNumProduct={setNumProduct}
          exact
          component={ProductsPage}
        />
        <SingleProductRoute
          path="/category/:cId/products/:pId"
          setUser={setUser}
          numProduct={numProduct} 
          setNumProduct={setNumProduct}
          user={user}
          exact
          component={SingleProduct}
        />
        <UserProfileRoute
          path="/user/profile"
          user={user}
          exact
          component={UserProfilePage}
        />
        <UserProfileRoute
          path="/user/products"
          user={user}
          exact
          component={UserProductsPage}
        />
        <UserProfileRoute
          path="/user/password"
          user={user}
          exact
          component={UserPasswordPage}
        />
        <UserProfileRoute
          path="/user/createproduct"
          setUser={setUser}
          user={user}
          exact
          component={PostProductPage}
        />
        <NoMoreLogin
          path="/login"
          user={user}
          setUser={setUser}
          exact
          component={LoginPage}
        />
        <NoMoreLogin
          path="/register"
          user={user}
          exact
          component={RegisterPage}
        />
      </Switch>
    </div>
  );
}

export default App;
