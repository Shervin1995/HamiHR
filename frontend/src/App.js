import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css"; 

import RoutesWithNavigation from './components/RoutesWithNavigation';
import Login from './components/login/login';
import OTP from './components/login/otp';


//
function App({history}) {
  return ( 
    <Switch>  
        <Route path='/' exact component={Login} /> 
        <Route path="/otp" exact component={OTP} />  
        <RoutesWithNavigation  history={history} />
    </Switch>
  );
}

export default App;
