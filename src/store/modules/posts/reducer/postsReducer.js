import { FETCH_POSTS, CREATE_POST_SUCCESS, UPDATE_POST_SUCCESS, CREATE_POST_ERROR, UPDATE_POST_ERROR, GET_POST_SUCCESS, GET_POST_ERROR, DELETE_POST_SUCCESS, DELETE_POST_ERROR } from '../postsTypes'

export const initState = {
  posts: [],
  postsError: null,
  post: {}
}

export const postsState = (state = initState, action) => {

  const { payload, type } = action
  switch(type) {
    case FETCH_POSTS:
      return { 
        ...state, 
        posts: payload 
      }
      case GET_POST_SUCCESS:
      return { 
        ...state, 
        post: payload,
        postsError: null 
      }
    case GET_POST_ERROR:
        return { 
          ...state, 
          postsError: payload 
        }
    case UPDATE_POST_SUCCESS:
      return { 
        ...state, 
        posts: state.posts.map(post => 
          post.id === payload.id ? 
          {...post, title: payload.title, content: payload.content } : post
        ),
        post: payload,
        postsError: null
      }
    case UPDATE_POST_ERROR:
        return { 
          ...state, 
          postsError: payload 
        }
    case CREATE_POST_SUCCESS:
      return { 
        ...state, 
        posts: [payload, ...state.posts],
        postsError: null  
      }
    case CREATE_POST_ERROR:
        return { 
          ...state, 
          postsError: payload 
        }
     case DELETE_POST_SUCCESS:
      return { 
        ...state, 
        posts: state.posts.filter(post => post.id !== payload.deletedID),
        postsError: null  
      }
    case DELETE_POST_ERROR:
        return { 
          ...state, 
          postsError: payload 
        }
    default:
      return state
  }
}
