import {GET_ALLPOSTS, GET_POST, DELETE_POST, POST_ERROR, TOGGLE_LIKE, UPDATE_POST} from '../actions/constants'

let initialState = {
  posts: [],
  post : null,
  errors: {},
  loading: true
}

const postReducer = (state = initialState, action) => {
  let {type, payload} = action

  switch(type) {
    case GET_ALLPOSTS:
      return {
        ...state,
        posts: payload,
        loading: false
      }
    case GET_POST: 
    case UPDATE_POST:
      return {
        ...state,
        post: payload,
        loading: false
      }
    case TOGGLE_LIKE:
      return {
        ...state,
        posts: state.posts.map(post=>{
          if(post._id === payload.id)
            return {...post, likes: payload.likes}
          return post
        })
      }
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id!==payload)
      }
    case POST_ERROR:
      return {
        ...state,
        errors: payload,
        loading: false
      }
    default:
      return state
  }
}

export default postReducer