import API_ROUTE from "../../../../apiRoute";
import axios from 'axios'
import { CREATE_POST_SUCCESS, CREATE_POST_ERROR, GET_POST_SUCCESS, GET_POST_ERROR, UPDATE_POST_SUCCESS, UPDATE_POST_ERROR } from '../postTypes'
import  {history} from '../../../../history'


export const fetchPost = id => {
  return async (dispatch) => {
    try {
      const res  = await axios.get(`${API_ROUTE}/posts/${id}`)
      dispatch({ type: GET_POST_SUCCESS, payload: res.data.response })
    } catch(err){
      console.log("this is the error for the post: ", err.response.data.error)
      dispatch({ type: GET_POST_ERROR, payload: err.response.data.error })
    }
  }
}

export const createPost = (createPost) => {
  return async (dispatch) => {
    try {
      await axios.post(`${API_ROUTE}/posts`, createPost)
      dispatch({ type: CREATE_POST_SUCCESS })
      history.push('/');
    } catch(err) {
      dispatch({ type: CREATE_POST_ERROR, payload: err.response.data.error })
    }
  }
}




