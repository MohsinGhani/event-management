import { combineReducers } from 'redux';
import authReducer from './authReducer';
import venueReducer from './venueReducer';
// import dashboardReducer from "./dashboardReducer"

const rootReducer = combineReducers({
    authReducer,
    venueReducer,
    // dashboardReducer
})

export default rootReducer