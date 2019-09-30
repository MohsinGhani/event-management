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
  REVERSE_GEOCODING_FAILURE
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

  customBooking: [],
  getCustomBookingLoader: false,
  getCustomBookingError: null
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
        saveVenueLoader: action.payload
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

    // case CUSTOM_BOOKING:
    //   return {
    //     ...state,
    //     customBooking: null,
    //     getCustomBookingLoader: true,
    //     getCustomBookingError: null
    //   };

    // case CUSTOM_BOOKING_SUCCESS:
    //   return {
    //     ...state,
    //     customBooking: action.payload,
    //     getCustomBookingLoader: false,
    //     getCustomBookingError: null
    //   };
    // case CUSTOM_BOOKING_FAILURE:
    //   return {
    //     ...state,
    //     customBooking: null,
    //     getCustomBookingLoader: false,
    //     getCustomBookingError: "Can Not Booked"
    //   };

    default:
      return state;
  }
}
