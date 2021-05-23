import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";

export default function PostProductPage(props) {
  const [categorys, setCategory] = useState([]);
  const [product, setProduct] = useState({});
  const history = useHistory();
  useEffect(() => {
    checkUser();
    getCategory();
  }, []);
  const getCategory = async () => {
    const res = await fetch(process.env.REACT_APP_SERVER + "/categorys");
    const body = await res.json();
    setCategory(body.data);
  };
  const checkUser = () => {
    if (!props.user) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You must login first!',
      })
      history.push("/")
    }
  };
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };
  const createProduct = async (e) => {
    try{
      e.preventDefault();
      document.getElementById('submitButton').disabled = true;
      const selectedFile = document.getElementById("upload_form").files[0];
      var formdata = new FormData();
      formdata.append("image", selectedFile);
      const res = await fetch("https://api.imgur.com/3/image", {
        method: "POST",
        headers: {
          Authorization: `Client-ID ${process.env.REACT_APP_UPLOAD}`,
        },
        body: formdata,
      });
      if (res.ok) {
        const data = await res.json();
        const dataProduct = { ...product, image: data.data.link };
        if (data.success) {
          const res = await fetch(process.env.REACT_APP_SERVER + "/products", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(dataProduct),
          });
          const body = await res.json();
          if (res.status === 201) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Post product success",
              showConfirmButton: false,
              timer: 1500,
            });
            document.getElementById('submitButton').disabled = false;
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: `${body.error}`,
            })
          }
        } else {
          console.log("cannot upload because of", data.message);
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong',
        })
      }
    }catch(error){
      console.log(error)
    }
    
  };
  return (
    <div>
      <h4>Post Product</h4>
      <p>Create product to take money</p>
      <hr />
      <div>
        <form onChange={handleChange} onSubmit={createProduct}>
          <div className="form-group ">
            <label htmlFor="inputTitle">Title</label>
            <input
              type="text"
              name="title"
              className="form-control"
              id="inputTitle"
              placeholder="Title"
              required
            />
          </div>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="inputDesc">Description</label>
              <input
                type="text"
                name="description"
                className="form-control"
                id="inputDesc"
                placeholder="Description"
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputState">Type</label>
              <select name="category" id="inputState" className="form-control">
                <option>Choose...</option>
                <option value={categorys[2] ? categorys[2].id : ""}>
                  Pastry
                </option>
                <option value={categorys[0] ? categorys[0].id : ""}>
                  Bread
                </option>
                <option value={categorys[1] ? categorys[1].id : ""}>
                  Savory Bread
                </option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="inputStock">Stock</label>
              <input
                type="number"
                name="stock"
                className="form-control"
                id="inputStock"
                placeholder="Stock"
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputPrice">Price</label>
              <input
                type="number"
                name="price"
                className="form-control"
                id="inputPrice"
                placeholder="Price"
              />
            </div>
          </div>
          <div class="form-group">
            <div>Image</div>
            <input
              type="file"
              name="image"
              className=""
              id="upload_form"
              accept="image/png, image/jpeg"
            />
          </div>

          <button
            style={{ backgroundColor: "#B91319" }}
            type="submit"
            className="btn text-white"
            id="submitButton"
          >
            Post
          </button>
        </form>
      </div>
    </div>
  );
}
