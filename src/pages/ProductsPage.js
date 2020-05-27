import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";
import Pagination from "react-js-pagination";
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

export default function ProductsPage(props) {
  const { cId } = useParams();
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(null);
  const [category, setCategory] = useState(null);
  let [activePage, setActivePage] = useState(1);
  let htmlProducts;
  useEffect(() => {
    getProductByCategory();
  }, []);

  const getProductByCategory = async () => {
    const res = await fetch(
      process.env.REACT_APP_SERVER + `/products/category/${cId}?page=1&limit=8`
    );
    const body = await res.json();
    setTotalProducts(body.countProducts);
    setProducts(body.data.products);
    setCategory(body.data.category);
  };
  const handlePageChange = async (pageNumber) => {
    setActivePage(pageNumber);
    const res = await fetch(
      process.env.REACT_APP_SERVER +
        `/products/category/${cId}?page=${pageNumber}&limit=8`
    );
    const body = await res.json();
    setProducts(body.data.products);
  };
  // console.log(products);
  if (products.length !== 0) {
    htmlProducts = products.map((el) => {
      return (
        <div className="col-lg-3 col-md-6 mt-3">
          <div className=" img product-view w-100 ">
            <img className="w-100 h-100 rounded" src={el.image} alt="" />
            <div className="product-view-cart rounded-bottom w-100 f-center">
              <span
                style={{ cursor: "pointer" }}
                className="font-weight-lighter "
              >
                <i className="fas fa-cart-plus"></i>
                Add to cart
              </span>
            </div>
            <div className="product-quick-view rounded-top w-100 f-center">
              <span
                style={{ cursor: "pointer" }}
                className="font-weight-lighter"
              >
                <i class="fas fa-random"></i>
                Quick View
              </span>
            </div>
          </div>
          <div className="d-flex mt-2">
            <div className="menu-items d-flex justify-content-between w-100">
              <div
                style={{ fontSize: "18px", backgroundColor: "white" }}
                className="font-weight-bold"
              >
                {el.title}{" "}
              </div>
              <div className="dotted-line"></div>
              <div
                style={{
                  fontSize: "18px",
                  backgroundColor: "white",
                  fontStyle: "italic",
                  color: "#B91319",
                }}
              >
                ${el.price}
              </div>
            </div>
          </div>
        </div>
      );
    });
  }

  if (products.length === 0) {
    return (
      <div className="sweet-loading">
        <ClipLoader
          css={override}
          size={150}
          color={"#123abc"}
          loading={true}
        />
      </div>
    );
  }

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-lg-2">
          <div
            style={{ backgroundColor: "#B91319" }}
            className="w-100 text-white p-1"
          >
            <h3>Filter</h3>
          </div>
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
          <div
            style={{ backgroundColor: "#B91319" }}
            className="w-100 pl-2 py-1 text-white"
          >
            <div className="d-flex justify-content-between">
            <h3>
              {category} 
            </h3>
            <h4 className="mr-3 mt-2">Total: {totalProducts}</h4>
            </div>
          </div>
          <div
            style={{ border: "1px solid #ddd" }}
            className="bg-white p-3 rounded-lg mt-4"
          >
            <div className="row">{htmlProducts}</div>
            <div className="d-flex justify-content-center mt-3">
              <Pagination
                className="pagination-style"
                activePage={activePage}
                itemsCountPerPage={8}
                totalItemsCount={totalProducts}
                pageRangeDisplayed={5}
                onChange={handlePageChange}
                itemClass="page-item"
                linkClass="page-link"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
