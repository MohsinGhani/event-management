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
  GET_VENUES_BY_USER_ID_FAILURE,
  UPDATE_VENUE,
  UPDATE_VENUE_SUCCESS,
  UPDATE_VENUE_FAILURE,
} from "./../constants";

export class venueAction {
  /////////////////
  static reverseGeoCoding(payload) {
    return {
      type: REVERSE_GEOCODING,
      payload
    };
  }

  static reverseGeoCodingSuccess(payload) {
    return {
      type: REVERSE_GEOCODING_SUCCESS,
      payload
    };
  }

  static reverseGeoCodingFailure(error) {
    return {
      type: REVERSE_GEOCODING_FAILURE,
      error
    };
  }
  ////////////////

  static getVenues(payload) {
    return {
      type: GET_VENUES,
      payload
    };
  }

  static getVenuesSuccess(venues) {
    return {
      type: GET_VENUES_SUCCESS,
      payload: venues
    };
  }

  static getVenuesFailure(error) {
    return {
      type: GET_VENUES_FAILURE,
      payload: error
    };
  }

  ////////////////

  static getVenue(payload) {
    return {
      type: GET_VENUE,
      payload
    };
  }

  static getVenueSuccess(venue) {
    return {
      type: GET_VENUE_SUCCESS,
      payload: venue
    };
  }

  static getVenueFailure(error) {
    return {
      type: GET_VENUE_FAILURE,
      payload: error
    };
  }

  ////////////////

  static saveVenue(payload) {
    return {
      type: SAVE_VENUES,
      payload
    };
  }

  static saveVenueSuccess(payload) {
    return {
      type: SAVE_VENUES_SUCCESS,
      payload
    };
  }

  static saveVenueFailure(error) {
    return {
      type: SAVE_VENUES_FAILURE,
      error
    };
  }

  ///////////////

  static updateVenue(payload) {
    debugger
    return {
      type: UPDATE_VENUE,
      payload
    };
  }

  static updateVenueSuccess(payload) {
    debugger
    return {
      type: UPDATE_VENUE_SUCCESS,
      payload
    };
  }

  static updateVenueFailure(error) {
    debugger
    return {
      type: UPDATE_VENUE_FAILURE,
      error
    };
  }

  ///////////////

  static saveCustomBooking(payload) {
    return {
      type: SAVE_CUSTOM_BOOKING,
      payload
    };
  }
  static saveCustomBookingSuccess(payload) {
    return {
      type: SAVE_CUSTOM_BOOKING_SUCCESS,
      payload
    };
  }
  static saveCustomBookingFailure(error) {
    return {
      type: SAVE_CUSTOM_BOOKING_FAILURE,
      error
    };
  }

  /////////////////

  static getVenuesByUserId(payload) {
    return {
      type: GET_VENUES_BY_USER_ID,
      payload
    };
  }

  static getVenuesByUserIdSuccess(getVenuesByUserId) {
    return {
      type: GET_VENUES_BY_USER_ID_SUCCESS,
      payload: getVenuesByUserId
    };
  }

  static getVenuesByUserIdFailure(error) {
    return {
      type: GET_VENUES_BY_USER_ID_FAILURE,
      payload: error
    };
  }
}
