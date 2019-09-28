const initState = {}

const authReducer = (state = initState, action) => {
  switch(action.type) {
    case 'LOGIN_ERROR':
      console.log("Login error");
      return {
        ...state,
        authError: 'login failed'
      }
      case 'LOGIN_SUCCESS':
        console.log("login success");
        return {
          ...state,
          authError: null
        }
      case 'SIGNOUT_SUCCESS':
        return state
      case 'SIGNUP_SUCCESS':
        console.log("Sign up success");
        return {
          ...state,
          authError: null
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