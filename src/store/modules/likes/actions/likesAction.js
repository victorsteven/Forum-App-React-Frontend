import API_ROUTE from "../../../../apiRoute";
import axios from 'axios'
import {  LIKE_CREATE_SUCCESS, LIKE_CREATE_ERROR, GET_LIKES_SUCCESS, GET_LIKES_ERROR, LIKE_DELETE_SUCCESS, LIKE_DELETE_ERROR } from '../likeTypes'

export const fetchLikes = id => {

  return async dispatch => {
    try {
      const res = await axios.get(`${API_ROUTE}/likes/${id}`)
      dispatch({ 
        type: GET_LIKES_SUCCESS, 
        payload: {
          postID: id,
          likes: res.data.response,
        }
      })
    } catch(err) {
      dispatch({ type: GET_LIKES_ERROR, payload: err.response.data.error })
    }
  }
}

export const createLike = (details) => {
  return async (dispatch) => {
    try {
      const res  = await axios.post(`${API_ROUTE}/likes/${details.post_id}`, details)
      dispatch({ 
        type: LIKE_CREATE_SUCCESS, 
        payload: {
          postID: details.post_id,
          oneLike: res.data.response,
        }
      })
    } catch(err){
      dispatch({ type: LIKE_CREATE_ERROR, payload: err.response.data.error })
    }
  }
}


export const deleteLike = id => {
  return async (dispatch) => {
    try {
      const res  = await axios.delete(`${API_ROUTE}/likes/${id}`)
      dispatch({ 
        type: LIKE_DELETE_SUCCESS, 
        payload: {
          postID: res.data.response.post_id,
          deletedLike: res.data.response 
        }
      })
    } catch(err){
      dispatch({ type: LIKE_DELETE_ERROR, payload: err.response.data.error })
    }
  }
}
