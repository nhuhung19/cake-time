import React, { useEffect, useState } from "react";

export default function Review(props) {
  const [reviews, setReviews] = useState([]);
  const [totalReview, setTotalReview] = useState(0);
  
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
    // console.log(body);
  };

  const renderReviews = () =>
    reviews.map((el) => {
      let stars = [];
      for (let i = 1; i <= el.rating; i++) {
        stars.push(<i style={{ color: "#B91319" }} class="fas fa-star"></i>);
      }
      for(let j =1; j <= (5 - el.rating); j++){
        stars.push(<i style={{ color: "#B91319" }} class="far fa-star"></i>)
      }
      let htmlStar = stars.map((item) => <span>{item}</span>);
      return (
        <div className="container">
          
            <p>User: <span className="font-weight-bold">{el.user.name}</span></p>
            <p>Vote: {htmlStar}</p>
            <p>Review: {el.review}</p>
          
          <hr />
        </div>
      );
    });
  return (
    <div>
      <h2>Products Rating: {props.ratingAverage}<i style={{ color: "#B91319" }} class="fas fa-star"></i></h2>
      <p>
        Total Review: <span>{totalReview}</span>
      </p>
      <hr/>
      {renderReviews()}
    </div>
  );
}
