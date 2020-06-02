import React, { useEffect } from "react";
import {useHistory, Link} from 'react-router-dom'
import Swal from "sweetalert2";
const moment = require('moment');

export default function UserListOrder(props) {
  let ListOrders = () => 
  props.user.listOrder !== 0 ? (
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
  ): (
  <div className="text-center">
    <h2>Purchase hisory is empty</h2>
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
        {ListOrders()}
      </div>
        <hr/>
    </div>
  );
}
