import React from 'react'
import {Link} from 'react-router-dom'

export default function RegisterPage() {
  return (
    <div>
      <div className="bg-login">
      <div class="container">
        <div class="row">
          <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div class="card card-signin my-5">
              <div class="card-body">
                <h5 class="card-title text-center">Register</h5>
                <form class="form-signin">
                  <div class="form-label-group">
                    <input type="text" id="inputUser" class="form-control" placeholder="User name" required autofocus />
                    <label for="inputUser">User Name</label>
                  </div>
                  <div class="form-label-group">
                    <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus />
                    <label for="inputEmail">Email address</label>
                  </div>

                  <div class="form-label-group">
                    <input type="password" id="inputPassword" class="form-control" placeholder="Password" required />
                    <label for="inputPassword">Password</label>
                  </div>
                  <div class="form-label-group">
                    <input type="password" id="inputComfirmPassword" class="form-control" placeholder="Comfirm Password" required />
                    <label for="inputComfirmPassword">Comfirm Password</label>
                  </div>
                  <hr class="my-4" />
                  <button class="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Register</button>
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
