import React from 'react'
import Swiper from 'react-id-swiper';
import savory_bread from "../images/savory-bread/savory-cake-3.jpg"
import savory_bread_img from "../images/savory-bread/savory-cake-2.jpg"

export default function SavoryBread(props) {
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
        <div className="mt-5 rounded">
        <h1 className="text-center font-weight-bold my-3" style={{ color: "#B91319" }}>
          {props.savoryBread? props.savoryBread.category : ""}
        </h1>
        <Swiper {...params}>
          <div><img className="w-100 h-100 rounded" src={savory_bread} alt="" /></div>
          <div><img className="w-100 h-100 rounded" src={savory_bread} alt="" /></div>
          <div><img className="w-100 h-100 rounded" src={savory_bread} alt="" /></div>
          <div><img className="w-100 h-100 rounded" src={savory_bread} alt="" /></div>
        </Swiper>
        
    </div>
    )
}
