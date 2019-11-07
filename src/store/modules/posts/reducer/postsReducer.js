import { BEFORE_STATE_POST, FETCH_POSTS, FETCH_POSTS_ERROR, CREATE_POST_SUCCESS, UPDATE_POST_SUCCESS, CREATE_POST_ERROR, UPDATE_POST_ERROR, GET_POST_SUCCESS, GET_POST_ERROR, DELETE_POST_SUCCESS, DELETE_POST_ERROR, FETCH_AUTH_POSTS, FETCH_AUTH_POSTS_ERROR } from '../postsTypes'

export const initState = {
  posts: [],
  authPosts: [],
  post: {},
  postsError: null,
  isLoading: false,
}

export const postsState = (state = initState, action) => {

  const { payload, type } = action
  switch(type) {

    case BEFORE_STATE_POST:
      return {
        ...state,
        postsError: null,
        isLoading: true,
      }
    case FETCH_POSTS:
      return { 
        ...state, 
        posts: payload,
        isLoading: false,
      }
      
    case FETCH_POSTS_ERROR:
      return { 
        ...state, 
        postsError: payload,
        isLoading: false 
      }

    case FETCH_AUTH_POSTS:
      return { 
        ...state, 
        authPosts: payload,
        isLoading: false,
      }

    case FETCH_AUTH_POSTS_ERROR:
      return { 
        ...state, 
        postsError: payload,
        isLoading: false 
      }

    case GET_POST_SUCCESS:
      return { 
        ...state, 
        post: payload,
        postsError: null,
        isLoading: false  
      }

    case GET_POST_ERROR:
      return { 
        ...state, 
        postsError: payload,
        isLoading: false 
      }

    case CREATE_POST_SUCCESS:
      return { 
        ...state, 
        posts: [payload, ...state.posts],
        authPosts: [payload, ...state.authPosts],
        postsError: null,
        isLoading: false  
      }

    case CREATE_POST_ERROR:
      return { 
        ...state, 
        postsError: payload,
        isLoading: false  
      }

    case UPDATE_POST_SUCCESS:
      return { 
        ...state, 
        posts: state.posts.map(post => 
          post.id === payload.id ? 
          {...post, title: payload.title, content: payload.content } : post
        ),
        authPosts: state.authPosts.map(post => 
          post.id === payload.id ? 
          {...post, title: payload.title, content: payload.content } : post
        ),
        post: payload,
        postsError: null,
        isLoading: false 
      }

    case UPDATE_POST_ERROR:
      return { 
        ...state, 
        postsError: payload,
        isLoading: false  
      }

     case DELETE_POST_SUCCESS:
      return { 
        ...state, 
        posts: state.posts.filter(post => post.id !== payload.deletedID),
        authPosts: state.authPosts.filter(post => post.id !== payload.deletedID),
        postsError: null,
        isLoading: false   
      }

    case DELETE_POST_ERROR:
      return { 
        ...state, 
        postsError: payload,
        isLoading: false  
      }

    default:
      return state
  }
}
