import {
    GET_VENUES, GET_VENUES_SUCCESS, GET_VENUES_FAILURE,
    SAVE_VENUES, SAVE_VENUES_SUCCESS, SAVE_VENUES_FAILURE,
} from './../constants'
import { venues } from './../../assets/venus'

const initialState = {
    venues,
    getVenuesLoader: false,
    getVenuesError: null
}

export default function venueReducer(state = initialState, action) {
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

        ///////////////////////
        case SAVE_VENUES:
            return {
                ...state,
                venues: [...state.venues, action.payload],
                getVenuesLoader: false,
                getVenuesError: null
            }

        case SAVE_VENUES_SUCCESS:
            return {
                ...state,
                venues: [...state.venues, action.payload],
                getVenuesLoader: true,
                getVenuesError: null
            }

        case SAVE_VENUES_FAILURE:
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