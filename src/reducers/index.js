import { combineReducers } from "redux"
import fetchPosts from "./fetch_posts";
import authReducer from "./authReducer";


const reducer = combineReducers({
  auth: authReducer,
  FetchPosts: fetchPosts
})

export default reducer