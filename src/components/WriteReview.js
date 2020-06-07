import React, { useState } from "react";
import Swal from "sweetalert2";

export default function WriteReview(props) {
  const [review, setReview] = useState({});
  // console.log(props.user);
  const handleChange = (e) => {
    setReview({ ...review, [e.target.name]: e.target.value });
  };
  // console.log(review)
  const postReview = async (e) => {
    e.preventDefault();
    const res = await fetch(
      process.env.REACT_APP_SERVER + `/products/${props.productId}/reviews`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(review)
      }
    );
    if (res.status === 201) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Post success",
        showConfirmButton: false,
        timer: 1500,
      });
      props.setReRender(!props.reRender)
      props.getProducts()
    } else {
      alert(`fail`);
    }
  };
  return (
    <div className="mb-5">
      <form
        onChange={handleChange}
        onSubmit={postReview}
        className="rounded bg-white p-3"
      >
        <div className="mb-3">
          <label for="validationTextarea">Write Review</label>
          <textarea
            name="review"
            className="form-control "
            id="validationTextarea"
            placeholder="Please enter review in here."
            required
          ></textarea>
          <div className="invalid-feedback">
            Please enter a message in the textarea.
          </div>
        </div>
        <div class="input-group flex-nowrap ">
          <div class="input-group-prepend">
            <span class="input-group-text" id="addon-wrapping">
              Star
            </span>
          </div>
          <input
            name="rating"
            type="number"
            min="1"
            max="5"
            class="form-control"
            placeholder="Rating"
            aria-label="Rating"
            aria-describedby="addon-wrapping"
            required
          />
        </div>
        <button
          style={{ backgroundColor: "#B91319" }}
          className="btn text-light mt-2"
          type="submit"
        >
          Review
        </button>
      </form>
    </div>
  );
}
