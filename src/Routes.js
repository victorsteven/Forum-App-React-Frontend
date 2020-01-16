import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';

import Login from './components/auth/Login';
import Register from './components/auth/Register';
import CreatePost from './components/posts/CreatePost';
import Dashboard from './components/Dashboard';
import { history } from './history'
import Profile from './components/users/Profile';
import ForgotPassword from './components/users/ForgotPassword.js';
import ResetPassword from './components/users/ResetPassword';
import PostDetails from './components/posts/PostDetails'
import AuthPosts from './components/posts/AuthPosts'



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
            <Route path='/posts/:id' component={PostDetails} />
            <Route path='/authposts' component={AuthPosts} />
          </Switch>
        </div>
      </Router>
      
    );
}

export default Routes;

