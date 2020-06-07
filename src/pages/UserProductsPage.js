import React, { useState, useEffect } from "react";
import Pagination from "react-js-pagination";
import { Modal, Button } from "react-bootstrap";
import Swal from "sweetalert2";

export default function UserProductsPage() {
  const [userProducts, setUserProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [product, setProduct] = useState({});
  const [productEdit, setProductEdit] = useState({});
  let [activePage, setActivePage] = useState(1);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    getProductsByUser();
  }, []);

  const getProductsByUser = async () => {
    const res = await fetch(
      process.env.REACT_APP_SERVER + "/products/user?page=1&limit=10",
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const body = await res.json();
    setTotalProducts(body.countProducts);
    setUserProducts(body.data.userProducts);
    // console.log(body.data.userProducts, "page");
  };
  const handlePageChange = async (pageNumber) => {
    setActivePage(pageNumber);
    const res = await fetch(
      process.env.REACT_APP_SERVER +
        `/products/user?page=${pageNumber}&limit=10`,
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const body = await res.json();

    setUserProducts(body.data.userProducts);
  };

  const getProduct = async (pId) => {
    handleShow();
    const res = await fetch(process.env.REACT_APP_SERVER + `/products/${pId}`);
    const body = await res.json();
    const { title, stock, description, image, price, id } = body.data;
    const {category} = body.data.category
    // console.log(body.data);
    setProduct({ title, stock, description, image, price, id, category });
  };

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };
  const editProduct = async (e,productId) => {
    e.preventDefault();
   
    document.getElementById("editButton").disabled = true;
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
    if (res.status === 400) {
      console.log(res);
    }
    const data = await res.json();
    const dataProduct = { ...product, image: data.data.link || product.image };
    console.log(dataProduct, productId);
    const response = await fetch(
      process.env.REACT_APP_SERVER + `/products/${productId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(dataProduct),
      }
    );
    const body = await response.json();
    if (response.status === 202) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Post product success",
        showConfirmButton: false,
        timer: 1500,
      });
      await getProductsByUser()
      document.getElementById("editButton").disabled = false;
      handleClose();
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${body.error}`,
      });
    }
  };

  const onDeleteProduct = async (pId) => {
    // console.log(pId);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.value) {
        const res = await fetch(
          process.env.REACT_APP_SERVER + `/products/${pId}`,
          {
            method: "DELETE",
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (res.status === 204) {
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
          await getProductsByUser();
        }
      }
    });
  };

  let htmlProducts =
    userProducts.length !== 0 ? (
      userProducts.map((el) => {
        return (
          <tr key={el.id}>
            <th scope="row">{el.title}</th>
            <td>{el.category.category}</td>
            <td>{el.price}</td>
            <td>{el.ratingAverage}</td>
            <td>{el.stock}</td>
            <td>
              <i
                style={{ cursor: "pointer" }}
                onClick={() => getProduct(el.id)}
                className="fas fa-edit"
              ></i>
            </td>
            <td>
              <i
                style={{ cursor: "pointer" }}
                onClick={() => onDeleteProduct(el.id)}
                className="fas fa-trash-alt"
              ></i>
            </td>
          </tr>
        );
      })
    ) : (
      <h6 className="mt-5 text-center">You don't have data yet!</h6>
    );
  return (
    <div>
      <table className="table">
        <thead style={{ backgroundColor: "#B91319" }} className="text-light">
          <tr>
            <th scope="col">Product</th>
            <th scope="col">Category</th>
            <th scope="col">Price</th>
            <th scope="col">Rating</th>
            <th scope="col">Stock</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>{htmlProducts}</tbody>
      </table>
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Product</Modal.Title>
          </Modal.Header>
          <form onChange={handleChange} onSubmit={(e) => editProduct(e, product.id)}>
            <Modal.Body>
              <div className="form-group ">
                <label htmlFor="inputTitle">Title</label>
                <input
                  type="text"
                  name="title"
                  value={product.title}
                  className="form-control"
                  id="inputTitle"
                  required
                />
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="inputDesc">Description</label>
                  <input
                    type="text"
                    name="description"
                    value={product.description}
                    className="form-control"
                    id="inputDesc"
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="inputCategory">Category</label>
                  <input
                    type="text"
                    name="category"
                    value={product.category}
                    className="form-control"
                    id="inputCategory"
                    disabled
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="inputStock">Stock</label>
                  <input
                    type="number"
                    value={product.stock}
                    name="stock"
                    className="form-control"
                    id="inputStock"
                  />
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="inputPrice">Price</label>
                  <input
                    type="number"
                    name="price"
                    value={product.price}
                    className="form-control"
                    id="inputPrice"
                  />
                </div>
              </div>
              <div class="form-group">
                <div className="row w-100">
                  <div className="col-lg-6 flex-column d-flex justify-content-end mb-2">
                    <div className="my-2">Image</div>
                    <div>
                      <input
                        type="file"
                        name="image"
                        id="upload_form"
                        accept="image/png, image/jpeg"
                      />
                    </div>
                  </div>
                  <div className="my-2 col-lg-6 d-flex justify-content-center">
                    <img className="w-50" src={product.image} alt="" />
                  </div>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <button
                style={{ backgroundColor: "#B91319" }}
                type="submit"
                className="btn text-white"
                id="editButton"
              >
                Post
              </button>
            </Modal.Footer>
          </form>
        </Modal>
      </>
      <div className="d-flex justify-content-center w-100 mt-4">
        <Pagination
          className="pagination-style"
          activePage={activePage}
          itemsCountPerPage={10}
          totalItemsCount={totalProducts}
          pageRangeDisplayed={5}
          onChange={handlePageChange}
          itemClass="page-item"
          linkClass="page-link"
        />
      </div>
    </div>
  );
}
