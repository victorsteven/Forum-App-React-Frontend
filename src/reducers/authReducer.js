import { SET_CURRENT_USER } from '../actions/types'
import isEmpty from 'lodash/isEmpty';

const initState = {
  isAuthenticated: false,
  currentUser: {}
}

const authReducer = (state = initState, action) => {
  switch(action.type) {
    case 'LOGIN_ERROR':
      return {
        ...state,
        authError: action.payload
      }
      case SET_CURRENT_USER:
        return {
          ...state, 
          currentUser: action.user,
          isAuthenticated: !isEmpty(action.user),
        }
      case 'SIGNOUT_SUCCESS':
        return state
      case 'SIGNUP_SUCCESS':
        console.log("Sign up success");
        return {
          ...state,
        }
      case 'SIGNUP_ERROR':
        console.log("Signup error")
        return {
          ...state,
          authError: action.payload
        }
      default:
        return state;
  }
}

export default authReducer