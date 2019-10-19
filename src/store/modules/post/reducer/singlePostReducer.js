import { GET_POST_SUCCESS, GET_POST_ERROR, CREATE_POST, CREATE_POST_ERROR } from '../postTypes'

// export const initState = {
//   post: {}
// }

export const initState = {
  post: {},
}

export const getPost = (state = initState, action) => {
  switch(action.type) {
    case GET_POST_SUCCESS:
      return { 
        ...state, 
        post: action.payload 
      }
    case GET_POST_ERROR:
        return { 
          ...state, 
          postError: action.payload 
        }
    default:
      return state
  }
}

export const createPost = (state = {post: {}}, action) => {
  switch(action.type) {
    case CREATE_POST:
      return { 
        ...state, 
        post: action.payload 
      }
    case CREATE_POST_ERROR:
        return { 
          ...state, 
          postError: action.payload 
        }
    default:
      return state
  }
}