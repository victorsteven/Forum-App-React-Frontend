import API_ROUTE from "../apiRoute";
import axios from 'axios'
import setAuthorizationToken  from "../utils/authorization";
import jwt from 'jsonwebtoken'
import { SET_CURRENT_USER } from './types'
import  {history} from '../history'
// import { push } from 'react-router-redux'

export const SetCurrentUser = (user) => {
  return {
    type: SET_CURRENT_USER,
    user
  };
}


export const SignIn = (credentials) => {
  return (dispatch) => {
    axios.post(`${API_ROUTE}/login`, credentials).then((res) => {
      let token = res.data.response
      localStorage.setItem("token", token)
      setAuthorizationToken(token)
      dispatch(SetCurrentUser(jwt.decode(token)))
      // history.push('/');
    }).catch(err => {
      dispatch({ type: "LOGIN_ERROR", payload: err.response.data.error })
    })
  }
}

export const SignOut = () => {
  return (dispatch) => {
    localStorage.removeItem("token")
    setAuthorizationToken(false)
    dispatch(SetCurrentUser({}))
    // axios.post(`${API_ROUTE}/logout`).then(res => {
    //   dispatch({ type: "SIGNOUT_SUCCESS"})
    // })
  }
}

export const SignUp = (newUser) => {
    return (dispatch) => {
    axios.post(`${API_ROUTE}/users`, newUser).then(res => {
      dispatch({ type: "SIGNUP_SUCCESS"})
      history.push('/login');
    }).catch(err => {
      dispatch({ type: "SIGNUP_ERROR", payload: err.response.data.error })
      console.log("this is the error: ", err.response.data.error)
    })
  }
}