import { combineReducers } from "redux"
import authReducer  from './auth/reducer/authReducer'
import { postsState }  from "./posts/reducer/postsReducer";
import { getPost } from './post/reducer/singlePostReducer'
import { likesState } from './likes/reducer/likesReducer'
import { commentsState } from './comments/reducer/commentsReducer'


const reducer = combineReducers({
  Auth: authReducer,
  PostsState: postsState,
  FetchPost: getPost,
  LikesState: likesState,
  CommentsState: commentsState

})

export default reducer