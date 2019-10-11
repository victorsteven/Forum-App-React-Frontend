import { SIGNUP_SUCCESS, SIGNUP_ERROR, LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT_SUCCESS, UPDATE_USER_AVATAR, UPDATE_USER_SUCCESS, UPDATE_USER_ERROR, BEFORE_STATE, UPDATE_USER_AVATAR_ERROR, BEFORE_AVATAR_STATE, BEFORE_USER_STATE } from '../actions/types'
import isEmpty from 'lodash/isEmpty';

const initState = {
  isAuthenticated: false,
  currentUser: {},
  isLoading: false,
  isLoadingAvatar: false,
  isUpdatingUser: false
}

const authReducer = (state = initState, action) => {
  switch(action.type) {

    // This is the state to set when the button is click and we are waiting for response 
    case BEFORE_STATE:
      return {
        ...state,
        isLoading: true
      }
    case BEFORE_AVATAR_STATE:
        return {
          ...state,
          isLoadingAvatar: true
        }
    case BEFORE_USER_STATE:
      return {
        ...state,
        isUpdatingUser: true
      }
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        signupError: null
      }
    case SIGNUP_ERROR:
      return {
        ...state,
        isLoading: false,
        signupError: action.payload
      }
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        currentUser: action.payload,
        isAuthenticated: !isEmpty(action.payload),
        loginError: null
      }
    case LOGIN_ERROR:
      return {
        ...state,
        isLoading: false,
        loginError: action.payload
      }
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        currentUser: {},
      }
    case UPDATE_USER_AVATAR:
      return {
        ...state,
        isLoadingAvatar: false,
        currentUser: action.payload,
        updateAvatarError: null
      }
    case UPDATE_USER_AVATAR_ERROR:
        return {
          ...state,
          isLoadingAvatar: false,
          updateAvatarError: action.payload
      }
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        isUpdatingUser: false,
        currentUser: action.payload,
        updateError: null

      }
    case UPDATE_USER_ERROR:
      return {
        ...state,
        isUpdatingUser: false,
        updateError: action.payload
      }
    default:
      return state;
  }
}

export default authReducer