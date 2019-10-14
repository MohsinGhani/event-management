import {
  GET_VENUES,
  GET_VENUES_SUCCESS,
  GET_VENUES_FAILURE,
  GET_VENUE,
  GET_VENUE_SUCCESS,
  GET_VENUE_FAILURE,
  SAVE_VENUES,
  SAVE_VENUES_SUCCESS,
  SAVE_VENUES_FAILURE,
  REVERSE_GEOCODING,
  REVERSE_GEOCODING_SUCCESS,
  REVERSE_GEOCODING_FAILURE,
  SAVE_CUSTOM_BOOKING,
  SAVE_CUSTOM_BOOKING_SUCCESS,
  SAVE_CUSTOM_BOOKING_FAILURE,
  GET_VENUES_BY_USER_ID,
  GET_VENUES_BY_USER_ID_SUCCESS,
  GET_VENUES_BY_USER_ID_FAILURE
} from "./../constants";
// import { venues } from "./../../assets/venus";

const initialState = {
  venues: null,
  getVenuesLoader: false,
  getVenuesError: null,

  venue: null,
  getVenueLoader: false,
  getVenueError: null,

  reversedGeoCoding: null,
  reverseGeoCodingLoader: false,
  reverseGeoCodingError: null,

  savedVenue: null,
  saveVenueLoader: false,
  saveVenueError: null,

  saveCustomBooking: null,
  saveCustomBookingLoader: false,
  saveCustomBookingError: null,

  getVenuesByUserId: null,
  getVenuesByUserIdLoader: false,
  getVenuesByUserIdError: null
};

export default function venueReducer(state = initialState, action) {
  switch (action.type) {
    ///////////////////////
    case REVERSE_GEOCODING:
      return {
        ...state,
        reversedGeoCoding: null,
        reverseGeoCodingLoader: true,
        reverseGeoCodingError: null
      };

    case REVERSE_GEOCODING_SUCCESS:
      return {
        ...state,
        reversedGeoCoding: action.payload,
        reverseGeoCodingLoader: false,
        reverseGeoCodingError: null
      };

    case REVERSE_GEOCODING_FAILURE:
      return {
        ...state,
        reversedGeoCoding: null,
        reverseGeoCodingLoader: false,
        reverseGeoCodingError: action.error
      };
    //////////////
    case GET_VENUES:
      return {
        ...state,
        venues: null,
        getVenuesLoader: true,
        getVenuesError: null
      };

    case GET_VENUES_SUCCESS:
      return {
        ...state,
        venues: action.payload,
        getVenuesLoader: false,
        getVenuesError: null
      };

    case GET_VENUES_FAILURE:
      return {
        ...state,
        venues: null,
        getVenuesLoader: false,
        getVenuesError: "Can not Get Venues"
      };

    ///////////////////////
    case SAVE_VENUES:
      return {
        ...state,
        savedVenue: null,
        saveVenueLoader: true,
        saveVenueError: null
      };

    case SAVE_VENUES_SUCCESS:
      return {
        ...state,
        savedVenue: action.payload,
        saveVenueLoader: false,
        saveVenueError: null
      };

    case SAVE_VENUES_FAILURE:
      return {
        ...state,
        savedVenue: null,
        saveVenueLoader: false,
        saveVenueError: action.payload
      };

    //////////////////////// By vId ////////////////////////

    case GET_VENUE:
      return {
        ...state,
        venue: null,
        getVenueLoader: true,
        getVenueError: null
      };

    case GET_VENUE_SUCCESS:
      return {
        ...state,
        venue: action.payload,
        getVenueLoader: false,
        getVenueError: null
      };

    case GET_VENUE_FAILURE:
      return {
        ...state,
        venue: null,
        getVenueLoader: false,
        getVenueError: "Can not Get Venue by id"
      };

    ////////////////////

    case SAVE_CUSTOM_BOOKING:
      return {
        ...state,
        saveCustomBooking: null,
        saveCustomBookingLoader: true,
        saveCustomBookingError: null
      };

    case SAVE_CUSTOM_BOOKING_SUCCESS:
      return {
        ...state,
        saveCustomBooking: action.payload,
        saveCustomBookingLoader: false,
        saveCustomBookingError: null
      };
    case SAVE_CUSTOM_BOOKING_FAILURE:
      return {
        ...state,
        saveCustomBooking: null,
        saveCustomBookingLoader: false,
        saveCustomBookingError: "Can Not Booked"
      };

    ///////////////////

    case GET_VENUES_BY_USER_ID:
      debugger;
      return {
        ...state,
        getVenuesByUserId: null,
        getVenuesByUserIdLoader: true,
        getVenuesByUserIdError: null
      };

    case GET_VENUES_BY_USER_ID_SUCCESS:
      debugger;
      return {
        ...state,
        getVenuesByUserId: action.payload,
        getVenuesByUserIdLoader: false,
        getVenuesByUserIdError: null
      };

    case GET_VENUES_BY_USER_ID_FAILURE:
      debugger;
      return {
        ...state,
        getVenuesByUserId: null,
        getVenuesByUserIdLoader: false,
        getVenuesByUserIdError: "Can not Get Venues"
      };

    default:
      return state;
  }
}
