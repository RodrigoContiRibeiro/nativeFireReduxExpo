import { combineReducers } from 'redux'

import { userReducer } from './userReducer.js'

const Reducers = combineReducers({
    userState: userReducer,
})

export default Reducers