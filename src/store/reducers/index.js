import { combineReducers } from 'redux';
import authReducer from './authReducer';
import venueReducer from './venueReducer';

const rootReducer = combineReducers({
    authReducer,
    venueReducer
})

export default rootReducer