const fetchPosts = (state = { posts: []}, action) => {
  if(action.type === "FETCH_POSTS") {
    state = { ...state, posts: action.payload }
  }
  return state;
}

export default fetchPosts