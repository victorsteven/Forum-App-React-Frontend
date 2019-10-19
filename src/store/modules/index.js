import { combineReducers } from "redux"
import authReducer  from './auth/reducer/authReducer'
import { fetchPosts }  from "./posts/reducer/postsReducer";
import { createPost, getPost } from './post/reducer/singlePostReducer'

// console.log("this is the get post: ", getPost)


const reducer = combineReducers({
  Auth: authReducer,
  FetchPosts: fetchPosts,
  CreatePost: createPost,
  FetchPost: getPost
})

// console.log("this is the reducer: ", reducer)


export default reducer