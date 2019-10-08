import API_ROUTE from "../apiRoute";
import axios from 'axios'
import { UPDATE_USER_SUCCESS, UPDATE_USER_ERROR } from './types'
import  {history} from '../history'

// export const fetchPosts = () => {
//   return (dispatch) => {
//     axios.get(`${API_ROUTE}/posts`).then(res => {
//       dispatch({ type: "FETCH_POSTS", payload: res.data.response })
//     }).catch(err => {
//       console.log("This is the error: ", err)
//     })
//   }
// }

export const updateUserAvatar = (updateUserAvatar) => {
  return async (dispatch, getState) => {
    const { id } = getState().auth.currentUser
    try {
      const res = await axios.put(`${API_ROUTE}/avatar/users/${id}`, updateUserAvatar, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
      });
      console.log("this the response: ", res)
    } catch (err) {
      console.log("this is the response  err: ", err)
    }
    // try {
    //   const res = await axios.post(`${API_ROUTE}/users/${updateUser.id}`, updateUser, {
    //     headers: {
    //       'Content-Type': 'multipart/form-data'
    //     },
    //   }
    // } catch(err){
    //   console.log("this is the error for the post: ", err.response.data.error)
    //   dispatch({ type: UPDATE_USER_ERROR, payload: err.response.data.error })
    // }
  

    // axios.put(`${API_ROUTE}/users/${updateUser.id}`, updateUser, {
    //   headers: {
    //     'Content-Type': 'multipart/form-data'
    //   }
    // }).then(res => {
    //   // dispatch({ type: UPDATE_USER_SUCCESS })
    //   // history.push('/');
    //   console.log("this is the response upload: ", res.data.response)
    // }).catch(err => {
    //   console.log("this is the error for the post: ", err.response.data.error)
    //   dispatch({ type: UPDATE_USER_ERROR, payload: err.response.data.error })
    // })
  }
}


export const updateUser = (updateUser) => {
  return async (dispatch, getState) => {
    const { id } = getState().auth.currentUser
    try {
      const res = await axios.put(`${API_ROUTE}/users/${id}`, updateUser);
      console.log("this the response: ", res)
        dispatch({ type: UPDATE_USER_SUCCESS })
    } catch (err) {
      console.log("this is the response  err: ", err)
      dispatch({ type: UPDATE_USER_ERROR, payload: err.response.data.error })
    }
  }
}