import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import Review from "../components/Review";
import WriteReview from "../components/WriteReview";
import { useParams, useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import CreditCardInput from "react-credit-card-input";
import "bootstrap/dist/css/bootstrap.min.css";

export default function SingleProduct(props) {
  const { pId } = useParams();
  const [product, setProduct] = useState({});
  const [reRender, setReRender] = useState(false);
  const [show, setShow] = useState(false);
  const [quantity, setQuantity] = useState(1);
  let [cardNumber, setCardNumber] = useState("");
  let [expiry, setExpiry] = useState("");
  let [cvc, setCVC] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);
  useEffect(() => {
    getProducts();
  }, []);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let subtitle;
  function openModal() {
    setIsOpen(true);
  }
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }
  function closeModal() {
    setIsOpen(false);
  }

  const getProducts = async () => {
    const res = await fetch(process.env.REACT_APP_SERVER + `/products/${pId}`);
    const body = await res.json();
    setProduct(body.data);
    // console.log(body.data)
  };

  const addToCart = async (e, id, product, price, image) => {
    e.preventDefault();
    if (!props.user) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You must login first",
      });
    } else {
      let productObj = { id, product, price, image, quantity: quantity * 1 };
      const res = await fetch(process.env.REACT_APP_SERVER + "/cart/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(productObj),
      });
      const body = await res.json();
      if (res.status === 201) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Add product success",
          showConfirmButton: false,
          timer: 1500,
        });
        //  props.numProduct++ can't use this way (props is immutable)
        let numInCart = props.numProduct + quantity * 1;
        props.setNumProduct(numInCart);
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${body.error}`,
        });
      }
    }
  };

  const onPurchase = async (e, id, product, price, image) => {
    e.preventDefault();
    document.getElementById("purchase-btn").disabled = true;
    if (!props.user) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You must login first",
      });
    } else {
      const arrayExpiry = expiry.split(" / ");
      let cc_exp_month = arrayExpiry[0];
      let cc_exp_year = arrayExpiry[1];
      // console.log(typeof cardNumber)
      let creditCard = {
        cc_number: cardNumber,
        cc_cvc: cvc,
        cc_exp_month,
        cc_exp_year,
      };
      let productObj = { id, product, price, image, quantity: quantity * 1 };
      const res = await fetch(process.env.REACT_APP_SERVER + "/cart/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(productObj),
      });
      if (res.status === 201) {
        const res = await fetch(process.env.REACT_APP_SERVER + "/buy", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(creditCard),
        });
        if (res.status === 201) {
          const res = await fetch(process.env.REACT_APP_SERVER + "/cart/user", {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          if (res.status === 204) {
            await getProducts();
          }
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Puschasing complete",
            showConfirmButton: false,
            timer: 1500,
          });
          document.getElementById("purchase-btn").disabled = false;
          props.checkUser();
          handleClose();
        }
      }
    }
  };

  return (
    <div style={{ marginTop: "100px" }} className="">
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
                - Price:{" "}
                <span
                  className="font-weight-bold font-italic"
                  style={{ color: "#B91319" }}
                >
                  ${" "}
                </span>
                {product.price}
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
              <form
                onSubmit={(e) =>
                  addToCart(
                    e,
                    product.id,
                    product.title,
                    product.price,
                    product.image
                  )
                }
              >
                <p>
                  <span>- Quantity: </span>
                  <input
                    placeholder="0"
                    type="number"
                    onChange={(e) => setQuantity(e.target.value)}
                    min="1"
                    max={product.stock}
                    required
                  />
                </p>
                <hr />
                <button
                  style={{ backgroundColor: "#B91319", color: "white" }}
                  type="submit"
                  className="btn py-2"
                >
                  Add to cart
                </button>
                <button
                  type="button"
                  style={{ backgroundColor: "#03CEA4", color: "white" }}
                  className="ml-3 btn py-2"
                  onClick={handleShow}
                >
                  Buy Now
                </button>
              </form>
              <p></p>
            </div>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form
                  onSubmit={(e) =>
                    onPurchase(
                      e,
                      product.id,
                      product.title,
                      product.price,
                      product.image
                    )
                  }
                >
                  <div className="modal-body">
                    <div class="form-row">
                      <div class="form-group col-md-6">
                        <label for="inputName">Full Name</label>
                        <input
                          type="text"
                          class="form-control"
                          id="inputName"
                          placeholder="Full Name"
                          required
                        />
                      </div>
                      <div class="form-group col-md-6">
                        <label for="inputPhone">Phone</label>
                        <input
                          type="text"
                          class="form-control"
                          id="inputPhone"
                          placeholder="Phone Number"
                          required
                        />
                      </div>
                    </div>
                    <div class="form-group">
                      <label for="inputAddress">Address</label>
                      <input
                        type="text"
                        class="form-control"
                        id="inputAddress"
                        placeholder="1234 Main St"
                        required
                      />
                    </div>
                    <div class="form-group">
                      <label for="inputEmail">Email</label>
                      <input
                        type="email"
                        class="form-control"
                        id="inputEmail"
                        placeholder="example@gmail.com"
                        required
                      />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <CreditCardInput
                      cardCVCInputRenderer={({
                        handleCardCVCChange,
                        props,
                      }) => (
                        <input
                          {...props}
                          onChange={handleCardCVCChange((e) =>
                            setCVC(e.target.value)
                          )}
                        />
                      )}
                      cardExpiryInputRenderer={({
                        handleCardExpiryChange,
                        props,
                      }) => (
                        <input
                          {...props}
                          onChange={handleCardExpiryChange((e) =>
                            setExpiry(e.target.value)
                          )}
                        />
                      )}
                      cardNumberInputRenderer={({
                        handleCardNumberChange,
                        props,
                      }) => (
                        <input
                          {...props}
                          onChange={handleCardNumberChange((e) =>
                            setCardNumber(e.target.value)
                          )}
                        />
                      )}
                    />
                    <button
                      id="purchase-btn"
                      type="submit"
                      className="btn btn-primary"
                    >
                      Purchase
                    </button>
                  </div>
                </form>
              </Modal.Body>
            </Modal>
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
