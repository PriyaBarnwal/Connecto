import {
  CREATE_PROFILE, 
  CLEAR_MYPROFILE,
  CLEAR_PROFILE, 
  GET_MYPROFILE, 
  GET_PROFILE,
  UPDATE_PROFILE,
  UPDATE_EDUCATION,
  UPDATE_EXPERIENCE,
  GET_PROFILES,
  PROFILE_ERROR
} from '../actions/constants'

const initialState = {
  myprofile: null,
  profile: null,
  profiles: [],
  loading: true,
  error: {}
}

const profileReducer = (state=initialState, action) => {
  let {type, payload} = action

  switch(type) {
    case GET_MYPROFILE:
    case CREATE_PROFILE:
    case UPDATE_PROFILE:
    case UPDATE_EXPERIENCE:
    case UPDATE_EDUCATION:
      return {
        ...state,
        myprofile: payload,
        loading: false
      }
    case GET_PROFILE:
      return {
        ...state,
        profile: payload
      }
    case CLEAR_MYPROFILE:
      return {
        ...state,
        myprofile: null,
      }
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null
      }
    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false
      }
    case PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        profile: null
      };
    default: 
      return state
  }
}

export default profileReducer