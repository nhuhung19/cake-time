import React, { useState } from 'react'
import {Link, useHistory} from 'react-router-dom'

export default function RegisterPage() {
  const [newUser, setNewUser] = useState({})
  const history = useHistory()

  const handleChange = (e) => {
    setNewUser({...newUser, [e.target.name]: e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const url  = process.env.REACT_APP_SERVER + "/users"
    const res = await fetch(url, {
      method: "POST",
      headers:{
        "Content-Type" : "application/json"
      },
      body: JSON.stringify(newUser)
    })
    const body = await res.json()
    if(res.status === 201){
      alert("Register successfully, go to login")
      history.push("/login")
    }else {
      alert(`${body.error}`)
  }
  }


  return (
    <div>
      <div className="bg-login">
      <div className="container">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card card-signin my-5">
              <div className="card-body">
                <h5 className="card-title text-center">Register</h5>
                <form onChange={handleChange} onSubmit={handleSubmit} className="form-signin">
                  <div className="form-label-group">
                    <input name="name" type="text" className="form-control" placeholder="User name" required autofocus />
                  </div>
                  <div className="form-label-group">
                    <input name="email" type="email"  className="form-control" placeholder="Email address" required autofocus />
                  </div>

                  <div className="form-label-group">
                    <input name="password" type="password" className="form-control" placeholder="Password" required />
                  </div>
                  
                  <hr className="my-4" />
                  <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Register</button>
                  <div className="text-center mt-2"><Link  style={{fontSize:"16px"}} to="/login" >Login</Link></div>
                 
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}
