import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import Routes from './Routes';
import * as serviceWorker from './serviceWorker';
import { Provider } from "react-redux"
import store from './store/index'
import setAuthorizationToken  from './utils/authorization';
import { LOGIN_SUCCESS } from './store/modules/auth/authTypes';

//when the page reloads, the auth user is still set
if (localStorage.token){
  setAuthorizationToken(localStorage.token) 
  let userData = localStorage.getItem('user_data') == null ? null : JSON.parse(localStorage.getItem('user_data'))
  store.dispatch({ type: LOGIN_SUCCESS, payload: userData}) //provided he has a valid token 

}

ReactDOM.render(<Provider store={store}><Routes /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
