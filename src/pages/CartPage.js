import React, { useState, useEffect } from "react";

export default function CartPage(props) {
  useEffect(() => {
    if(props.user){
      getUserCart()
    }
  },[])
  const [cartItems, setCartItems] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)
  const getUserCart = async () => {
    const res = await fetch(process.env.REACT_APP_SERVER + "/cart/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const body = await res.json();
    if (body.data && body.data.items.length !== 0) {
      setCartItems(body.data.items);
      console.log(body.data);
      setTotalPrice(body.data.totalPrice)
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
          <div key={el.id}>
            <div className="row container h-50 my-5">
              <div className="col-lg-5 w-100 d-flex justify-content-center">
                <img className="w-50 img" src={el.image} alt="" />
              </div>
              <div className="col-lg-3">
                <div><span className="font-weight-bold">Product: </span>{el.product}</div>
                <div><span className="font-weight-bold">Price: $</span>{el.price}</div>
                
              </div>
              <div className="col-lg-1">
                <form >
                <input className="w-75" min="1" value={el.quantity} type="number"/>
                </form>
              </div>
              <div className="col-lg-2">
              <div><span className="font-weight-bold">Total: $</span>{el.total}</div>
              </div>
              <div className="col-lg-1"><i style={{cursor: "pointer"}} className="fas fa-trash-alt"></i></div>
            </div>
              <hr/>
            </div>
          );
        })
      : "";
  return (
    <div style={{ marginTop: "120px" }} className="container">
      <div className="container bg-white rounded my-5">
        {htmlCartItems}
      </div>
      <div>Total Price: $<span>{totalPrice}</span></div>
    </div>
  );
}
