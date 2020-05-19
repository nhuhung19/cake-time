import React from 'react'
import SweetCake from "./SweetCake"
import Bread from "./Bread"
import SavoryBread from "./SavoryBread"


export default function Products() {
  return (
    <div className="container mt-5">
      <SweetCake />
      <div className="divider-d-dashed mt-5"></div>
      <Bread />
      <div className="divider-d-dashed mt-5"></div>
      <SavoryBread />
      <div className="divider-d-dashed my-5"></div>
    </div>

  )
}
