import { GET_POST_SUCCESS, GET_POST_ERROR, CREATE_POST, CREATE_POST_ERROR, LIKE_POST_SUCCESS, LIKE_POST_ERROR, GET_LIKES_SUCCESS, GET_LIKES_ERROR } from '../postTypes'

export const initPost = {
  post: {},
}
export const initLikes = {
  likeItem : []
}

export const getPost = (state = { post: {}}, action) => {
  switch(action.type) {
    case GET_POST_SUCCESS:
      return { 
        ...state, 
        post: action.payload 
      }
    case GET_POST_ERROR:
        return { 
          ...state, 
          postError: action.payload 
        }
    default:
      return state
  }
}

export const getLikes = (state = initLikes, action) => {
  const { payload, type }  = action;
  switch(type) {
    case GET_LIKES_SUCCESS:
      return { 
        ...state, 
        likeItem: [...state.likeItem, { postID: payload.postID, likes: payload.likes} ]
      }
    case GET_LIKES_ERROR:
        return { 
          ...state, 
          likesError: action.payload 
        }
    default:
      return state
  }
}

export const createLike = (state = initLikes, action) => {
  switch(action.type) {
    case LIKE_POST_SUCCESS:
      return { 
        ...state, 
        post: action.payload 
      }
    case LIKE_POST_ERROR:
        return { 
          ...state, 
          postError: action.payload 
        }
    default:
      return state
  }
}

export const createPost = (state = initPost, action) => {
  switch(action.type) {
    case CREATE_POST:
      return { 
        ...state, 
        post: action.payload 
      }
    case CREATE_POST_ERROR:
        return { 
          ...state, 
          postError: action.payload 
        }
    default:
      return state
  }
}