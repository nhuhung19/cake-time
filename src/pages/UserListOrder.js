import React from "react";

export default function UserListOrder(props) {
  console.log(props.user.listOrder);
  let htmlListOrders = props.user.listOrder.map((el) => {
    let htmlProducts = el.products.map(e => {
      return(
        <>
        <td>{e.product}</td>
        <td>{e.quantity}</td>
        <td>{e.total}</td>
        </>
      )
    })
    return (
      <tr key={el.id}>
        <th scope="row">{el.createdAt}</th>
        <td>{htmlProducts}</td>
      </tr>
    );
  });
  const listProducts = (products) => {
    products.map(el => {
      return(
        <>
        <td>{el.product}</td>
        <td>{el.quantity}</td>
        <td>{el.total}</td>
        </>
      )
    })
  }
  return (
    <div>
      <div>
        <table className="table">
          <thead style={{ backgroundColor: "#B91319" }} className="text-light">
            <tr>
              <th scope="col">Product</th>
              <th scope="col">Category</th>
              <th scope="col">Price</th>
              <th scope="col">Rating</th>
              <th scope="col">Stock</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>{htmlListOrders}</tbody>
        </table>
      </div>
    </div>
  );
}
