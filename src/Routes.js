import React from 'react';
import Login from './containers/Auth/Login';
import Register from './containers/Auth/Register';
import Dashboard from './containers/dashboard/Dashboard';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

const Routes  = () => {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact path='/' component={ Dashboard } />
            <Route path='/login' component={Login} />
            <Route path='/signup' component={Register} />
          </Switch>
        </div>
      </BrowserRouter>
    );
}

export default Routes;
