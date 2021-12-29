import "./App.css";
import React, { Component } from 'react';
import {  Route, Switch } from 'react-router-dom';
import UserRegistration from "./components/UserRegistration";
import UserLogin from "./components/UserLogin";
import ForgetPassword from "./components/ForgetPassword"


function App() {
  return(
    <main>
            <Switch>
                <Route path="/" component={UserRegistration} exact />
                <Route path="/login" component={UserLogin} />
                
                <Route path="/forgetPassword" component={ForgetPassword} />
            </Switch>
        </main>
  )
 
}

export default App;
