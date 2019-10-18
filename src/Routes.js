import React from 'react';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import CreatePost from './components/Posts/CreatePost';
import Dashboard from './components/dashboard/Dashboard';
import { history } from './history'
import { Router, Switch, Route } from 'react-router-dom';
import Profile from './components/Users/Profile';
import ForgotPassword from './components/Users/ForgotPassword/ForgotPassword.js';
import ResetPassword from './components/Users/ResetPassword';



const Routes  = () => {
    return (
      <Router history={history}>
        <div className="App">
          <Switch>
            <Route exact path='/' component={ Dashboard } />
            <Route path='/login' component={Login} />
            <Route path='/signup' component={Register} />
            <Route path='/createpost' component={CreatePost} />
            <Route path='/profile/:id' component={Profile} />
            <Route path='/forgotpassword' component={ForgotPassword} />
            <Route path='/resetpassword/:token' component={ResetPassword} />
          </Switch>
        </div>
      </Router>
    );
}

export default Routes;
