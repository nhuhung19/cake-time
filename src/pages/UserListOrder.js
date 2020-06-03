import React, { useEffect } from "react";
import {useHistory, Link} from 'react-router-dom'
import Swal from "sweetalert2";
const moment = require('moment');

export default function UserListOrder(props) {
const history = useHistory()


  if(!props.user){
    alert("you must login first")
    history.push("/")
    return <div></div>
  }
  const listOrder = () =>
  props.user.listOrder.length !== 0 ? (
  props.user.listOrder.map((el) => {
    return (
      <div className="row" key={el.id}>
        <hr className="w-100"/>
        <div className="col-lg-8">
          <div >{listProducts(el.products)}</div>
        </div>
        <div className="col-lg-4 text-center d-flex align-items-center">{moment(el.createdAt).format('LLLL')}</div>
      </div>
    );
  })
  ):(
    <div className="text-center mt-3">
      <h3>Purchase hisory is empty</h3>
      <Link to="/">Go to Shopping now</Link>
    </div>
    )
  const listProducts = (products) => 
    products.map((e) => {
      return (
        <div className="row my-2">
          <div className="col-lg-4 font-weight-bold">- {e.product}</div>
          <div className="col-lg-2 text-center">{e.quantity}</div>
          <div className="col-lg-3 text-center">${e.price}</div>
          <div className="col-lg-3 text-center">${e.total}</div>
        </div>
      );
    });
  
  
  return (
    <div>
      <div className="container">
      <div style={{backgroundColor: "#B91319"}} className="row text-center font-weight-bold text-light py-3">
        <div className="col-lg-8">
          <div className="row">
            <div className="col-lg-4">Product</div>
            <div className="col-lg-2">Quantity</div>
            <div className="col-lg-3">Price</div>
            <div className="col-lg-3">Total</div>
          </div>
        </div>
        <div className="col-lg-4">Day Order</div>
      </div>
        {listOrder()}
      </div>
        <hr/>
    </div>
  );
}
