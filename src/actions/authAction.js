import API_ROUTE from "../apiRoute";
import axios from 'axios'
import setAuthorizationToken  from "../utils/authorization";
import jwt from 'jsonwebtoken'
import { SET_CURRENT_USER } from './types'

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
      // dispatch({ type: "LOGIN_SUCCESS", payload: res.data.response })
      dispatch(SetCurrentUser(jwt.decode(token)))
      console.log("this is the decoded:", jwt.decode(token))
      
    }).catch(err => {
      // dispatch({ type: "LOGIN_ERROR", payload: err.response.data.error })
      console.log("this is the error for auth: ", err)
    })
  }
}

export const SignOut = () => {
  return (dispatch) => {
    axios.post(`${API_ROUTE}/logout`).then(res => {
      dispatch({ type: "SIGNOUT_SUCCESS"})
    })
  }
}

export const SignUp = (newUser) => {
    return (dispatch) => {
    axios.post(`${API_ROUTE}/users`, newUser).then(res => {
      dispatch({ type: "SIGNUP_SUCCESS"})
    }).catch(err => {
      dispatch({ type: "SIGNUP_ERROR", payload: err.response.data.error })
      console.log("this is the error: ", err.response.data.error)
    })
  }
}

// export const signupAction = () => {
//   return (dispatch) => {
//     axios.post(`${API_ROUTE}/users`).then(res => {
//       dispatch({ type: "USER_SIGNUP", payload: res.data.response })
//     }).catch(err => {
//       dispatch({ type: "USER_SIGNUP_ERROR", payload: err.response.data.error })
//     })
//   }
// }