import { combineReducers } from "redux"
import authReducer  from './auth/reducer/authReducer'
import { fetchPosts }  from "./posts/reducer/postsReducer";
import { createPost, getPost } from './post/reducer/singlePostReducer'
import { likesState } from './likes/reducer/likesReducer'
import { commentsState } from './comments/reducer/commentsReducer'


const reducer = combineReducers({
  Auth: authReducer,
  FetchPosts: fetchPosts,
  CreatePost: createPost,
  FetchPost: getPost,
  LikesState: likesState,
  CommentsState: commentsState

})

export default reducer