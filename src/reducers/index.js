import { combineReducers } from "redux"
import { createPost, fetchPosts }  from "./postsReducer";
import authReducer from "./authReducer";
import { updateUserAvatar } from "./usersReducer";





const reducer = combineReducers({
  Auth: authReducer,
  FetchPosts: fetchPosts,
  CreatePost: createPost,
  Avatar: updateUserAvatar
})

export default reducer