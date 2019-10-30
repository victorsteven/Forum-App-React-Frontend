import API_ROUTE from "../../../../apiRoute";
import axios from 'axios'
import {  COMMENT_CREATE_SUCCESS, COMMENT_CREATE_ERROR, GET_COMMENTS_SUCCESS, GET_COMMENTS_ERROR, COMMENT_DELETE_SUCCESS, COMMENT_DELETE_ERROR, COMMENT_UPDATE_SUCCESS, COMMENT_UPDATE_ERROR, BEFORE_STATE } from '../commentTypes'
import  {history} from '../../../../history'


export const fetchComments = id => {

  // console.log("this is the comment id sent: ", id)

  return async dispatch => {

    dispatch({ type: BEFORE_STATE }) 

    try {
      const res = await axios.get(`${API_ROUTE}/comments/${id}`)
      console.log("this is the console comments: ", res.data.response)
      dispatch({ 
        type: GET_COMMENTS_SUCCESS, 
        payload: {
          postID: id,
          comments: res.data.response,
        }
      })
    } catch(err) {
      console.log("this is the error for the comments: ", err.response.data.error)
      // dispatch({ type: GET_LIKES_ERROR, payload: err.response.data.error })
    }
  }
}


export const createComment = (details, toggle) => {
  console.log("this is the post id: ", details.post_id)
  return async (dispatch) => {

    dispatch({ type: BEFORE_STATE }) 

    try {
      const res  = await axios.post(`${API_ROUTE}/createcomment/${details.post_id}`, details)
      console.log("this is the response: ", res.data.response )
      dispatch({ 
        type: COMMENT_CREATE_SUCCESS, 
        payload: {
          postID: details.post_id,
          comment: res.data.response,
        }
      })
      toggle()
      history.push(`/posts/${details.post_id}`);

    } catch(err){
      console.log("this is the error for the post: ", err)
      // dispatch({ type: COMMENT_CREATE_ERROR, payload: err.response.data.error })
    }
  }
}


export const updateComment = (updateDetails, updateSuccess) => {

  console.log("this is the uodate comment: ", updateDetails)
  return async (dispatch) => {
    try {
      const res = await axios.put(`${API_ROUTE}/comments/${updateDetails.id}`, updateDetails)
      dispatch({ 
        type: COMMENT_UPDATE_SUCCESS,
        payload: {
          comment: res.data.response
        } 
      })
      updateSuccess()
    } catch(err) {
      console.log("this is the error for the update: ", err)
      dispatch({ type: COMMENT_UPDATE_ERROR, payload: err.response.data.error })
    }
  }
}

export const deleteComment = (details, deleteSuccess) => {

  return async (dispatch) => {
    try {
      const res = await axios.delete(`${API_ROUTE}/comments/${details.id}`)
      dispatch({ 
        type: COMMENT_DELETE_SUCCESS,
        payload: {
          id: details.id,
          postID: details.postID,
          message: res.data.response
        } 
      })
      deleteSuccess()

    } catch(err) {
      console.log("this is the error for the update: ", err)
      dispatch({ type: COMMENT_DELETE_ERROR, payload: err.response.data.error })
    }
  }
}
