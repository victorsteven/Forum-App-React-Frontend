import { SINGLE_POST_SUCCESS, CREATE_POST, CREATE_POST_ERROR } from '../postTypes'

export const initState = {
  post: {}
}

export const getPost = (state = initState, action) => {
  if(action.type === SINGLE_POST_SUCCESS ) {
    state = { ...state, post: action.payload }
  }
  return state;
}

export const createPost = (state = initState.post, action) => {
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