import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";
export default function NavBar(props) {
  let [background, setBackground] = useState("nav-bar");
  const [categorys, setCategorys] = useState([]);
  // console.log(props.numProduct)

  const onScroll = () => {
    const backgroundcolor = window.scrollY < 100 ? "nav-bar" : "nav-bar-scroll";
    setBackground(backgroundcolor);
  };
  useEffect(() => {
    document.addEventListener("scroll", onScroll);
    getCategory();
  }, []);

  async function logout() {
    const res = await fetch(process.env.REACT_APP_SERVER + "/auth/logout", {
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    if (res.status === 204) {
      props.setUser(null);
      localStorage.removeItem("token");
      props.setNumProduct(0);
    } else {
      alert("can not logout");
    }
  }
  const getCategory = async () => {
    const res = await fetch(process.env.REACT_APP_SERVER + "/categorys");
    const body = await res.json();
    setCategorys(body.data);
    console.log(body.data);
  };
  const htmlCategorys = () =>
    categorys.length !== 0
      ? categorys.map((el) => (
          <Link to={`/category/${el.id}/products`} className="dropdown-item">
            {el.category}
          </Link>
        ))
      : "";
  // console.log(props.user)
  return (
    <nav className={`navbar fixed-top py-3 ${background}`}>
      <div className="container">
        <Link
          style={{ textDecoration: "none" }}
          to="/"
          className={`${background} nav-brand`}
        >
          Cake Time
        </Link>

        <form className="form-inline">
          <li style={{ listStyleType: "none" }} className="nav-item dropdown">
            <span className="px-2 pb-3">
              {props.user && props.user.name ? props.user.name : ""}
            </span>
            <span data-toggle="dropdown" className=" ml-2">
              <i
                style={{ fontSize: "22px", cursor: "pointer" }}
                className="fas fa-user-circle"
              ></i>
            </span>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <Link to="/user/profile" className="dropdown-item">
                Profile
              </Link>
              <Link to="/user/create-product" className="dropdown-item">
                Add Product
              </Link>
              <Link to="/user/products-order" className="dropdown-item">
                Purchase History
              </Link>
              <Link to="/user/products-sold" className="dropdown-item">
                Sold History
              </Link>
            </div>
          </li>
          <li
            style={{ listStyleType: "none" }}
            className="nav-item dropdown ml-2"
          >
            <span data-toggle="dropdown" className=" ml-2">
              <i
                style={{ fontSize: "22px", cursor: "pointer" }}
                className="fas fa-hamburger"
              ></i>
            </span>

            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              {htmlCategorys()}
            </div>
          </li>

          <Link
            style={{ textDecoration: "none" }}
            className={`${background}`}
            to="/cart"
          >
            <span className="ml-3 cart-icon">
              <i
                style={{ fontSize: "22px", cursor: "pointer" }}
                className="fas fa-cart-plus"
              ></i>
              <span
                className={`${background} font-weight-bold num-product rounded-circle`}
                style={{ fontSize: "12px" }}
              >
                {props.numProduct}
              </span>
            </span>
          </Link>
          {props.user && props.user.name ? (
            <Link
              className={`${background} ml-4`}
              style={{ textDecoration: "none" }}
              onClick={logout}
              to="/login"
            >
              Logout
            </Link>
          ) : (
            <Link
              className={`${background} ml-4`}
              style={{ textDecoration: "none" }}
              to="/login"
            >
              Login
            </Link>
          )}
        </form>
      </div>
    </nav>
  );
}
