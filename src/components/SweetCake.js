import React, { useEffect } from 'react'
import sweet_cake from "../images/sweet-cake/sweet-cake.jpg"
import sweet_cake_1 from "../images/sweet-cake/sweet-cake-1.jpg";
import Swiper from 'react-id-swiper';

export default function SweetCake() {
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
    <div className="w-100 h-100">
      <h1 className="text-center font-weight-bold my-3" style={{ color: "#B91319" }}>Sweet Cake</h1>
      <Swiper {...params}>
        <div><img className="w-100 h-100 rounded" src={sweet_cake} alt="" /></div>
        <div><img className="w-100 h-100 rounded" src={sweet_cake} alt="" /></div>
        <div><img className="w-100 h-100 rounded" src={sweet_cake} alt="" /></div>
        <div><img className="w-100 h-100 rounded" src={sweet_cake} alt="" /></div>
        <div><img className="w-100 h-100 rounded" src={sweet_cake} alt="" /></div>
      </Swiper>
      
    </div>
  )
}
