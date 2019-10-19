import { FETCH_POSTS } from '../postsTypes'

export const initState = {
  posts: [],
}

export const fetchPosts = (state = initState, action) => {
  if(action.type === FETCH_POSTS ) {
    state = { ...state, posts: action.payload }
  }
  return state;
}
