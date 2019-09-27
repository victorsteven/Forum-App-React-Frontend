import { combineReducers } from "redux"
import fetchPosts from "./fetch_posts";


const reducer = combineReducers({
  FetchPosts: fetchPosts
})

export default reducer