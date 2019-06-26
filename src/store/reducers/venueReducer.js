import {
    GET_VENUES, GET_VENUES_SUCCESS, GET_VENUES_FAILURE,
} from './../constants'
import { venues } from './../../assets/venus'

const initialState = {
    venues,
    getVenuesLoader: false,
    getVenuesError: null
}

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case GET_VENUES:
            return {
                ...state,
                venues: null,
                getVenuesLoader: false,
                getVenuesError: null
            }

        case GET_VENUES_SUCCESS:
            return {
                ...state,
                getVenuesLoader: true,
                getVenuesError: null
            }

        case GET_VENUES_FAILURE:
            return {
                ...state,
                venues: null,
                getVenuesLoader: false,
                getVenuesError: 'Can not Get Venues'
            }

        default:
            return state
    }

}