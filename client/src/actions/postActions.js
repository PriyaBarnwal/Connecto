import axios from 'axios'
import {GET_ALLPOSTS, GET_POST, DELETE_POST, POST_ERROR, TOGGLE_LIKE, CREATE_POST, UPDATE_POST, CLEAR_POST, ADD_COMMENT, REMOVE_COMMENT} from './constants'
import {setAlert} from './alertActions'

export const getAllPosts = () => async(dispatch) => {
  try {
    let res = await axios.get('/api/posts')

    dispatch({
      type: GET_ALLPOSTS,
      payload: res.data.data
    })
  } catch(err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    })
  }
}

export const getPostById = (postid) => async(dispatch) => {
  try {
    console.log(axios.defaults)
    let res = await axios.get(`/api/posts/${postid}`)

    dispatch({
      type: GET_POST,
      payload: res.data.data
    })
  } catch(err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    })
  }
}

export const deletePost = (postid) => async(dispatch) => {
  try {
    await axios.delete(`/api/posts/${postid}`)

    dispatch({
      type: DELETE_POST,
      payload: postid
    })

    dispatch(setAlert('post removed successfully', 'info'))
  } catch(err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    })
  }
}

export const createPost = (formData, history) => async(dispatch) => {
  try {
    let res = await axios.post(`/api/posts/`, formData)

    dispatch({
      type: CREATE_POST,
      payload: res.data.data
    })

    history.push('/dashboard')

    dispatch(setAlert('post created successfully', 'info'))
  } catch(err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    })
  }
}

export const updatePost = (postid, data, history) => async(dispatch) => {
  try {
    let res = await axios.patch(`/api/posts/${postid}`, data)

    dispatch({
      type: UPDATE_POST,
      payload: res.data.data
    })

    history.goBack()
    
    dispatch(setAlert('post updated successfully', 'success'))
  } catch(err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    })
  }
}

export const toggleLike = (postid) => async(dispatch) => {
  try {
    let res = await axios.put(`/api/posts/${postid}/like`)

    dispatch({
      type: TOGGLE_LIKE,
      payload: {
        likes: res.data.data,
        id: postid
      }
    })

  } catch(err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    })
  }
}

export const clearPost = () => dispatch => {
  dispatch({
    type: CLEAR_POST
  })
}

export const addComment = (postid, data) => async(dispatch) => {
  try {
    let res = await axios.post(`/api/posts/${postid}/comments`, data)

    dispatch({
      type: ADD_COMMENT,
      payload: {
        comments: res.data.data,
        id: postid
      }
    })
    
    dispatch(setAlert('comment added successfully', 'secondary'))
  }
  catch(err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    })
  }
}

export const removeComment = (postid, commentid) => async(dispatch) => {
  try {
    let res = await axios.delete(`/api/posts/${postid}/comments/${commentid}`)

    dispatch({
      type: REMOVE_COMMENT,
      payload: {
        comments: res.data.data,
        id: postid
      }
    })

    dispatch(setAlert('comment removed successfully', 'secondary'))
  }
  catch(err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    })
  }
}