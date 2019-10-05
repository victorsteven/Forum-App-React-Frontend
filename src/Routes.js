import React from 'react';
import Login from './containers/Auth/Login';
import Register from './containers/Auth/Register';
import CreatePost from './containers/Posts/CreatePost';
import Dashboard from './containers/dashboard/Dashboard';
import { history } from './history'
import { Router, Switch, Route } from 'react-router-dom';

const Routes  = () => {
    return (
      <Router history={history}>
        <div className="App">
          <Switch>
            <Route exact path='/' component={ Dashboard } />
            <Route path='/login' component={Login} />
            <Route path='/signup' component={Register} />
            <Route path='/createpost' component={CreatePost} />
          </Switch>
        </div>
      </Router>
    );
}

export default Routes;
