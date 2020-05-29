import React, { useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";
import Pagination from "react-js-pagination";
import Swal from "sweetalert2";
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
// let productList = [];
export default function ProductsPage(props) {
  const { cId } = useParams();
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(null);
  const [category, setCategory] = useState(null);
  const [keyword, setKeyword] = useState("");
  const [searching, setSearching] = useState(false);
  const [sort, setSort] = useState("");
  let [activePage, setActivePage] = useState(1);
  const history = useHistory()
  let htmlProducts;
  useEffect(() => {
    getProductByCategory();
  }, []);
  console.log(props.numProduct)
  const getProductByCategory = async () => {
    const res = await fetch(
      process.env.REACT_APP_SERVER + `/products/category/${cId}?page=1&limit=8`
    );
    const body = await res.json();
    // console.log(body)
    setTotalProducts(body.countProducts);
    setProducts(body.data.products);
    // productList = body.data.products;
    setCategory(body.data.category);
  };
  const handlePageChange = async (pageNumber) => {
    setActivePage(pageNumber);
    const res = await fetch(
      process.env.REACT_APP_SERVER +
        `/products/category/${cId}?page=${pageNumber}&limit=8&sort=${sort}`
    );
    const body = await res.json();
    setProducts(body.data.products);
  };
  const onSearch = async (e) => {
    setSearching(true);
    setKeyword(e.target.value); // need time to run
    if (!e.target.value) {
      onClearSort();
    } else {
      const res = await fetch(
        process.env.REACT_APP_SERVER +
          `/products/category/${cId}?title=${e.target.value}`
      );
      const body = await res.json();
      if (body.status === "success") {
        setProducts(body.data.products);
        setSearching(false);
      }
    }
  };

  const sortLowToHigh = async () => {
    setSort("price");
    const res = await fetch(
      process.env.REACT_APP_SERVER +
        `/products/category/${cId}?sort=price&page=1&limit=8`
    );
    const body = await res.json();
    setProducts(body.data.products);
  };
  const sortHighToLow = async () => {
    setSort("-price");
    const res = await fetch(
      process.env.REACT_APP_SERVER +
        `/products/category/${cId}?sort=-price&page=1&limit=8`
    );
    const body = await res.json();
    setProducts(body.data.products);
  };
  const onClearSort = () => {
    setSort("");
    setActivePage(1);
    getProductByCategory();
  };
  const sortNewest = async () => {
    setSort("-createdAt");
    const res = await fetch(
      process.env.REACT_APP_SERVER +
        `/products/category/${cId}?sort=-createdAt&page=1&limit=8`
    );
    const body = await res.json();
    setProducts(body.data.products);
  }; // console.log(products);

  const addToCart = async (id, product, price, image) => {
    if(!props.user){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "You must login first",
      })
      history.push("/")
    }
    let productObj = { id, product, price, image, quantity: 1 };
    const res = await fetch(process.env.REACT_APP_SERVER + "/cart/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(productObj)
    });
    const body = await res.json()
    if(res.status === 201){
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Add product success",
        showConfirmButton: false,
        timer: 1800,
      });
      //  props.numProduct++ can't use this way (props is immutable)
      let numInCart = props.numProduct + 1
      props.setNumProduct(numInCart)
    }else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `${body.error}`,
      })
    }
  };

  htmlProducts =
    products.length === 0 ? (
      searching ? (
        <div className="sweet-loading justify-content-center w-100">
          <ClipLoader
            css={override}
            size={150}
            color={"#123abc"}
            loading={true}
          />
        </div>
      ) : (
        <h1 className="text-center w-100">No result</h1>
      )
    ) : (
      products.map((el) => {
        return (
          <div className="col-lg-3 col-md-6 mt-3">
            <div className="img product-view w-100 ">
              <Link to={`/category/${cId}/products/${el.id}`}>
                <img className="w-100 h-100 rounded" src={el.image} alt="" />
              </Link>
              <div className="product-view-cart rounded-bottom w-100 f-center">
                <span
                  onClick={() => addToCart(el.id, el.title, el.price, el.image)}
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
      })
    );

  return (
    <div className="container my-5 ">
      <div className="row mt-3">
        <div className="col-lg-2 text-center">
          <div
            style={{ backgroundColor: "#B91319" }}
            className="w-100 text-white p-1"
          >
            <h3>Filter</h3>
          </div>
          <div
            style={{ border: "1px solid #ddd" }}
            className="bg-white p-3 rounded-lg w-100 mt-4"
          >
            <h4 style={{ color: "#03CEA4", textDecoration: "underline" }}>
              Sort
            </h4>
            <div
              style={{ color: "#B91319", fontSize: "18px" }}
              className="text-left"
            >
              - Price
            </div>
            <p style={{ cursor: "pointer" }} onClick={sortLowToHigh}>
              Low to high
            </p>
            <p style={{ cursor: "pointer" }} onClick={sortHighToLow}>
              High to low
            </p>
            <div
              style={{ color: "#B91319", fontSize: "16px" }}
              className="text-left"
            >
              - Popularlity
            </div>
            <p style={{ cursor: "pointer" }} onClick={sortNewest}>
              Newest
            </p>
            <p style={{ cursor: "pointer" }}>Hot Products</p>
            <p style={{ cursor: "pointer" }} onClick={onClearSort}>
              Clear
            </p>
          </div>
          <div className="divider-d-dashed my-3"></div>
          <div
            style={{ border: "1px solid #ddd" }}
            className="bg-white p-3 rounded-lg w-100 mt-4"
          >
            <h5 style={{ color: "#03CEA4" }}>Rating</h5>
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
          </div>
        </div>
        <div className="col-lg-10">
          <div
            style={{ backgroundColor: "#B91319" }}
            className="w-100 pl-2 py-1 text-white"
          >
            <div className="d-flex justify-content-around">
              <h3 className="my-2">{category}</h3>
              <form onChange={onSearch} className="form-inline w-50 ml-5">
                <input
                  className="form-control w-75 mr-sm-2 "
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={keyword}
                />
                <button
                  style={{ color: "#B91319", backgroundColor: "white" }}
                  className="btn btn-outline my-sm-0"
                  type="button"
                >
                  Search
                </button>
              </form>
              <h4 className="mr-3 my-2">Total: {totalProducts}</h4>
            </div>
          </div>
          <div
            style={{ border: "1px solid #ddd" }}
            className="bg-white p-3 rounded-lg mt-4"
          >
            <div className="row">{htmlProducts}</div>
            <div className="d-flex justify-content-center mt-4">
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
