import React from 'react'

export default function UserListSold(props) {
  console.log(props.user)

  let htmlProducts =
  props.user.listSold.length !== 0 ? (
    props.user.listSold.map((el) => {
        return (
          <tr key={el.id}>
            <th scope="row">{el.product}</th>
            <td>{el.quantity}</td>
            <td>${el.price}</td>
            <td>${el.total}</td>
          </tr>
        );
      })
    ) : (
      <h6 className="mt-5 text-center">You don't have data yet!</h6>
    );
  return (
    <div>
      <table className="table">
        <thead style={{ backgroundColor: "#B91319" }} className="text-light">
          <tr>
            <th scope="col">Product</th>
            <th scope="col">Quantity</th>
            <th scope="col">Price</th>
            <th scope="col">Total</th>
          </tr>
        </thead>
        <tbody>{htmlProducts}</tbody>
      </table>
    </div>
  )
}
