import React from 'react'
import bread from "../images/bread/bread-1.jpg"
import bread_img from "../images/bread/bread-2.jpg"
import Swiper from 'react-id-swiper';

export default function Bread() {
  const params = {
    slidesPerView: 5,
    spaceBetween: 30,
    slidesPerGroup: 1,
    loop: true,
    freeMode: true,
    loopFillGroupWithBlank: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
  }
  return (
    <div className="w-100 h-100 bg-white ">
      <h1 className="text-center font-weight-bold my-3" style={{ color: "#B91319" }}>Bread</h1>
      <Swiper {...params}>
          <div><img className="w-100 h-100 rounded" src={bread} alt="" /></div>
          <div><img className="w-100 h-100 rounded" src={bread} alt="" /></div>
          <div><img className="w-100 h-100 rounded" src={bread} alt="" /></div>
          <div><img className="w-100 h-100 rounded" src={bread} alt="" /></div>
          <div><img className="w-100 h-100 rounded" src={bread} alt="" /></div>
        </Swiper>
    </div>
  )
}
