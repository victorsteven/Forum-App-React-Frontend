import API_ROUTE from "../apiRoute";
import axios from 'axios'
import setAuthorizationToken  from "../utils/authorization";
import { BEFORE_STATE, SIGNUP_SUCCESS, SIGNUP_ERROR, LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT_SUCCESS, UPDATE_USER_AVATAR, UPDATE_USER_SUCCESS, UPDATE_USER_ERROR, UPDATE_USER_AVATAR_ERROR, BEFORE_AVATAR_STATE, BEFORE_USER_STATE, CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_ERROR, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_ERROR } from './types'
import  {history} from '../history'

// export const setErrorState = 

// export const SetCurrentUser = (user) => {
//   return {
//     type: SET_CURRENT_USER,
//     user
//   };
// }

export const SignIn = (credentials) => {
  return async (dispatch) => {
      dispatch({ type: BEFORE_STATE }) 
    try {
      const res = await axios.post(`${API_ROUTE}/login`, credentials)
      let userData = res.data.response
      localStorage.setItem("token", userData.token)
      localStorage.setItem('user_data', JSON.stringify(userData));
      setAuthorizationToken(userData.token)
      dispatch({ type: LOGIN_SUCCESS, payload: userData })
    } catch(err) {
      dispatch({ type: LOGIN_ERROR, payload: err.response.data.error })
    }
  }
}

export const SignOut = () => {
  return (dispatch) => {
    localStorage.removeItem("token")
    setAuthorizationToken(false)
    dispatch({ type: LOGOUT_SUCCESS })
    window.localStorage.clear(); //update the localstorage
  }
}

export const SignUp = (newUser) => {
    return async (dispatch) => {
        dispatch({ type: BEFORE_STATE }) 
      try {
        await axios.post(`${API_ROUTE}/users`, newUser);
        dispatch({ type: SIGNUP_SUCCESS })
        history.push('/login');
      } catch(err) {
        dispatch({ type: SIGNUP_ERROR, payload: err.response.data.error })
    }
  }
}

export const updateUserAvatar = (updateUserAvatar) => {
  return async (dispatch, getState) => {
    dispatch({ type: BEFORE_AVATAR_STATE })
    const { id } = getState().Auth.currentUser
    try {
      const res = await axios.put(`${API_ROUTE}/avatar/users/${id}`, updateUserAvatar, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      });
      let updatedUser = res.data.response
      window.localStorage.setItem('user_data', JSON.stringify(updatedUser)); //update the localstorage
      dispatch({ type: UPDATE_USER_AVATAR, payload: updatedUser })
    } catch (err) {
      dispatch({ type: UPDATE_USER_AVATAR_ERROR, payload: err.response.data.error })
    }
  }
}

export const updateUser = (updateUser) => {

  return async (dispatch, getState) => {
    dispatch({ type: BEFORE_USER_STATE })
    const { currentUser } = getState().Auth
    try {
      const res = await axios.put(`${API_ROUTE}/users/${currentUser.id}`, updateUser);
      let updatedUser = res.data.response
      dispatch({ type: UPDATE_USER_SUCCESS, payload: updatedUser })
      window.localStorage.setItem('user_data', JSON.stringify(updatedUser)); //update the localstorages
      // history.push('/login');
    } catch (err) {
      dispatch({ type: UPDATE_USER_ERROR, payload: err.response.data.error })
    }
  }
}

export const ForgotPassword = (userEmail) => {

  return async (dispatch) => {
    dispatch({ type: BEFORE_STATE })
    try {
      const res = await axios.post(`${API_ROUTE}/password/forgot`, userEmail);
      let passwordRequest = res.data.response
      dispatch({ type: CHANGE_PASSWORD_SUCCESS, payload: passwordRequest })
      // window.localStorage.setItem('user_data', JSON.stringify(updatedUser)); //update the localstorages
      // history.push('/login');
    } catch (err) {
      dispatch({ type: CHANGE_PASSWORD_ERROR, payload: err.response.data.error })
    }
  }
}

export const ResetPassword = (details) => {

  return async (dispatch) => {
    
    dispatch({ type: BEFORE_STATE })
    try {
      const res = await axios.post(`${API_ROUTE}/password/reset`, details);
      let passwordRequest = res.data.response
      dispatch({ type: RESET_PASSWORD_SUCCESS, payload: passwordRequest })
      // window.localStorage.setItem('user_data', JSON.stringify(updatedUser)); //update the localstorages
      // history.push('/login');
    } catch (err) {
      dispatch({ type: RESET_PASSWORD_ERROR, payload: err.response.data.error })
    }
  }
}

