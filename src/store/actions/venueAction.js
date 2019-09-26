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
    debugger

    return {
      type: GET_VENUE,
      payload
    };
  }

  static getVenueSuccess(venue) {
    debugger

    return {
      type: GET_VENUE_SUCCESS,
      payload: venue
    };
  }

  static getVenueFailure(error) {
    debugger

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
}
