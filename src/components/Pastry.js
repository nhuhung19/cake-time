import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export default function Pastry(props) {
  const [products, setProducts] = useState([]);
  const category = props.pastry;

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
    },
  };
  useEffect(() => {
    getNewProductsByCategory();
  }, []);

  const getNewProductsByCategory = async (cId) => {
    const res = await fetch(
      process.env.REACT_APP_SERVER +
        `/products/category/${category.id}?page=1&limit=8`
    );
    const body = await res.json();
    setProducts(body.data.products);
  };

  let htmlProducts = () =>
    products.map((el) => {
      return (
        <div className=" h-100 px-3" key={el.id}>
          <div>
            <Link to={`/category/${category.id}/products/${el.id}`}>
              <img className="img w-100 rounded" src={el.image} alt="" />
            </Link>
            <div style={{color: "#B91319"}} className="text-center mt-2">{el.title}</div>
            <div className="text-center">Price: <span style={{ color: "#03CEA4" }}>${el.price}</span></div>
          </div>
        </div>
      );
    });
  return (
    <div className="w-100 h-100">
      <h1 className="text-center font-weight-bold">
        <Link className="px-2 sm-link sm-link_padding-all sm-link1"
          style={{ textDecoration: "none", color: "#B91319" }}
          to={`/category/${category.id}/products`}
        >
          <span class="sm-link__label">{category.category}</span>
        </Link>
      </h1>
      
      <div
        className="px-4 pt-4 rounded-lg shadow carousel-cake"
        style={{ backgroundColor: "white" }}
      >
        {/* <div className="mb-3" style={{height :"1px" ,backgroundColor: "#B91319"}}> </div> */}
        <Carousel
          swipeable={false}
          responsive={responsive}
          ssr={true} // means to render carousel on server-side.
          infinite={true}
          autoPlay={true}
          centerMode={false}
          autoPlaySpeed={2500}
          keyBoardControl={true}
          focusOnSelect={true}
          customTransition="all 1s linear"
          transitionDuration={2000}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
        >
          {htmlProducts()}
        </Carousel>
        
      </div>
    </div>
  );
}
