import React, { useState } from "react";

export default function WriteReview(props) {
  const [review, setReview] = useState({});
  // console.log(props.user);
  const handleChange = (e) => {
    setReview({ ...review, [e.target.name]: e.target.value });
  };
  // console.log(review)
  console.log(props.categoryId,"cId")
  console.log(props.productId,"pId")
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
      alert("Post successfully");
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
            placeholder="Please enter a review in here."
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
