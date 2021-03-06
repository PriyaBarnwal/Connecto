import axios from 'axios'
import { REGISTER_SUCCESS, AUTH_FAILURE, LOGIN_SUCCESS, AUTH_SUCCESS, SIGN_OUT, CLEAR_MYPROFILE, CLEAR_MYPOSTS, REMOVE_ACCOUNT } from './constants'
import {setAlert} from './alertActions'

export const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token
    localStorage.setItem('token', token)
  }
  else {
    delete axios.defaults.headers.common['x-auth-token']
    localStorage.removeItem('token')
  }
}

export const registerUser = ({name, email, password}) => async(dispatch) => {
  try {
    let response = await axios.post(
      '/api/users/register', 
      JSON.stringify({name, email, password}),
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )

    dispatch(
      {
        type: REGISTER_SUCCESS, 
        payload: response.data.data
      }
    )

    dispatch(checkAuth())

    dispatch(setAlert('user registered successfully!', 'success'))
  } catch(err) {
    let errors = err.response.data.errors

    errors && errors.length && errors.forEach(error=> dispatch(setAlert(error.msg, 'danger'))) 
    dispatch(
      {
        type: AUTH_FAILURE,
        payload: null
      }
    )
  }
}

export const login = ({email, password}) => async(dispatch) => {
  try {
    let response = await axios.post(
      '/api/auth/login', 
      JSON.stringify({email, password}),
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )

    dispatch(
      {
        type: LOGIN_SUCCESS, 
        payload: response.data.data
      }
    )

    dispatch(checkAuth())
  } catch(err) {
    let errors = err.response.data.errors

    errors && errors.length && errors.forEach(error=> dispatch(setAlert(error.msg, 'danger'))) 
    dispatch(
      {
        type: AUTH_FAILURE,
        payload: null
      }
    )
  }
}

export const checkAuth = () => async(dispatch) => {
  if(localStorage.getItem('token'))
    setAuthToken(localStorage.getItem('token'))

    try {
      let response = await axios.get('/api/auth')
  
      dispatch(
        {
          type: AUTH_SUCCESS, 
          payload: response.data.data
        }
      )
    } catch(err) {
      let errors = err.response.data.errors
  
      errors && errors.length && errors.forEach(error=> dispatch(setAlert(error.msg, 'danger'))) 
      dispatch(
        {
          type: AUTH_FAILURE,
          payload: null
        }
      )
    }
}

export const signOut = () => (dispatch) => {
  dispatch(
    {
      type: CLEAR_MYPROFILE,
      payload: null
    }
  )
  dispatch(
    {
      type: SIGN_OUT,
      payload: null
    }
  )
}

export const deleteAccount = (id) => async dispatch => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    try {
      await axios.delete('/api/profiles/myprofile')

      dispatch({ type: CLEAR_MYPROFILE })
      dispatch({ 
        type: CLEAR_MYPOSTS,
        payload: id
      })
      dispatch({ type: REMOVE_ACCOUNT })

      dispatch(setAlert('Your account has been permanently deleted', 'success'))
    } catch (err) {
      console.log(err)
    }
  }
}