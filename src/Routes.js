import React from 'react';
import Login from './containers/Auth/Login';
import SignUp from './containers/Auth/Signup';
import Dashboard from './containers/dashboard/Dashboard';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

const Routes  = () => {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path='/' component={ Dashboard } />
            <Route path='/login'component={Login} />
            <Route path='/signup'component={SignUp} />
          </Switch>
        </div>
      </BrowserRouter>
    );
}

export default Routes;
