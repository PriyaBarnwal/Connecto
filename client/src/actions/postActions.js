import axios from 'axios'
import {GET_ALLPOSTS, GET_POST, DELETE_POST, POST_ERROR, TOGGLE_LIKE, UPDATE_POST} from './constants'
import {setAlert} from './alertActions'

export const getAllPosts = () => async(dispatch) => {
  try {
    let res = await axios.get('api/posts')

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
    let res = await axios.get(`api/posts/${postid}`)

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
    await axios.delete(`api/posts/${postid}`)

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

export const updatePost = (postid, data) => async(dispatch) => {
  try {
    let res = await axios.patch(`api/posts/${postid}`, data)

    dispatch({
      type: UPDATE_POST,
      payload: res.data.data
    })

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
    let res = await axios.put(`api/posts/${postid}/like`)

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