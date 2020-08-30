import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './reducers'
import {setAuthToken} from './actions/authActions'

let initialState = {},
  middlewares = [thunk]

const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middlewares)))

let currentState = store.getState()

store.subscribe(() => {
  let prevState = currentState
  currentState = store.getState()

  if (prevState.auth.token !== currentState.auth.token)
    setAuthToken(currentState.auth.token)
})

export default store