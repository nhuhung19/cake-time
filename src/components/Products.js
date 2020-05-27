import React, { useState, useEffect } from "react";
import Pastry from "./Pastry";
import Bread from "./Bread";
import SavoryBread from "./SavoryBread";

export default function Products() {
  const [categorys, setCategory] = useState([]);
  useEffect(() => {
    getCategory();
  }, []);
  const getCategory = async () => {
    const res = await fetch(process.env.REACT_APP_SERVER + "/categorys");
    const body = await res.json();
    setCategory(body.data);
  };
  if (categorys.length === 0) {
    return <div>...Loading</div>;
  } else if(categorys.length !==0) {
    return (
      <div className="container mt-5">
        <Pastry pastry={categorys[2]} />
        <div className="divider-d-dashed mt-5"></div>
        <Bread bread={categorys[0]} />
        <div className="divider-d-dashed mt-5"></div>
        <SavoryBread savoryBread={categorys[1]} />
        <div className="divider-d-dashed my-5"></div>
      </div>
    );
  }
}
