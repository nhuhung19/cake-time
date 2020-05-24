import React from "react";

export default function UserPasswordPage() {
  return (
    <div>
      <h4>Change Password</h4>
      <hr />
      <form>
        <div class="form-group row">
          <label for="inputPassword" class="col-sm-3 col-form-label">
            Curernt Password
          </label>
          <div class="col-sm-9">
            <input
              type="password"
              class="form-control"
              id="inputPassword"
              placeholder="Current Password"
              required
            />
          </div>
        </div>
        <div class="form-group row">
          <label for="inputPassword3" class="col-sm-3 col-form-label">
            New Password
          </label>
          <div class="col-sm-9">
            <input
              type="password"
              class="form-control"
              id="inputPassword3"
              placeholder="New Password"
              required
            />
          </div>
        </div>
        <div class="form-group row">
          <label for="inputComfirmPassword" class="col-sm-3 col-form-label">
            Comfirm Password
          </label>
          <div class="col-sm-9">
            <input
              type="password"
              class="form-control"
              id="inputComfirmPassword"
              placeholder="Comfirm Password"
              required
            />
          </div>
        </div>
        
        <div class="form-group row">
          <div class="col-sm-10">
            <button style={{backgroundColor :"#B91319"}} type="submit" class="btn text-white">
              Update
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
