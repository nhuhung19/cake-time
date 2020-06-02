import React from 'react'
import {Route, Redirect} from "react-router-dom"

export default function NoMoreLogin({component: Component, ...props}) {
  return !props.user
  ? <Route {...props} render={() => <Component checkUser={props.checkUser} {...props}/>}/>
  : <Redirect to="/" />
}
