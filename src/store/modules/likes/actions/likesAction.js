import API_ROUTE from "../../../../apiRoute";
import axios from 'axios'
import {  LIKE_CREATE_SUCCESS, LIKE_CREATE_ERROR, GET_LIKES_SUCCESS, GET_LIKES_ERROR, LIKE_DELETE_SUCCESS, LIKE_DELETE_ERROR, GET_AUTH_LIKE_SUCCESS, GET_AUTH_LIKE_ERROR } from '../likeTypes'
import  {history} from '../../../../history'


export const fetchLikes = id => {

  return async dispatch => {
    try {
      const res = await axios.get(`${API_ROUTE}/likes/${id}`)
      // console.log("this is the console likes: ", res.data.response)
      dispatch({ 
        type: GET_LIKES_SUCCESS, 
        payload: {
          postID: id,
          likes: res.data.response,
          // likesCount: res.data.response ? res.data.response.length : 0,
        }
      })
    } catch(err) {
      console.log("this is the error for the post: ", err.response.data.error)
      // dispatch({ type: GET_LIKES_ERROR, payload: err.response.data.error })
    }
  }
}

export const createLike = (details) => {
  console.log("this is the data to send: ", details)
  return async (dispatch) => {
    try {
      const res  = await axios.post(`${API_ROUTE}/likes/${details.post_id}`, details)
      console.log("this is the response: ", res.data.response )
      dispatch({ 
        type: LIKE_CREATE_SUCCESS, 
        payload: {
          postID: details.post_id,
          oneLike: res.data.response,
        }
      })
    } catch(err){
      console.log("this is the error for the post: ", err)
      // dispatch({ type: LIKE_CREATE_ERROR, payload: err.response.data.error })
    }
  }
}


export const deleteLike = id => {
  return async (dispatch) => {
    try {
      const res  = await axios.delete(`${API_ROUTE}/likes/${id}`)
      console.log("this is the response from the unlike: ", res.data.response.post_id)
      dispatch({ 
        type: LIKE_DELETE_SUCCESS, 
        payload: {
          postID: res.data.response.post_id,
          deletedLike: res.data.response 
        }
      })
    } catch(err){
      console.log("this is the error for the post: ", err.response.data.error)
      dispatch({ type: LIKE_DELETE_ERROR, payload: err.response.data.error })
    }
  }
}
