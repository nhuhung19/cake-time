import React, { useEffect, useState } from "react";

export default function UserProfilePage(props) {
  // console.log(props.user)
  const [userProfile, setUserProfile] = useState({})
  useEffect(() => {
    getUserProfile()
  },[])
  const getUserProfile = async () => {
    const res = await fetch(process.env.REACT_APP_SERVER + "/users/profile",{
      method: "GET",
      headers: {
        authorization :`Bearer ${localStorage.getItem("token")}`
      }
    })
    const body = await res.json()
    setUserProfile(body.data)
    // console.log(body)
  }
  const handleChange = (e) => {
    setUserProfile({...userProfile, [e.target.name]: e.target.value})
  }
  // console.log(userProfile)
  const updateProfile = async (e) => {
    e.preventDefault()
    const res = await fetch(process.env.REACT_APP_SERVER + "/users/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization :`Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(userProfile),

    });
    const body = await res.json();
    if (res.status === 202) {
      alert("Post successfully");
    } else {
      alert(`${body.error}`);
    }
  }
  return (
    <div>
      <h4>My profile</h4>
      <p>Manage profile to save your account</p>
      <hr />
      <div>
        <form onChange={handleChange} onSubmit={updateProfile}>
          <div class="form-group ">
            <label for="inputEmail4">Email</label>
            <input
              type="email"
              class="form-control"
              value={userProfile.email}
              id="inputEmail4"
              placeholder="Email"
              disabled
            />
          </div>
          <div class="form-group ">
            <label for="inputName4">Name</label>
            <input
              type="text"
              value={userProfile.name}
              class="form-control"
              id="inputName4"
              placeholder="Name"
              disabled
            />
          </div>

          <div class="form-row">
            <div class="form-group col-md-4">
              <label for="inputAddress">Address</label>
              <input
                name="address"
                value={userProfile.address}
                type="text"
                class="form-control"
                id="inputAddress"
                placeholder="1234 Main St"
              />
            </div>
            <div class="form-group col-md-4">
              <label for="inputPhone">Phone Number</label>
              <input
                name="phone"
                value={userProfile.phone}
                type="text"
                class="form-control"
                id="inputPhone"
                placeholder="Phone number"
              />
            </div>
            <div class="form-group col-md-4">
              <label for="inputCity">City</label>
              <input value={userProfile.city} name="city" type="text" class="form-control" id="inputCity" placeholder="City"/>
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
