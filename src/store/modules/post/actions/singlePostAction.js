import API_ROUTE from "../../../../apiRoute";
import axios from 'axios'
import { GET_POST_SUCCESS, GET_POST_ERROR } from '../postTypes'


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
