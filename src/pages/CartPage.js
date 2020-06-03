import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import CreditCardInput from "react-credit-card-input";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";

export default function CartPage(props) {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [show, setShow] = useState(false);
  const [reRender, setReRender] = useState(false);
  let [cardNumber, setCardNumber] = useState("");
  let [expiry, setExpiry] = useState("");
  let [cvc, setCVC] = useState("");
  useEffect(() => {
    getUserCart();
  }, [reRender]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);
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
  const getUserCart = async () => {
    const res = await fetch(process.env.REACT_APP_SERVER + "/cart/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const body = await res.json();
    // console.log(body);
    if (body.data && body.data.items) {
      setCartItems(body.data.items);
      props.setNumProduct(body.totalQuantity);
      setTotalQuantity(body.totalQuantity);
      setTotalPrice(body.data.totalPrice);
    } else {
      setCartItems([]);
      props.setNumProduct(0);
      setTotalQuantity(0);
      setTotalPrice(0);
    }
  };

  const deleteItem = async (id) => {
    const res = await fetch(process.env.REACT_APP_SERVER + `/cart/item/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (res.status === 204) {
      await getUserCart();
    }
  };

  // const updateQuantity = async (e, id, product, price, image) => {
  //   let productObj = {id, product, price, image, quantity: e.target.value *1}
  //   // console.log(productObj)
  //   const res = await fetch(process.env.REACT_APP_SERVER + "/cart/user", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       authorization: `Bearer ${localStorage.getItem("token")}`,
  //     },
  //     body: JSON.stringify(productObj)
  //   });
  //   if(res.status === 201){
  //     getUserCart()
  //   }
  // }
  const onPurchase = async (e) => {
    e.preventDefault();
    const arrayExpiry = expiry.split(" / ");
    let cc_exp_month = arrayExpiry[0];
    let cc_exp_year = arrayExpiry[1];
    let creditCard = {
      cc_number: cardNumber,
      cc_cvc: cvc,
      cc_exp_month,
      cc_exp_year,
    };
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
        await getUserCart();
        await props.checkUser()
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Puschasing complete",
          showConfirmButton: false,
          timer: 1500,
        });
        handleClose();
      }
    }
  };

  let htmlCartItems =
    cartItems.length !== 0 ? (
      cartItems.map((el) => {
        return (
          <div className="container" key={el.id}>
            <hr />
            <div className="row h-50">
              <div className="col-lg-5 w-100 d-flex justify-content-center">
                <img className="w-50 img" src={el.image} alt="" />
              </div>
              <div className="col-lg-3 f-center align-items-start flex-column">
                <p>
                  <span className="font-weight-bold">-Product: </span>
                  {el.product}
                </p>
                <p>
                  <span className="font-weight-bold">-Price: $</span>
                  {el.price}
                </p>
              </div>
              <div className="col-lg-1 f-center">
                <form>
                  <input
                    className="w-75"
                    min="1"
                    value={el.quantity}
                    type="number"
                  />
                </form>
              </div>
              <div className="col-lg-2 f-center">
                <div>
                  <span className="font-weight-bold">Total: $</span>
                  {el.total}
                </div>
              </div>
              <div className="col-lg-1 f-center">
                <i
                  style={{ cursor: "pointer" }}
                  onClick={() => deleteItem(el.id)}
                  className="fas fa-times"
                ></i>
              </div>
            </div>
          </div>
        );
      })
    ) : (
      <div className="f-center flex-column">
        <h3>You don't have any product in cart</h3>
        <p>
          <Link to="/">Go to Shopping</Link>
        </p>
      </div>
    );
  return (
    <div style={{ marginTop: "120px" }} className="container">
      <div className="container bg-white rounded py-5">
        <h2>Shopping Cart</h2>
        <p>Your cart ({totalQuantity} items)</p>
        {htmlCartItems}
        <hr />
        <div>
          {props.user ? (
            <div className="d-flex align-items-end flex-column justify-content-end mr-5">
              <h4>
                Total Price: $
                <span className="font-weight-bold font-italic">
                  {totalPrice}
                </span>
              </h4>
              <div className="pt-2">
                <button
                  style={{ backgroundColor: "#B91319", color: "white" }}
                  onClick={handleShow}
                  type="button"
                  className="btn py-2"
                >
                  Check Out
                </button>
              </div>
            </div>
          ) : (
            ""
          )}

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Complete Purchase</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={onPurchase}>
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
                    cardCVCInputRenderer={({ handleCardCVCChange, props }) => (
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
                  <hr />
                  <div className="d-flex justify-content-center w-100">
                    <button
                      style={{ backgroundColor: "#B91319", color: "white" }}
                      type="submit"
                      className="btn "
                    >
                      Purchase
                    </button>
                  </div>
                </div>
              </form>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </div>
  );
}
