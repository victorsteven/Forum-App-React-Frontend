import { combineReducers } from "redux"
import authReducer  from './auth/reducer/authReducer'
import { fetchPosts }  from "./posts/reducer/postsReducer";
import { createPost, getPost } from './post/reducer/singlePostReducer'
import { likesState } from './likes/reducer/likesReducer'



const reducer = combineReducers({
  Auth: authReducer,
  FetchPosts: fetchPosts,
  CreatePost: createPost,
  FetchPost: getPost,
  // CreateLike: createLike,
  LikesState: likesState
})


export default reducer