import { combineReducers } from "redux"
import authReducer  from './auth/reducer/authReducer'
import { fetchPosts }  from "./posts/reducer/postsReducer";
import { createPost, getPost } from './post/reducer/singlePostReducer'


const reducer = combineReducers({
  Auth: authReducer,
  FetchPosts: fetchPosts,
  CreatePost: createPost,
  GetPost: getPost
})

export default reducer