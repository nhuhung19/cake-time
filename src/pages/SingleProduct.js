import React from 'react'
import sweet_cake from "../../src/images/sweet-cake/sweet-cake.jpg";
import Comment from "../components/Comment"

export default function SingleProduct() {
  return (
  <div className="container mt-5">
    <div className="row ">
      <div  className="col-lg-3">
        <div style={{border: "1px solid #ddd"}} className="bg-white p-3 rounded-lg">
          <img className="w-100 rounded" src={sweet_cake} alt=""/>
        </div>
      </div>
      <div className="col-lg-9">
        <div style={{border: "1px solid #ddd"}} className="bg-white p-3 rounded-lg">
            <h2>Kiwi Cake</h2>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nam aliquam, dolores unde temporibus quia dolor debitis facere libero quae similique ducimus.</p>
            <hr/>
            <p></p>
            <p>Price: <span>$40.00</span> 
            <span className="ml-5">Avaibility: </span>
            <span className="ml-5">Rating Star: 5</span>
            <span ><i style={{ color: "#B91319" }} class="fas fa-star"></i></span>
            </p>
            <p>Owner: </p>
            <p>Average Vote: </p>
            <p><span>Quantity: </span><input type="number" value="1" min="0" max="1000" step="1"/></p>
            <p>Total:</p>
            <p>
              <button type="button" class="btn btn-outline-success">Add to cart</button>
              <button type="button" class="ml-3 btn btn-outline-info">Buy Now</button>
            </p>
        </div>
      </div>
    </div>
    <div className="rounded-lg bg-white my-5">
      <nav className="p-3">
        <div className="nav nav-tabs" id="nav-tab" role="tablist">
          <a className="nav-item nav-link active" id="nav-profile-tab" data-toggle="tab" href="#nav-comment" role="tab" aria-controls="nav-profile" aria-selected="false">Comment</a>
          <a className="nav-item nav-link " id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Description</a>
        </div>
      </nav>
      <div className="tab-content p-3" id="nav-tabContent">
        <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
          <p>- Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolore minima doloribus dolor sint dignissimos ipsa quod provident ab error impedit reprehenderit et veritatis temporibus, maxime veniam iste possimus consequatur unde.</p>
          <p>- Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolore minima doloribus dolor sint dignissimos ipsa quod provident ab error impedit reprehenderit et verita</p>
          <p>- Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolore minima doloribus dolor sint dignissimos ipsa quod provident ab error impedit reprehenderit et verita</p>
        </div>
        <div className="tab-pane fade" id="nav-comment" role="tabpanel" aria-labelledby="nav-profile-tab">
          <Comment />
        </div>
      </div>
    </div>
      <form className="rounded bg-white p-3">
        <div className="mb-3">
          <label for="validationTextarea">Write Comment</label>
          <textarea className="form-control " id="validationTextarea" placeholder="write review" required></textarea>
          <div className="invalid-feedback">
          Please enter a message in the textarea.
          </div>
        </div>
        <div class="input-group flex-nowrap ">
          <div class="input-group-prepend">
            <span class="input-group-text" id="addon-wrapping">Star</span>
          </div>
          <input type="number" min="1" max="5" class="form-control" placeholder="Rating" aria-label="Username" aria-describedby="addon-wrapping" required />
        </div>
        <button style={{ backgroundColor: "#B91319" }} className="btn text-light mt-2" type="submit">Review</button>
      </form>
  </div>
  )
}
