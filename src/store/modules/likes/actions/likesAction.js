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

export const createLike = id => {
  return async (dispatch) => {
    try {
      const res  = await axios.post(`${API_ROUTE}/likes/${id}`)
      dispatch({ 
        type: LIKE_CREATE_SUCCESS, 
        payload: {
          postID: id,
          oneLike: res.data.response,
        }
      })
    } catch(err){
      dispatch({ type: LIKE_CREATE_ERROR, payload: err.response.data.error })
    }
  }
}


export const deleteLike = details => {
  return async (dispatch) => {
    try {
      await axios.delete(`${API_ROUTE}/likes/${details.id}`)
      dispatch({ 
        type: LIKE_DELETE_SUCCESS, 
        payload: {
          likeID: details.id,
          postID: details.postID,
        }
      })
    } catch(err){
      dispatch({ type: LIKE_DELETE_ERROR, payload: err.response.data.error })
    }
  }
}
