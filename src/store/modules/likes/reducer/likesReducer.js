import { LIKE_CREATE_SUCCESS, LIKE_CREATE_ERROR, GET_LIKES_SUCCESS, GET_LIKES_ERROR, LIKE_DELETE_SUCCESS, LIKE_DELETE_ERROR } from '../likeTypes'

export const initState = {
  likeItem : [],
  // authLiked: false
}

// export const getAuthLike = (state = initState, action) => {
  
// }

export const getLikes = (state = initState, action) => {
  const { payload, type }  = action;
  switch(type) {
    case GET_LIKES_SUCCESS:
      return { 
        ...state, 
        likeItem: [...state.likeItem, { postID: payload.postID, likes: payload.likes, likesCount: payload.likesCount  } ]
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

export const createLike = (state = initState, action) => {
  const { payload, type } = action
  switch(type) {
    case LIKE_CREATE_SUCCESS:
      return { 
        ...state,
        likeItem: [...state.likeItem, payload ]

        // comments: [payload.comment, ...state.comments]
      }
    case LIKE_CREATE_ERROR:
        return { 
          ...state, 
          postError: payload 
        }
    default:
      return state
  }
}

export const deleteLike = (state = initState, action) => {
  const { payload, type } = action
  switch(type) {
    case LIKE_DELETE_SUCCESS:
      return { 
        ...state,
        likeItem: [...state.likeItem, payload ]
      }
    case LIKE_DELETE_ERROR:
        return { 
          ...state, 
          postError: payload 
        }
    default:
      return state
  }
}
