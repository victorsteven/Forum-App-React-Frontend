import API_ROUTE from "../../../../apiRoute";
import axios from 'axios'
import {  LIKE_POST_SUCCESS, LIKE_POST_ERROR, GET_LIKES_SUCCESS, GET_LIKES_ERROR } from '../likeTypes'
import  {history} from '../../../../history'


export const fetchLikes = id => {
  return async dispatch => {
    try {
      const res = await axios.get(`${API_ROUTE}/getlikes/${id}`)

      console.log("post id to fetch like: ", id)
      console.log("The post like: ", res.data.response)

      dispatch({ 
        type: GET_LIKES_SUCCESS, 
        payload: {
          postID: id,
          likes: res.data.response
        }
      })
    } catch(err) {
      console.log("this is the error for the post: ", err.response.data.error)
      // dispatch({ type: GET_LIKES_ERROR, payload: err.response.data.error })
    }
  }
}

export const createLike = (details) => {
  console.log("this is the post id: ", details.post_id)
  return async (dispatch) => {
    try {
      const res  = await axios.post(`${API_ROUTE}/createlike/${details.post_id}`, details)
      console.log("this is the response: ", res.data.response )
      // dispatch({ type: LIKE_POST_SUCCESS, payload: res.data.response })
    } catch(err){
      console.log("this is the error for the post: ", err)
      // dispatch({ type: LIKE_POST_ERROR, payload: err.response.data.error })
    }
  }
}
