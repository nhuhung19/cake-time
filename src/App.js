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
import UserListOrder from "./pages/UserListOrder";
import UserListSold from "./pages/UserListSold";
import UserPasswordPage from "./pages/UserPasswordPage";
import PostProductPage from "./pages/PostProductPage";
import CartPage from "./pages/CartPage";
import NoMoreLogin from "./components/NoMoreLogin";
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";
import "./css/login.css";
import "./css/button.css";
import "./App.css";
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const NavBannerRoute = ({ exact, path, component: Component, ...props }) => (
  <Route
    {...props}
    exact={exact}
    path={path}
    render={() => (
      <div>
        <NavBar
          numProduct={props.numProduct}
          setNumProduct={props.setNumProduct}
          setUser={props.setUser}
          user={props.user}
        />
        <Banner />
        <Component
          numProduct={props.numProduct}
          setNumProduct={props.setNumProduct}
          cartItems={props.cartItems}
          setUser={props.setUser}
          user={props.user}
          {...props}
        />
        <Footer />
      </div>
    )}
  />
);
const NavRoute = ({ exact, path, component: Component, ...props }) => (
  <Route
    {...props}
    exact={exact}
    path={path}
    render={() => (
      <div>
        <NavBar
          numProduct={props.numProduct}
          setNumProduct={props.setNumProduct}
          setUser={props.setUser}
          user={props.user}
        />
        <Component
          checkUser={props.checkUser}
          numProduct={props.numProduct}
          setNumProduct={props.setNumProduct}
          totalPrice={props.totalPrice}
          setTotalPrice={props.setTotalPrice}
          user={props.user}
          {...props}
        />
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
  const getUserCart = async () => {
    // console.log("=============")
    const res = await fetch(process.env.REACT_APP_SERVER + "/cart/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const body = await res.json();
    // console.log(body)
    setNumProduct(body.totalQuantity);
  };
  async function checkUser() {
    const urlToken = window.location.href.split("?token=")[1]
      ? window.location.href.split("?token=")[1]
      : null;
    const localToken = localStorage.getItem("token");
    const token = (urlToken.split("#")[0]) || localToken;
    if (!token) return;
    const res = await fetch(process.env.REACT_APP_SERVER + "/users/profile", {
      headers: { authorization: `Bearer ${token}` },
    });
    const body = await res.json();
    if (body.status === "success") {
      setUser(body.data);
      localStorage.setItem("token", token);
      getUserCart();
    } else {
      setUser(null);
      localStorage.removeItem("token");
    }
  }
  if (!runUseEffect) {
    return (
    <div className="sweet-loading d-flex justify-content-center w-100">
      <ClipLoader css={override} size={150} color={"#123abc"} loading={true} />
    </div>
    )
  }

  // console.log(user);
  return (
    <div>
      <Switch>
        <NavBannerRoute
          path="/"
          setUser={setUser}
          user={user}
          numProduct={numProduct}
          setNumProduct={setNumProduct}
          exact
          component={LandingPage}
        />
        <NavBannerRoute
          path="/category/:cId/products"
          setUser={setUser}
          user={user}
          numProduct={numProduct}
          setNumProduct={setNumProduct}
          exact
          component={ProductsPage}
        />
        <NavRoute
          path="/category/:cId/products/:pId"
          setUser={setUser}
          numProduct={numProduct}
          setNumProduct={setNumProduct}
          checkUser={checkUser}
          user={user}
          exact
          component={SingleProduct}
        />
        <NavRoute
          path="/cart"
          setUser={setUser}
          checkUser={checkUser}
          numProduct={numProduct}
          setNumProduct={setNumProduct}
          user={user}
          exact
          component={CartPage}
        />
        <UserProfileRoute
          numProduct={numProduct}
          setNumProduct={setNumProduct}
          path="/user/profile"
          user={user}
          setUser={setUser}
          exact
          component={UserProfilePage}
        />
        <UserProfileRoute
          numProduct={numProduct}
          setNumProduct={setNumProduct}
          path="/user/products"
          user={user}
          setUser={setUser}
          exact
          component={UserProductsPage}
        />
        <UserProfileRoute
          numProduct={numProduct}
          setNumProduct={setNumProduct}
          path="/user/password"
          user={user}
          setUser={setUser}
          exact
          component={UserPasswordPage}
        />
        <UserProfileRoute
          numProduct={numProduct}
          setNumProduct={setNumProduct}
          path="/user/create-product"
          setUser={setUser}
          user={user}
          exact
          component={PostProductPage}
        />
        <UserProfileRoute
          numProduct={numProduct}
          setNumProduct={setNumProduct}
          path="/user/products-order"
          setUser={setUser}
          user={user}
          exact
          component={UserListOrder}
        />
        <UserProfileRoute
          numProduct={numProduct}
          setNumProduct={setNumProduct}
          path="/user/products-sold"
          setUser={setUser}
          user={user}
          exact
          component={UserListSold}
        />
        <NoMoreLogin
          path="/login"
          user={user}
          setUser={setUser}
          exact
          component={LoginPage}
          checkUser={checkUser}
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
