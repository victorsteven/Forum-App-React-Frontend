import { SET_CURRENT_USER, UPDATE_USER_AVATAR, UPDATE_USER_SUCCESS, UPDATE_USER_ERROR } from '../actions/types'
import isEmpty from 'lodash/isEmpty';
// import { initState } from './index'

const initState = {
  isAuthenticated: false,
  currentUser: {},
  loading: false
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

      case UPDATE_USER_AVATAR:
        console.log("updated avatar")
        return {
          ...state,
          currentUser: action.payload
      }

      case UPDATE_USER_SUCCESS:
        return {
          ...state,
          currentUser: action.payload
      }
      case UPDATE_USER_ERROR:
        return {
          ...state,
          updateError: action.payload
      }

      
      default:
        return state;
  }
}

export default authReducer