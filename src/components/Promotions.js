import React from 'react'
import sweet_cake from "../images/picture-birthday-cake.jpg"
import bread from "../images/bread-cake.jpg"
import savory_bread from "../images/savory-bread.jpg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressCard } from '@fortawesome/free-solid-svg-icons'
import { faGifts } from '@fortawesome/free-solid-svg-icons'
import { faShippingFast } from '@fortawesome/free-solid-svg-icons'

export default function Promotions() {
	return (
		<div className="my-5 promotions text-light">
			<div className="intro w-100 h-100">
				<h1 className="text-center my-5" style={{color:"#B91319"}}>Our Promotions</h1>
				<div className="container">
					<div className="row">
						<div className="col-lg-4 text-center">
							<div className="promotions-icon mx-auto rounded-circle d-flex align-items-center justify-content-center" style={{ width: "80px", height: "80px" }}>
								<FontAwesomeIcon style={{ fontSize: "40px" }} icon={faShippingFast} />
							</div>
							<h4 className="text-center">Home Delivery</h4>
							<p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor voluptatum, dolores rerum velit suscipit itaque maiores </p>
						</div>
						<div className="col-lg-4 text-center">
							<div className="mx-auto rounded-circle d-flex align-items-center justify-content-center" style={{ width: "80px", height: "80px", backgroundColor: "#B91319"}}>
								<FontAwesomeIcon style={{ fontSize: "40px" }} icon={faGifts} />
							</div>
							<h4 className="" >Gifts</h4>
							<p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor voluptatum, dolores rerum velit suscipit itaque maiores </p>
						</div>
						<div className="col-lg-4 text-center">
						<div className="promotions-icon mx-auto rounded-circle d-flex align-items-center justify-content-center" style={{ width: "80px", height: "80px" }}>
							<FontAwesomeIcon style={{ fontSize: "40px" }} icon={faAddressCard} />
						</div>
							<h4 className=""> Member Ship</h4>
							<p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolor voluptatum, dolores rerum velit suscipit itaque maiores </p>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
