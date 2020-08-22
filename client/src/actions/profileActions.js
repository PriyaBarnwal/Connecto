import axios from 'axios'
import {
  CREATE_PROFILE, 
  CLEAR_PROFILE, 
  GET_PROFILE,
  GET_MYPROFILE, 
  UPDATE_PROFILE,
  UPDATE_EDUCATION,
  UPDATE_EXPERIENCE,
  GET_PROFILES,
  PROFILE_ERROR,
  SET_LOADING
} from './constants'
import {setAlert} from './alertActions'

export const setLoading = (payload) => async(dispatch) => {
  dispatch({
    type: SET_LOADING,
    payload
  })
}

export const getMyProfile = () => async(dispatch) => {
  try {
    let res = await axios.get('/api/profiles/myprofile')
    dispatch({
      type: GET_MYPROFILE,
      payload: res.data.data
    })
  }
  catch(err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
}

export const getProfiles = (name) => async(dispatch) => {
  try {
    let params={}
    if(name) 
      params['name'] = name
      
    let res = await axios.get('/api/profiles', {params})

    dispatch({
      type: GET_PROFILES,
      payload: res.data.data
    })
  }
  catch(err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
}

export const createProfile = (profileData) => async(dispatch) => {
  try {
    let res = await axios.post(
      '/api/profiles', 
      profileData
    )

    dispatch({
      type: CREATE_PROFILE,
      payload: res.data.data
    })
    dispatch(setAlert('profile updated successfully!', 'success'))
  }
  catch(err) {
    let errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    })
  }
}

export const updateProfile = (profileData) => async(dispatch) =>{
  try {
    let res = await axios.patch(
      '/api/profiles/myprofile',
      profileData
    )

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data.data
    })
    dispatch(setAlert('profile updated successfully!', 'success'))
  }
  catch(err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    })
    dispatch(setAlert('profile could not be updated!', 'danger'))
  }
}

export const addExperience = (experienceData) => async(dispatch) => {
  try {
    let res = await axios.put(
      '/api/profiles/experience', 
      experienceData
    )

    dispatch({
      type: UPDATE_EXPERIENCE,
      payload: res.data.data
    })
    
    dispatch(setAlert('profile updated successfully!', 'success'))
  }
  catch(err) {
    let errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    })
  }
}

export const addEducation = (educationData) => async(dispatch) => {
  try {
    let res = await axios.put(
      '/api/profiles/education', 
      educationData
    )

    dispatch({
      type: UPDATE_EDUCATION,
      payload: res.data.data
    })
    
    dispatch(setAlert('profile updated successfully!', 'success'))
  }
  catch(err) {
    let errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    })
  }
}

export const removeExperience = (id) => async(dispatch) => {
  try {
    let res = await axios.delete(`/api/profiles/experience/${id}`)
    
    dispatch({
      type: UPDATE_EXPERIENCE,
      payload: res.data.data
    })
    
    dispatch(setAlert('profile updated successfully!', 'success'))
  }
  catch(err) {
    let errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    })
  }
}

export const removeEducation = (id) => async(dispatch) => {
  try {
    let res = await axios.delete(`/api/profiles/education/${id}`)
    
    dispatch({
      type: UPDATE_EDUCATION,
      payload: res.data.data
    })
    
    dispatch(setAlert('profile updated successfully!', 'success'))
  }
  catch(err) {
    let errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    })
  }
}

export const editExperience = (id, formData) => async(dispatch) => {
  try {
    let res = await axios.patch(`/api/profiles/experience/${id}`, formData)
    
    dispatch({
      type: UPDATE_EXPERIENCE,
      payload: res.data.data
    })
    
    dispatch(setAlert('profile updated successfully!', 'success'))
  }
  catch(err) {
    let errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    })
  }
}

export const editEducation = (id, formData) => async(dispatch) => {
  try {
    let res = await axios.patch(`/api/profiles/education/${id}`, formData)
    
    dispatch({
      type: UPDATE_EDUCATION,
      payload: res.data.data
    })
    
    dispatch(setAlert('profile updated successfully!', 'success'))
  }
  catch(err) {
    let errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    })
  }
}

export const getProfileById = userId => async(dispatch) => {
  try {
    const res = await axios.get(`/api/profiles/user/${userId}`)

    dispatch({
      type: GET_PROFILE,
      payload: res.data.data
    })
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    })
  }
}

export const clearProfile = () => dispatch => {
  dispatch({
    type: CLEAR_PROFILE,
    payload: null
  })
}