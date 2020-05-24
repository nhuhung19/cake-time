import React from "react";

export default function PostProductPage() {
  return (
    <div>
      <h4>Post Product</h4>
      <p>Create product to take money</p>
      <hr />
      <div>
        <form>
          <div class="form-group ">
            <label for="inputTitle">Title</label>
            <input
              type="text"
              class="form-control"
              id="inputTitle"
              placeholder="Title"
              required
            />
          </div>
          <div class="form-group ">
            <label for="inputDesc">Description</label>
            <input
              type="text"
              class="form-control"
              id="inputDesc"
              placeholder="Description"
              required
            />
          </div>

          <div class="form-row">
            <div class="form-group col-md-4">
              <label for="inputStock">Stock</label>
              <input
                type="number"
                class="form-control"
                id="inputStock"
                placeholder="Stock"
              />
            </div>
            <div class="form-group col-md-4">
              <label for="inputPrice">Price</label>
              <input
                type="number"
                class="form-control"
                id="inputPrice"
                placeholder="Price"
              />
            </div>
            <div class="form-group col-md-4">
              <label for="inputPicture">Picture</label>
              <input
                type="text"
                class="form-control"
                id="inputPicture"
                placeholder="Picture"
              />
            </div>
          </div>

          <button
            style={{ backgroundColor: "#B91319" }}
            type="submit"
            class="btn text-white"
          >
            Post
          </button>
        </form>
      </div>
    </div>
  );
}
