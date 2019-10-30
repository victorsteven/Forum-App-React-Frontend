import { LIKE_CREATE_SUCCESS, LIKE_CREATE_ERROR, GET_LIKES_SUCCESS, GET_LIKES_ERROR, LIKE_DELETE_SUCCESS, LIKE_DELETE_ERROR } from '../likeTypes'

export const initState = {
  likeItems : [],
}


export const likesState = (state = initState, action) => {
  const { payload, type }  = action;
  switch(type) {
    case GET_LIKES_SUCCESS:
      return { 
        ...state, 
        likeItems: [...state.likeItems, { postID: payload.postID, likes: payload.likes  } ]
      }
    case GET_LIKES_ERROR:
        return { 
          ...state, 
          likesError: action.payload 
        }
    case LIKE_CREATE_SUCCESS:
      return { 
        ...state, 
        likeItems: state.likeItems.map(likeItem => 
                    likeItem.postID === payload.postID ? 
                    {...likeItem, likes: [...likeItem.likes, payload.oneLike]} : likeItem
        )
     }
    case LIKE_CREATE_ERROR:
      return { 
        ...state, 
        postError: payload 
      }

    case LIKE_DELETE_SUCCESS:
      return { 
        ...state, 
        likeItems: state.likeItems.map(likeItem => 
                    Number(likeItem.postID) === payload.postID ? 
                    {...likeItem, likes: likeItem.likes.filter(({id}) => id !== payload.deletedLike.id) } : likeItem
        )
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

