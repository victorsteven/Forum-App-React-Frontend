import API_ROUTE from "../../../../apiRoute";
import axios from 'axios'
import { CREATE_POST_SUCCESS, CREATE_POST_ERROR, GET_POST_SUCCESS, GET_POST_ERROR } from '../postTypes'
import  {history} from '../../../../history'

export const getPost = id => {
  return (dispatch) => {
    axios.get(`${API_ROUTE}/posts/${id}`).then(res => {
      dispatch({ type: GET_POST_SUCCESS })
    }).catch(err => {
      console.log("this is the error for the post: ", err.response.data.error)
      dispatch({ type: GET_POST_ERROR, payload: err.response.data.error })
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