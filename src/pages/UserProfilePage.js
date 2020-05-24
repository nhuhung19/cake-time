import React from "react";

export default function UserProfilePage() {
  return (
    <div>
      <h4>My profile</h4>
      <p>Manage profile to save your account</p>
      <hr />
      <div>
        <form>
          <div class="form-group ">
            <label for="inputEmail4">Email</label>
            <input
              type="email"
              class="form-control"
              id="inputEmail4"
              placeholder="Email"
              disabled
            />
          </div>
          <div class="form-group ">
            <label for="inputName4">Name</label>
            <input
              type="text"
              class="form-control"
              id="inputName4"
              placeholder="Name"
              required
            />
          </div>

          <div class="form-row">
            <div class="form-group col-md-4">
              <label for="inputAddress">Address</label>
              <input
                type="text"
                class="form-control"
                id="inputAddress"
                placeholder="1234 Main St"
              />
            </div>
            <div class="form-group col-md-4">
              <label for="inputPhone">Phone Number</label>
              <input
                type="text"
                class="form-control"
                id="inputPhone"
                placeholder="Phone number"
              />
            </div>
            <div class="form-group col-md-4">
              <label for="inputCity">City</label>
              <input type="text" class="form-control" id="inputCity" placeholder="City"/>
            </div>
          </div>
          
          <button style={{backgroundColor :"#B91319"}} type="submit" class="btn text-white">
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
