import { CREATE_POST, FETCH_POSTS, CREATE_POST_ERROR } from '../actions/types'

export const fetchPosts = (state = { posts: []}, action) => {
  if(action.type === FETCH_POSTS ) {
    state = { ...state, posts: action.payload }
  }
  return state;
}

export const createPost = (state = { post: {}}, action) => {
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
  // if(action.type === CREATE_POST ) {
  //   state = { ...state, post: action.payload }
  // }
  // return state;
}

// export default fetchPosts