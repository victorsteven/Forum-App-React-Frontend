import API_ROUTE from "../apiRoute";
import axios from 'axios'

export const signIn = (credentials) => {
  return (dispatch) => {
    axios.post(`${API_ROUTE}/login`, credentials).then(() => {
      dispatch({ type: "LOGIN_SUCCESS"})
    }).catch(err => {
      // dispatch({ type: "LOGIN_ERROR", payload: err.response.data.error })
      dispatch({ type: "LOGIN_ERROR", payload: err })
    })
  }
}

export const signOut = () => {
  return (dispatch) => {
    axios.post(`${API_ROUTE}/logout`).then(res => {
      dispatch({ type: "SIGNOUT_SUCCESS"})
    })
  }
}

export const SignUp = (newUser) => {
    return (dispatch) => {
    axios.post(`${API_ROUTE}/users`, newUser).then(() => {
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