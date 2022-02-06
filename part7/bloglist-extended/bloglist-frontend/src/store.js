import { createStore,combineReducers, applyMiddleware } from  'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import authReducer from './reducers/authReducer'
import userReducer  from './reducers/userReducer.js'
import thunk from 'redux-thunk'

const reducers= combineReducers({
  blogs:blogReducer,
  users:userReducer,
  currentUser:authReducer,
  notification:notificationReducer
})

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))

)

export default store