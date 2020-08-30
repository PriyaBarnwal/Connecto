import { REGISTER_SUCCESS, AUTH_FAILURE, LOGIN_SUCCESS, AUTH_SUCCESS, SIGN_OUT, REMOVE_ACCOUNT } from '../actions/constants'

let initialState = {
  token: localStorage.getItem('token'),
  isLoading: true,
  isAuthenticated: false,
  user: null
}

const authReducer = (state=initialState, action) => {
  switch(action.type){
    case AUTH_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isLoading: false,
        isAuthenticated: true
      }
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isLoading: false,
        isAuthenticated: true
      }
    case AUTH_FAILURE:
    case SIGN_OUT:
    case REMOVE_ACCOUNT:
      return {
        ...state,
        token: null,
        isLoading: false,
        isAuthenticated: false
      }
    default:
      return state
  }
}

export default authReducer