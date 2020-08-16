import {v4 as uuid} from 'uuid'
import { SET_ALERT, REMOVE_ALERT } from "./constants"

export const setAlert = (msg, type, time = 3000) => dispatch => {
  let id = uuid()
  dispatch({
    type: SET_ALERT,
    payload: {
      msg,
      type,
      id
    }
  })

  setTimeout(()=> dispatch({
    type: REMOVE_ALERT,
    payload: {
      id
    }
  }), time)
}