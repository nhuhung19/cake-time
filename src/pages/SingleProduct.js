import React, { useState, useEffect } from "react";
import Review from "../components/Review";
import WriteReview from "../components/WriteReview";
import { useParams } from "react-router-dom";

export default function SingleProduct(props) {
  const { pId } = useParams();
  const [product, setProduct] = useState({});
  const [reRender, setReRender] = useState(false);
  // console.log(product)

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    const res = await fetch(process.env.REACT_APP_SERVER + `/products/${pId}`);
    const body = await res.json();
    setProduct(body.data);
    // console.log(body.data)
  };
  return (
    <div style={{marginTop: "100px"}} className="">
      <div className="container mt-5">
        <div className="row ">
          <div className="col-lg-3">
            <div
              style={{ border: "1px solid #ddd" }}
              className="bg-white p-3 rounded-lg"
            >
              <img className="w-100 rounded" src={product.image} alt="" />
            </div>
          </div>
          <div className="col-lg-9">
            <div
              style={{ border: "1px solid #ddd" }}
              className="bg-white p-3 rounded-lg"
            >
              <h2>{product.title}</h2>
              <p>{product.description}</p>
              <hr />
              <p></p>
              <p>
                - Price: <span className="font-weight-bold font-italic" style={{color: "#B91319"}}>$ </span>{product.price}
                <span className="ml-5">- Avaibility: {product.stock}</span>{" "}
                <i
                  style={{ color: "#B91319" }}
                  className="fas fa-birthday-cake"
                ></i>
              </p>
              <p>
                - Average Rating: {product.ratingAverage}{" "}
                <span>
                  <i style={{ color: "#B91319" }} class="fas fa-star"></i>
                </span>
              </p>
              <p>- Quantity Vote: {product.ratingQuantity}</p>
              <p>
                - Provider: {product && product.owner && product.owner.name}
              </p>
              <p>
                <span>- Quantity: </span>
                <input type="number" value="1" min="0" max="1000" step="1" />
              </p>
              <hr />
              <p>
                <button type="button" class="btn btn-outline-success">
                  Add to cart
                </button>
                <button type="button" class="ml-3 btn btn-outline-info">
                  Buy Now
                </button>
              </p>
            </div>
          </div>
        </div>
        <div className="rounded-lg bg-white my-5">
          <nav className="p-3">
            <div className="nav nav-tabs" id="nav-tab" role="tablist">
              <a
                className="nav-item nav-link active"
                id="nav-profile-tab"
                data-toggle="tab"
                href="#nav-comment"
                role="tab"
                aria-controls="nav-profile"
                aria-selected="true"
              >
                Comment
              </a>
              <a
                className="nav-item nav-link "
                id="nav-home-tab"
                data-toggle="tab"
                href="#nav-home"
                role="tab"
                aria-controls="nav-home"
                aria-selected="false"
              >
                Ingredient
              </a>
            </div>
          </nav>
          <div className="tab-content p-3" id="nav-tabContent">
            <div
              className="tab-pane fade show active"
              id="nav-comment"
              role="tabpanel"
              aria-labelledby="nav-profile-tab"
            >
              <Review
                productId={pId}
                reRender={reRender}
                setReRender={setReRender}
                ratingAverage={product.ratingAverage}
              />
            </div>
            <div
              className="tab-pane fade "
              id="nav-home"
              role="tabpanel"
              aria-labelledby="nav-home-tab"
            >
              <p>
                - Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Dolore minima doloribus dolor sint dignissimos ipsa quod
                provident ab error impedit reprehenderit et veritatis
                temporibus, maxime veniam iste possimus consequatur unde.
              </p>
              <p>
                - Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Dolore minima doloribus dolor sint dignissimos ipsa quod
                provident ab error impedit reprehenderit et verita
              </p>
            </div>
          </div>
        </div>
        {props.user ? (
          <WriteReview
            getProducts={getProducts}
            user={props.user}
            productId={pId}
            reRender={reRender}
            setReRender={setReRender}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
