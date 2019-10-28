import {  COMMENT_CREATE_SUCCESS, COMMENT_CREATE_ERROR, GET_COMMENTS_SUCCESS, GET_COMMENTS_ERROR, COMMENT_DELETE_SUCCESS, COMMENT_DELETE_ERROR, GET_AUTH_COMMENT_SUCCESS, GET_AUTH_COMMENT_ERROR, BEFORE_STATE } from '../commentTypes'

export const initState = {
  commentItems : [],
  isLoading: false,
  commentSuccess: false
}


export const commentsState = (state = initState, action) => {
  const { payload, type }  = action;
  switch(type) {

    case BEFORE_STATE:
      return {
        ...state,
        commentsError: null,
        isLoading: true,
        commentSuccess: false
      }

    case GET_COMMENTS_SUCCESS:
      return { 
        ...state, 
        commentItems: [...state.commentItems, { postID: payload.postID, comments: payload.comments  } ],
        isLoading: false,

      }
    case GET_COMMENTS_ERROR:
      return { 
        ...state, 
        commentError: action.payload, 
      }
    case COMMENT_CREATE_SUCCESS:
      return { 
        ...state, 
        commentItems: state.commentItems.map(commentItem => 
                    commentItem.postID === payload.postID ? 
                    {...commentItem, comments: [payload.comment, ...commentItem.comments]} : commentItem
        ),
        isLoading: false,
        commentSuccess: true
     }
    case COMMENT_CREATE_ERROR:
      return { 
        ...state, 
        commentsError: payload, 
        isLoading: false,
        commentSuccess: false
      }

    case COMMENT_DELETE_SUCCESS:
      return { 
        ...state, 
        likeItems: state.likeItems.map(likeItem => 
                    likeItem.postID === payload.postID ? 
                    {...likeItem, likes: likeItem.likes.filter(({id}) => id !== payload.deletedLike.id) } : likeItem
        )
      }
    case COMMENT_DELETE_ERROR:
      return { 
        ...state, 
        postError: payload 
      }
    default:
      return state
  }
}

