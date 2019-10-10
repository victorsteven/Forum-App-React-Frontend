import { SET_CURRENT_USER, UPDATE_USER_AVATAR, UPDATE_USER_SUCCESS, UPDATE_USER_ERROR, BEFORE_STATE, UPDATE_USER_AVATAR_ERROR } from '../actions/types'
import isEmpty from 'lodash/isEmpty';
// import { initState } from './index'

const initState = {
  isAuthenticated: false,
  currentUser: {},
  isLoading: false
}


const authReducer = (state = initState, action) => {
  switch(action.type) {

    // This is the state to set when the button is click and we are waiting for response 
    case BEFORE_STATE:
      return {
        ...state,
        isLoading: true
    }
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
          isLoading: false,
          currentUser: action.payload
      }

      case UPDATE_USER_SUCCESS:
        return {
          ...state,
          isLoading: false,
          currentUser: action.payload
      }
      case UPDATE_USER_ERROR:
        return {
          ...state,
          isLoading: false,
          updateError: action.payload
      }
      case UPDATE_USER_AVATAR_ERROR:
          return {
            ...state,
            isLoading: false
        }
      default:
        return state;
  }
}

export default authReducer