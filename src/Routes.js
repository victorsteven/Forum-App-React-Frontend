import React from 'react';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import CreatePost from './components/Posts/CreatePost';
import Dashboard from './components/dashboard/Dashboard';
import { history } from './history'
import { Router, Switch, Route } from 'react-router-dom';
import Profile from './components/Users/Profile';

const Routes  = () => {
    return (
      <Router history={history}>
        <div className="App">
          <Switch>
            <Route exact path='/' component={ Dashboard } />
            <Route path='/login' component={Login} />
            <Route path='/signup' component={Register} />
            <Route path='/createpost' component={CreatePost} />
            <Route path='/profile' component={Profile} />
          </Switch>
        </div>
      </Router>
    );
}

export default Routes;
