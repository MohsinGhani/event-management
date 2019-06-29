import {
    GET_VENUES, GET_VENUES_SUCCESS, GET_VENUES_FAILURE,
    SAVE_VENUES, SAVE_VENUES_SUCCESS, SAVE_VENUES_FAILURE,
    REVERSE_GEOCODING, REVERSE_GEOCODING_SUCCESS, REVERSE_GEOCODING_FAILURE,    
} from './../constants'
import { venues } from './../../assets/venus'

const initialState = {
    venues,
    getVenuesLoader: false,
    getVenuesError: null,

    reversedGeoCoding: null,
    reverseGeoCodingLoader: false,
    reverseGeoCodingError: null,
}

export default function venueReducer(state = initialState, action) {
    switch (action.type) {
        ///////////////////////
        case REVERSE_GEOCODING:
            return {
                ...state,
                reversedGeoCoding: null,
                reverseGeoCodingLoader: true,
                reverseGeoCodingError: null,
            }

        case REVERSE_GEOCODING_SUCCESS:
            return {
                ...state,
                reversedGeoCoding: action.payload,
                reverseGeoCodingLoader: false,
                reverseGeoCodingError: null,
            }

        case REVERSE_GEOCODING_FAILURE:
            return {
                ...state,
                reversedGeoCoding: null,
                reverseGeoCodingLoader: false,
                reverseGeoCodingError: action.error,
            }
        //////////////
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