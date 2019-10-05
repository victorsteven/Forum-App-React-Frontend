import API_ROUTE from "../apiRoute";
import axios from 'axios'
import { CREATE_POST_SUCCESS, CREATE_POST_ERROR } from './types'
import  {history} from '../history'

// let token = localStorage.token ? localStorage.token : null
// const header = `Authorization: Bearer ${token}`;

export const fetchPosts = () => {
  return (dispatch) => {
    axios.get(`${API_ROUTE}/posts`).then(res => {
      dispatch({ type: "FETCH_POSTS", payload: res.data.response })
    }).catch(err => {
      console.log("This is the error: ", err)
    })
  }
}


export const createPost = (createPost) => {
  return (dispatch) => {
    axios.post(`${API_ROUTE}/posts`, createPost).then(res => {
      dispatch({ type: CREATE_POST_SUCCESS })
      history.push('/');
    }).catch(err => {
      console.log("this is the error for the post: ", err.response.data.error)
      dispatch({ type: CREATE_POST_ERROR, payload: err.response.data.error })
    })
  }
}