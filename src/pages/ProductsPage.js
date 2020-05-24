import React from "react";
import sweet_cake from "../../src/images/sweet-cake/sweet-cake.jpg";
import savory_bread from "../../src/images/savory-bread/savory-cake-3.jpg"

export default function ProductsPage() {
  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-lg-2">
          <div style={{ backgroundColor: "#B91319" }} className="w-100 text-white p-1"><h3>Filter</h3></div>
          <h5>Rating</h5>
          <p>
            <span style={{ cursor: "pointer" }}>
              <i style={{ color: "#B91319" }} class="fas fa-star"></i>
              <i style={{ color: "#B91319" }} class="fas fa-star"></i>
              <i style={{ color: "#B91319" }} class="fas fa-star"></i>
              <i style={{ color: "#B91319" }} class="fas fa-star"></i>
              <i style={{ color: "#B91319" }} class="fas fa-star"></i>
            </span>
          </p>
          <p>
            <span style={{ cursor: "pointer" }}>
              <i style={{ color: "#B91319" }} class="fas fa-star"></i>
              <i style={{ color: "#B91319" }} class="fas fa-star"></i>
              <i style={{ color: "#B91319" }} class="fas fa-star"></i>
              <i style={{ color: "#B91319" }} class="fas fa-star"></i>
              <i style={{ color: "#B91319" }} class="far fa-star"></i>
            </span>
          </p>
          <p>
            <span style={{ cursor: "pointer" }}>
              <i style={{ color: "#B91319" }} class="fas fa-star"></i>
              <i style={{ color: "#B91319" }} class="fas fa-star"></i>
              <i style={{ color: "#B91319" }} class="fas fa-star"></i>
              <i style={{ color: "#B91319" }} class="far fa-star"></i>
              <i style={{ color: "#B91319" }} class="far fa-star"></i>
            </span>
          </p>
          <p>
            <span style={{ cursor: "pointer" }}>
              <i style={{ color: "#B91319" }} class="fas fa-star"></i>
              <i style={{ color: "#B91319" }} class="fas fa-star"></i>
              <i style={{ color: "#B91319" }} class="far fa-star"></i>
              <i style={{ color: "#B91319" }} class="far fa-star"></i>
              <i style={{ color: "#B91319" }} class="far fa-star"></i>
            </span>
          </p>
          <p>
            <span style={{ cursor: "pointer" }}>
              <i style={{ color: "#B91319" }} class="fas fa-star"></i>
              <i style={{ color: "#B91319" }} class="far fa-star"></i>
              <i style={{ color: "#B91319" }} class="far fa-star"></i>
              <i style={{ color: "#B91319" }} class="far fa-star"></i>
              <i style={{ color: "#B91319" }} class="far fa-star"></i>
            </span>
          </p>
          <div className="divider-d-dashed mt-2"></div>
          <h3>Price</h3>
          <p>Low to high</p>
          <p>High to low</p>
        </div>
        <div className="col-lg-10 ">
          <div style={{backgroundColor: "#B91319"}} className="w-100 pl-2 py-1 text-white">
          <h3>Products </h3>
          </div>
          <div style={{border: "1px solid #ddd"}} className="bg-white p-3 rounded-lg mt-4">
          <div className="row">
            <div className="col-lg-3 col-md-6">
              <img className="w-100 rounded" src={sweet_cake} alt="" />
              <div className="d-flex mt-2">
              <h5 className="w-25">Cupcakes </h5>
              <div className="w-50  mb-3"></div>
              <h6 style={{fontStyle: "italic", color: "#B91319" }} className="w-25 ">$3.95</h6>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <img className="w-100 rounded" src={savory_bread} alt="" />
            </div>
            <div className="col-lg-3  col-md-6">
              <img className="w-100" src={sweet_cake} alt="" />
            </div>
            <div className="col-lg-3 col-md-6">
              <img className="w-100" src={sweet_cake} alt="" />
            </div>
            <div className="col-lg-3 col-md-6">
              <img className="w-100" src={sweet_cake} alt="" />
            </div>
            <div className="col-lg-3 col-md-6">
              <img className="w-100" src={sweet_cake} alt="" />
            </div>
            <div className="col-lg-3 col-md-6">
              <img className="w-100" src={sweet_cake} alt="" />
            </div>
            <div className="col-lg-3 col-md-6">
              <img className="w-100" src={sweet_cake} alt="" />
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
