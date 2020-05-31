import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom"

export default function CartPage(props) {
  useEffect(() => {
    getUserCart();
  }, []);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0)
  const getUserCart = async () => {
    const res = await fetch(process.env.REACT_APP_SERVER + "/cart/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const body = await res.json();
    if (body.data || (body.data && body.data.items.length !== 0)) {
      setCartItems(body.data.items);
      console.log(body);
      props.setNumProduct(body.totalQuantity);
      setTotalQuantity(body.totalQuantity)
      setTotalPrice(body.data.totalPrice);
    }
  };

  const deleteItem = async (id) => {
    const res = await fetch(process.env.REACT_APP_SERVER + `/cart/item/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (res.status === 204) {
      getUserCart();
    }
  };

  // const updateQuantity = async (e, id, product, price, image) => {
  //   let productObj = {id, product, price, image, quantity: e.target.value *1}
  //   // console.log(productObj)
  //   const res = await fetch(process.env.REACT_APP_SERVER + "/cart/user", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       authorization: `Bearer ${localStorage.getItem("token")}`,
  //     },
  //     body: JSON.stringify(productObj)
  //   });
  //   if(res.status === 201){
  //     getUserCart()
  //   }
  // }

  let htmlCartItems =
    cartItems.length !== 0
      ? cartItems.map((el) => {
          return (
            <div className="container" key={el.id}>
              <hr />
              <div className="row h-50">
                <div className="col-lg-5 w-100 d-flex justify-content-center">
                  <img className="w-50 img" src={el.image} alt="" />
                </div>
                <div className="col-lg-3 f-center align-items-start flex-column">
                  <p>
                    <span className="font-weight-bold">-Product: </span>
                    {el.product}
                  </p>
                  <p>
                    <span className="font-weight-bold">-Price: $</span>
                    {el.price}
                  </p>
                </div>
                <div className="col-lg-1 f-center">
                  <form>
                    <input
                      className="w-75"
                      min="1"
                      value={el.quantity}
                      type="number"
                    />
                  </form>
                </div>
                <div className="col-lg-2 f-center">
                  <div>
                    <span className="font-weight-bold">Total: $</span>
                    {el.total}
                  </div>
                </div>
                <div className="col-lg-1 f-center">
                  <i
                    style={{ cursor: "pointer" }}
                    onClick={() => deleteItem(el.id)}
                    className="fas fa-times"
                  ></i>
                </div>
              </div>
            </div>
          );
        })
      : <div className="f-center flex-column">
        <h3>You don't have any product in cart</h3>
        <p><Link to="/">Go to Shopping</Link></p>
      </div>;
  return (
    <div style={{ marginTop: "120px" }} className="container">
      <div className="container bg-white rounded py-5">
        <h2>Shopping Cart</h2>
        <p>Your cart ({totalQuantity} items)</p>
        {htmlCartItems}
        <hr />
        <h4 className="d-flex align-items-center justify-content-end mr-5">
          Total Price: <span className="font-weight-bold font-italic"> ${totalPrice}</span>
        </h4>
      </div>
    </div>
  );
}
