import React, { useState, useEffect } from "react";
import Pagination from "react-js-pagination";
import Swal from "sweetalert2";

export default function UserProductsPage() {
  const [userProducts, setUserProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  let [activePage, setActivePage] = useState(1);
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
    console.log(body.data.userProducts, "page");
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

  const onDeleteProduct = async (pId) => {
    console.log(pId);
    const res = await fetch(process.env.REACT_APP_SERVER + `/products/${pId}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (res.status === 204) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Delete product success",
        showConfirmButton: false,
        timer: 1800,
      });
      getProductsByUser();
    }
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
              <i style={{ cursor: "pointer" }} className="fas fa-edit"></i>
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
      <h1>You don't have data yet!</h1>
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
