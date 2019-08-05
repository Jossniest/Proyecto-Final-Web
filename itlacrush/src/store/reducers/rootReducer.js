import userReducer from './userReducer'
import publicationsReducer from './publicationsReducer'
import sessionReducer from './sessionReducer'
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
    sessionState : sessionReducer,
    userState: userReducer,
    publicationState: publicationsReducer
})

export default rootReducer