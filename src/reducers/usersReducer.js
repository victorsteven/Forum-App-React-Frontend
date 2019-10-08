import { UPDATE_USER_SUCCESS, UPDATE_USER_ERROR } from '../actions/types'

// export const fetchPosts = (state = { posts: []}, action) => {
//   if(action.type === FETCH_POSTS ) {
//     state = { ...state, posts: action.payload }
//   }
//   return state;
// }

export const updateUserAvatar = (state = { user: {}}, action) => {
  switch(action.type) {
    case UPDATE_USER_SUCCESS:
      return { 
        ...state, 
        user: action.payload 
      }
    case UPDATE_USER_ERROR:
        return { 
          ...state, 
          userError: action.payload 
        }
    default:
      return state
  }
}

// export default fetchPosts