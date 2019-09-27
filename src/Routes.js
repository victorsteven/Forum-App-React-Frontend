import React from "react";
import { Route, Switch } from 'react-router-dom'

import App from './App';
import Login from './containers/Auth/Login'
import Signup from './containers/Auth/Signup'

const Routes = (
  <Switch>
      <Route exact path="/" component={App} />
      <Route  path="/login" component={Login} />
      <Route  path="/signup" component={Signup} />
  </Switch>
)

export default Routes;