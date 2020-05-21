import React, { useState } from 'react'
import {Link, useHistory} from 'react-router-dom'
export default function LoginPage(props) {
  const [userLogin, setUserLogin] = useState({})
  const history = useHistory()

  const handleChange = (e) => {
    setUserLogin({...userLogin, [e.target.name]: e.target.value})
  }

   const handleSubmit = async (e) => {
     e.preventDefault()
    const res = await fetch(process.env.REACT_APP_SERVER + "/auth/login", {
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userLogin)
    })
    const body = await res.json()
    if(res.status === 201){
      localStorage.setItem("token", body.data.jsonToken)
      props.setUser(body.data.user)
      history.push("/")
    } else {
      alert(`${body.error}`)
    }
   }

  return (
    <div className="bg-login">
      <div className="container">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card card-signin my-5">
              <div className="card-body">
                <h5 className="card-title text-center">Sign In</h5>
                <form onSubmit={handleSubmit} onChange={handleChange} className="form-signin">
                  <div className="form-label-group">
                    <input type="email" name="email" className="form-control" placeholder="Email address" required autoFocus />
                  </div>

                  <div className="form-label-group">
                    <input type="password" name="password" className="form-control" placeholder="Password" required />
                  </div>

                  <div className="custom-control d-flex justify-content-between custom-checkbox mb-3">
                    <div>
                    <input type="checkbox" className="custom-control-input" id="customCheck1" />
                    <label className="custom-control-label" for="customCheck1">Remember password</label>
                    </div>
                    <div><Link className="mr-2" style={{fontSize:"16px"}} to="/register" >Sign Up</Link></div>
                   
                  </div>
                  <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Sign in</button>
                  <hr className="my-4" />
                </form>
                  <a style={{textDecoration: "none"}} href={`${process.env.REACT_APP_SERVER}/auth/facebook`}><button className="btn btn-lg btn-facebook btn-block rounded-pill py-3" type="submit"><i className="fab fa-facebook-f mr-2"></i> Sign in with Facebook</button></a>
                  <a style={{textDecoration: "none"}} href={`${process.env.REACT_APP_SERVER}/auth/google`}><button style={{backgroundColor: "#ea4335", color: "white", fontSize:"16px"}} className="btn btn-lg button-google btn-block rounded-pill py-3 mt-2" type="submit"><i className="fab fa-google mr-2"></i> Sign in with Google</button></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
