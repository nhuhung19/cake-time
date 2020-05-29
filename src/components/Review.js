import React, { useEffect, useState } from "react";
import Pagination from "react-js-pagination";
const moment = require("moment");

export default function Review(props) {
  const [reviews, setReviews] = useState([]);
  const [totalReview, setTotalReview] = useState(0);
  let [activePage, setActivePage] = useState(1);

  useEffect(() => {
    getReviews();
  }, [props.reRender]);
  const getReviews = async () => {
    const res = await fetch(
      process.env.REACT_APP_SERVER + `/products/${props.productId}/reviews`
    );
    const body = await res.json();
    setReviews(body.data);
    setTotalReview(body.total);
    console.log(body);
  };
  const handlePageChange = async (pageNumber) => {
    setActivePage(pageNumber);
    const res = await fetch(
      process.env.REACT_APP_SERVER +
        `/products/${props.productId}/reviews?page=${pageNumber}`
    );
    const body = await res.json();
    setReviews(body.data);
  };

  const renderReviews = () =>
    reviews.map((el) => {
      let stars = [];
      for (let i = 1; i <= el.rating; i++) {
        stars.push(<i style={{ color: "#B91319" }} class="fas fa-star"></i>);
      }
      for (let j = 1; j <= 5 - el.rating; j++) {
        stars.push(<i style={{ color: "#B91319" }} class="far fa-star"></i>);
      }
      let htmlStar = stars.map((item) => <span>{item}</span>);
      let timeReview = moment(el.createdAt).format("L LTS");
      return (
        <div key={el.id} className="container">
          <div className="container">
            <div className="d-flex justify-content-between">
              <p>
                User:
                <span className="font-weight-bold"> {el.user.name}</span>
              </p>
              <p className="ml-5">{timeReview}</p>
            </div>
            <p>Vote: {htmlStar}</p>
            <p>Review: {el.review}</p>
          </div>
          <hr />
        </div>
      );
    });
  return (
    <div>
      <h2>
        Products Rating: {props.ratingAverage}
        <i style={{ color: "#B91319" }} class="fas fa-star"></i>
      </h2>
      <p>
        Total Review: <span>{totalReview}</span>
      </p>
      <hr />
      {renderReviews()}
      <div className="d-flex justify-content-center mt-3">
        <Pagination
          className="pagination-style"
          activePage={activePage}
          itemsCountPerPage={5}
          totalItemsCount={totalReview}
          pageRangeDisplayed={5}
          onChange={handlePageChange}
          itemClass="page-item"
          linkClass="page-link"
        />
      </div>
    </div>
  );
}
