import React from 'react';
import HomePage from './pages/HomePage'
import {Switch, Route} from 'react-router-dom'
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import './css/login.css'
import './App.css';

function App() {
  return (
    <div>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/login" exact component={LoginPage}/>
        <Route path="/register" exact component={RegisterPage}/>
      </Switch>
    </div>
   
  );
}

export default App;
