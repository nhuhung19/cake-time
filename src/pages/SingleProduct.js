import React, { useState, useEffect } from "react";
import Review from "../components/Review";
import WriteReview from "../components/WriteReview";
import { useParams, useHistory } from "react-router-dom";
import Swal from "sweetalert2";

export default function SingleProduct(props) {
  const { pId } = useParams();
  const [product, setProduct] = useState({});
  const [reRender, setReRender] = useState(false);
  const [quantity, setQuantity] = useState(1)
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

  const addToCart = async (e,id, product, price, image) => {
    e.preventDefault()
    if(!props.user){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "You must login first",
      })
    }
    else{
      let productObj = { id, product, price, image, quantity: quantity*1};
      console.log(productObj)
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
          timer: 1500,
        });
        //  props.numProduct++ can't use this way (props is immutable)
        let numInCart = props.numProduct + quantity*1
        props.setNumProduct(numInCart)
      }else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `${body.error}`,
        })
      }
    }
    
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
              <form onSubmit={(e) => addToCart(e,product.id, product.title,product.price, product.image)}>
              <p>
                <span>- Quantity: </span>
                <input placeholder="0" type="number" onChange={(e) => setQuantity(e.target.value)} min="1" max={product.stock} required />
              </p>
              <hr />
                <button type="submit" 
                
                className="btn btn-outline-success">
                  Add to cart
                </button>
                <button type="button" className="ml-3 btn btn-outline-info">
                  Buy Now
                </button>
                </form>
                <p>
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
