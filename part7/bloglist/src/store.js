import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import blogReducer from './reducers/blogReducer'
import notificationReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'
import { composeWithDevTools } from 'redux-devtools-extension'

const reducer = combineReducers({
  blogs: blogReducer,
  notification: notificationReducer,
  user: userReducer,
})
const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))
export default store
