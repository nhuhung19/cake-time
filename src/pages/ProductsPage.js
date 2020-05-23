import React from "react";
import sweet_cake from "../../src/images/sweet-cake/sweet-cake.jpg";
import savory_bread from "../../src/images/savory-bread/savory-cake-3.jpg"

export default function ProductsPage() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-2">
          <h3>Filter</h3>
          <h4>Rating</h4>
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
          <h3>Products </h3>
          <div className="row">
            <div className="col-lg-3 col-md-6 mt-4 ">
              <img className="w-100 rounded" src={sweet_cake} alt="" />
              <div className="d-flex mt-2">
              <h5 className="w-25">Cupcakes </h5>
              <div className="w-50  mb-3"></div>
              <h6 style={{fontStyle: "italic", color: "#B91319" }} className="w-25 ">$3.95</h6>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 mt-4">
              <img className="w-100 rounded" src={savory_bread} alt="" />
            </div>
            <div className="col-lg-3  col-md-6 mt-4">
              <img className="w-100" src={sweet_cake} alt="" />
            </div>
            <div className="col-lg-3 col-md-6 mt-4">
              <img className="w-100" src={sweet_cake} alt="" />
            </div>
            <div className="col-lg-3 col-md-6 mt-4">
              <img className="w-100" src={sweet_cake} alt="" />
            </div>
            <div className="col-lg-3 col-md-6 mt-4">
              <img className="w-100" src={sweet_cake} alt="" />
            </div>
            <div className="col-lg-3 col-md-6 mt-4">
              <img className="w-100" src={sweet_cake} alt="" />
            </div>
            <div className="col-lg-3 col-md-6 mt-4">
              <img className="w-100" src={sweet_cake} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
