import { combineReducers } from "redux"
import authReducer  from './auth/reducer/authReducer'
import { fetchPosts }  from "./posts/reducer/postsReducer";
import { createPost, getPost } from './post/reducer/singlePostReducer'
import { createLike, getLikes } from './likes/reducer/likesReducer'



const reducer = combineReducers({
  Auth: authReducer,
  FetchPosts: fetchPosts,
  CreatePost: createPost,
  FetchPost: getPost,
  CreateLike: createLike,
  GetLikes: getLikes
})


export default reducer