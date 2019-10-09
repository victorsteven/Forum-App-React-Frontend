import { UPDATE_USER_SUCCESS, UPDATE_USER_ERROR, UPDATE_USER_AVATAR } from '../actions/types'
// import { initState } from './index'
import { store } from '../store/index'


// export const fetchPosts = (state = { posts: []}, action) => {
//   if(action.type === FETCH_POSTS ) {
//     state = { ...state, posts: action.payload }
//   }
//   return state;
// }

// const currentstate = store.getState()

export const updateUserAvatar = (state = {}, action) => {
  // console.log("this is the current state from the reducer: ", currentstate)
  switch(action.type) {
    case UPDATE_USER_AVATAR:
      return { 
        ...state, 
        avatarUser: action.user 
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