import React from "react";
import { Link, Route } from "react-router-dom";
import NavBar from "./NavBar";
import BannerProfile from "./BannerProfile";
import Footer from "./Footer";

export default function UserProfileRoute({
  exact,
  path,
  component: Component,
  ...props
}) {
  return (
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
          <BannerProfile />
          <div className="container my-5">
            <div className="row">
              <div className="col-lg-3 ">
                <div
                  style={{ border: "1px solid #ddd" }}
                  className="p-3 bg-white rounded-lg"
                >
                  <div>DashBoard</div>
                  <hr />
                  <p>
                    <Link to="/user/profile">Profile</Link>
                  </p>
                  <p>
                    <Link to="/user/password">Change Password</Link>
                  </p>
                  <p>
                    <Link to="/user/create-product">Post Product</Link>
                  </p>
                  <p>
                    <Link to="/user/products">Products</Link>
                  </p>
                  <p>
                    <Link to="/user/products-order">Product Order</Link>
                  </p>
                  <p>
                    <Link to="/user/products-sold">Product Sold</Link>
                  </p>
                </div>
              </div>
              <div className="col-lg-9">
                <div
                  style={{ border: "1px solid #ddd" }}
                  className="p-4 bg-white rounded-lg"
                >
                  <Component
                    numProduct={props.numProduct}
                    setNumProduct={props.setNumProduct}
                    setUser={props.setUser}
                    user={props.user}
                    {...props}
                  />
                </div>
              </div>
            </div>
            <div className="divider-d-dashed my-5"></div>
          </div>
          <Footer />
        </div>
      )}
    />
  );
}
