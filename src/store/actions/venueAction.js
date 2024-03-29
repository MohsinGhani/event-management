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
  CHANGE_OBJ_STATUS,
  CHANGE_OBJ_STATUS_SUCCESS,
  CHANGE_OBJ_STATUS_FAILURE,
  GET_ARCHIVE_VENUES,
  GET_ARCHIVE_VENUES_SUCCESS,
  GET_ARCHIVE_VENUES_FAILURE,
  CREATE_PACKAGES,
  CREATE_PACKAGES_SUCCESS,
  CREATE_PACKAGES_FAILURE,
  GET_PACKAGES,
  GET_PACKAGES_SUCCESS,
  GET_PACKAGES_FAILURE,
  SAVE_BOOKING_ITEM,
  GET_BOOKING_ITEM,
  GET_BOOKING_ITEM_SUCCESS,
  GET_BOOKING_ITEM_FAILURE,
  GET_VENUE_FOR_BOOKED_DETAILS,
  GET_VENUE_FOR_BOOKED_DETAILS_SUCCESS,
  GET_VENUE_FOR_BOOKED_DETAILS_FAILURE,
  GET_ORDER_CONFIRMATION_ITEM,
  GET_ORDER_CONFIRMATION_ITEM_SUCCESS,
  GET_ORDER_CONFIRMATION_ITEM_FAILURE,
  GET_PENDING_STATUS_VENUES,
  GET_PENDING_STATUS_VENUES_SUCCESS,
  GET_PENDING_STATUS_VENUES_FAILURE,
  CREATE_FEEDBACK,
  CREATE_FEEDBACK_SUCCESS,
  CREATE_FEEDBACK_FAILURE,
  GET_FEEDBACKS,
  GET_FEEDBACKS_SUCCESS,
  GET_FEEDBACKS_FAILURE,
  GET_PENDING_BOOKING_STATUS,
  GET_PENDING_BOOKING_STATUS_SUCCESS,
  GET_PENDING_BOOKING_STATUS_FAILURE,
  GET_PENDING_BOOKING_APPROVAL,
  GET_PENDING_BOOKING_APPROVAL_SUCCESS,
  GET_PENDING_BOOKING_APPROVAL_FAILURE,
  GET_COUNTRY,
  GET_COUNTRY_SUCCESS,
  GET_COUNTRY_FAILURE,
  GET_STATE,
  GET_STATE_SUCCESS,
  GET_STATE_FAILURE,
  GET_CITY,
  GET_CITY_SUCCESS,
  GET_CITY_FAILURE,
  SAVE_BOOKING_DATA
} from "./../constants";

export class venueAction {
  /////////////////////////// Get location latitude and logitude

  static saveBookingData(payload) {
    return {
      type: SAVE_BOOKING_DATA,
      payload
    };
  }
  /////////////////////////// 

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

  /////////////////////////// get all venue in main page

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

  /////////////////////////// get archive venue on archive section

  static getArchiveVenues(payload) {
    return {
      type: GET_ARCHIVE_VENUES,
      payload
    };
  }

  static getArchiveVenuesSuccess(archiveVenues) {
    return {
      type: GET_ARCHIVE_VENUES_SUCCESS,
      payload: archiveVenues
    };
  }

  static getArchiveVenuesFailure(error) {
    return {
      type: GET_ARCHIVE_VENUES_FAILURE,
      payload: error
    };
  }

  ///////////////////////////get venue if venue present in database

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

  /////////////////////////// save form detail in our database

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

  /////////////////////////// update or edit your form details

  static updateVenue(payload) {
    return {
      type: UPDATE_VENUE,
      payload
    };
  }

  static updateVenueSuccess(payload) {
    return {
      type: UPDATE_VENUE_SUCCESS,
      payload
    };
  }

  static updateVenueFailure(error) {
    return {
      type: UPDATE_VENUE_FAILURE,
      error
    };
  }

  /////////////////////////// save booking in database

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

  ///////////////////////////  get user venue on dashboard

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

  ///////////////////////////  get user pending status venues on dashboard

  static getPendingStatusVenues(payload) {
    return {
      type: GET_PENDING_STATUS_VENUES,
      payload
    };
  }

  static getPendingStatusVenuesSuccess(getPendingStatusVenues) {
    return {
      type: GET_PENDING_STATUS_VENUES_SUCCESS,
      payload: getPendingStatusVenues
    };
  }

  static getPendingStatusVenuesFailure(error) {
    return {
      type: GET_PENDING_STATUS_VENUES_FAILURE,
      payload: error
    };
  }

  /////////////////////////// change status of venue for delete, archive and unarchive

  static changeObjStatus(payload) {
    return {
      type: CHANGE_OBJ_STATUS,
      payload
    };
  }

  static changeObjStatusSuccess(payload) {
    return {
      type: CHANGE_OBJ_STATUS_SUCCESS,
      payload: payload
    };
  }

  static changeObjStatusFailure(error) {
    return {
      type: CHANGE_OBJ_STATUS_FAILURE,
      payload: error
    };
  }

  /////////////////////////// create packages in database

  static createPackages(payload) {
    return {
      type: CREATE_PACKAGES,
      payload
    };
  }

  static createPackagesSuccess(payload) {
    return {
      type: CREATE_PACKAGES_SUCCESS,
      payload: payload
    };
  }

  static createPackagesFailure(error) {
    return {
      type: CREATE_PACKAGES_FAILURE,
      payload: error
    };
  }

  /////////////////////////// get packages on venue details page

  static getPackages(payload) {
    return {
      type: GET_PACKAGES,
      payload
    };
  }

  static getPackagesSuccess(packages) {
    return {
      type: GET_PACKAGES_SUCCESS,
      payload: packages
    };
  }

  static getPackagesFailure(error) {
    return {
      type: GET_PACKAGES_FAILURE,
      payload: error
    };
  }

  /////////////////////////// save booking item on redux

  static saveBookingItem(payload) {
    return {
      type: SAVE_BOOKING_ITEM,
      payload
    };
  }

  /////////////////////////// get booking item on deshboard section

  static getBookingItem(payload) {
    return {
      type: GET_BOOKING_ITEM,
      payload
    };
  }

  static getBookingItemSuccess(bookingItem) {
    return {
      type: GET_BOOKING_ITEM_SUCCESS,
      payload: bookingItem
    };
  }

  static getBookingItemFailure(error) {
    return {
      type: GET_BOOKING_ITEM_FAILURE,
      payload: error
    };
  }

  /////////////////////////// get pending booking status on deshboard section

  static getPendingBookingStatus(payload) {
    return {
      type: GET_PENDING_BOOKING_STATUS,
      payload
    };
  }

  static getPendingBookingStatusSuccess(payload) {
    return {
      type: GET_PENDING_BOOKING_STATUS_SUCCESS,
      payload: payload
    };
  }

  static getPendingBookingStatusFailure(error) {
    return {
      type: GET_PENDING_BOOKING_STATUS_FAILURE,
      payload: error
    };
  }

  /////////////////////////// get Aproved booking item on deshboard section

  static getPendingBookingApproval(payload) {
    return {
      type: GET_PENDING_BOOKING_APPROVAL,
      payload
    };
  }

  static getPendingBookingApprovalSuccess(payload) {
    return {
      type: GET_PENDING_BOOKING_APPROVAL_SUCCESS,
      payload: payload
    };
  }

  static getPendingBookingApprovalFailure(error) {
    return {
      type: GET_PENDING_BOOKING_APPROVAL_FAILURE,
      payload: error
    };
  }

  /////////////////

  static getVenueForBookedDetails(payload) {
    return {
      type: GET_VENUE_FOR_BOOKED_DETAILS,
      payload
    };
  }

  static getVenueForBookedDetailsSuccess(bookedVenue) {
    return {
      type: GET_VENUE_FOR_BOOKED_DETAILS_SUCCESS,
      payload: bookedVenue
    };
  }

  static getVenueForBookedDetailsFailure(error) {
    return {
      type: GET_VENUE_FOR_BOOKED_DETAILS_FAILURE,
      payload: error
    };
  }

  ///////////////// Creat Feedbacks and reviews System

  static createFeedback(payload) {
    return {
      type: CREATE_FEEDBACK,
      payload
    };
  }

  static createFeedbackSuccess(feedbacks) {
    return {
      type: CREATE_FEEDBACK_SUCCESS,
      payload: feedbacks
    };
  }

  static createFeedbackFailure(error) {
    return {
      type: CREATE_FEEDBACK_FAILURE,
      payload: error
    };
  }

  ///////////////// Get Feedbacks and reviews System

  static getFeedbacks(payload) {
    return {
      type: GET_FEEDBACKS,
      payload
    };
  }

  static getFeedbacksSuccess(feedbacks) {
    return {
      type: GET_FEEDBACKS_SUCCESS,
      payload: feedbacks
    };
  }

  static getFeedbacksFailure(error) {
    return {
      type: GET_FEEDBACKS_FAILURE,
      payload: error
    };
  }

  ///////////////// Get Country

  static getCountry(payload) {
    return {
      type: GET_COUNTRY,
      payload
    };
  }

  static getCountrySuccess(country) {
    return {
      type: GET_COUNTRY_SUCCESS,
      payload: country
    };
  }

  static getCountryFailure(error) {
    return {
      type: GET_COUNTRY_FAILURE,
      payload: error
    };
  }

  ///////////////// Get State

  static getState(payload) {
    return {
      type: GET_STATE,
      payload
    };
  }

  static getStateSuccess(state) {
    return {
      type: GET_STATE_SUCCESS,
      payload: state
    };
  }

  static getStateFailure(error) {
    return {
      type: GET_STATE_FAILURE,
      payload: error
    };
  }

  ///////////////// Get City

  static getCity(payload) {
    return {
      type: GET_CITY,
      payload
    };
  }

  static getCitySuccess(city) {
    return {
      type: GET_CITY_SUCCESS,
      payload: city
    };
  }

  static getCityFailure(error) {
    return {
      type: GET_CITY_FAILURE,
      payload: error
    };
  }
}
