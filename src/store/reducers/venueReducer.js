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
  UPDATE_VENUE,
  UPDATE_VENUE_SUCCESS,
  UPDATE_VENUE_FAILURE,
  REVERSE_GEOCODING,
  REVERSE_GEOCODING_SUCCESS,
  REVERSE_GEOCODING_FAILURE,
  SAVE_CUSTOM_BOOKING,
  SAVE_CUSTOM_BOOKING_SUCCESS,
  SAVE_CUSTOM_BOOKING_FAILURE,
  GET_VENUES_BY_USER_ID,
  GET_VENUES_BY_USER_ID_SUCCESS,
  GET_VENUES_BY_USER_ID_FAILURE,
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
// import { venues } from "./../../assets/venus";

const initialState = {
  venues: null,
  getVenuesLoader: false,
  getVenuesError: null,

  archiveVenues: null,
  getArchiveVenuesLoader: false,
  getArchiveVenuesError: null,

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
  getVenuesByUserIdError: null,

  updatedVenue: null,
  updateVenueLoader: false,
  updateVenueError: null,

  objStatusHideData: 0,
  objStatusHideDataLoader: false,
  objStatusHideDataError: null,

  createPackages: null,
  createPackagesLoader: false,
  createPackagesError: null,

  packages: null,
  getPackagesLoader: false,
  getPackagesError: null,

  bookingItem: null,
  getBookingItemLoader: false,
  getBookingItemError: null,

  saveBookingItem: null,

  bookedVenue: null,
  getVenueForBookedDetailsLoader: false,
  getVenueForBookedDetailsError: null,

  pendingStatusVenues: null,
  getPendingStatusVenuesLoader: false,
  getPendingStatusVenuesError: null,

  feedback: null,
  createFeedbackLoader: false,
  createFeedbackError: null,

  feedbacked: null,
  getFeedbackLoader: false,
  getFeedbackError: null,

  changeObjStatus: null,
  changeObjStatusLoader: false,
  changeObjStatusError: null,

  pendingBookingStatus: null,
  getPendingBookingStatusLoader: false,
  getPendingBookingStatusError: null,

  pendingBookingApproval: null,
  getPendingBookingApprovalLoader: false,
  getPendingBookingApprovalError: null,

  country: [],
  getCountryLoader: false,
  getCountryError: null,

  states: [],
  getStateLoader: false,
  getStateError: null,

  city: [],
  getCityLoader: false,
  getCityError: null,

  savedBookingData: {
    servicesBookingPrice: [],
    packageArray: []
  }
};

export default function venueReducer(state = initialState, action) {
  switch (action.type) {
    ///////////////////////
    case SAVE_BOOKING_DATA:
      return {
        ...state,
        savedBookingData: action.payload
      };

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

    //////////////
    case GET_ARCHIVE_VENUES:
      return {
        ...state,
        archiveVenues: null,
        getArchiveVenuesLoader: true,
        getArchiveVenuesError: null
      };

    case GET_ARCHIVE_VENUES_SUCCESS:
      return {
        ...state,
        archiveVenues: action.payload,
        getArchiveVenuesLoader: false,
        getArchiveVenuesError: null
      };

    case GET_ARCHIVE_VENUES_FAILURE:
      return {
        ...state,
        archiveVenues: null,
        getArchiveVenuesLoader: false,
        getArchiveVenuesError: "Can not Get Venues"
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

    ///////////////////////
    case UPDATE_VENUE:
      return {
        ...state,
        updatedVenue: null,
        updateVenueLoader: true,
        updateVenueError: null
      };

    case UPDATE_VENUE_SUCCESS:
      return {
        ...state,
        updatedVenue: action.payload,
        updateVenueLoader: false,
        updateVenueError: null
      };

    case UPDATE_VENUE_FAILURE:
      return {
        ...state,
        updatedVenue: null,
        updateVenueLoader: false,
        updateVenueError: "cant update your item"
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

    //////////////////////// Get Pending Venues ////////////////////////

    case GET_PENDING_STATUS_VENUES:
      return {
        ...state,
        pendingStatusVenues: null,
        getPendingStatusVenuesLoader: true,
        getPendingStatusVenuesError: null
      };

    case GET_PENDING_STATUS_VENUES_SUCCESS:
      return {
        ...state,
        pendingStatusVenues: action.payload,
        getPendingStatusVenuesLoader: false,
        getPendingStatusVenuesError: null
      };

    case GET_PENDING_STATUS_VENUES_FAILURE:
      return {
        ...state,
        pendingStatusVenues: null,
        getPendingStatusVenuesLoader: false,
        getPendingStatusVenuesError: "Can not Get Pending Venue by id"
      };

    //////////////////////// Get Pending Booking Status ////////////////////////

    case GET_PENDING_BOOKING_STATUS:
      return {
        ...state,
        pendingBookingStatus: null,
        getPendingBookingStatusLoader: true,
        getPendingBookingStatusError: null
      };

    case GET_PENDING_BOOKING_STATUS_SUCCESS:
      return {
        ...state,
        pendingBookingStatus: action.payload,
        getPendingBookingStatusLoader: false,
        getPendingBookingStatusError: null
      };

    case GET_PENDING_BOOKING_STATUS_FAILURE:
      return {
        ...state,
        pendingBookingStatus: null,
        getPendingBookingStatusLoader: false,
        getPendingBookingStatusError: "Can not Get Pending Booking Status"
      };

    //////////////////////// Get Pending Booking Approval ////////////////////////

    case GET_PENDING_BOOKING_APPROVAL:
      return {
        ...state,
        pendingBookingApproval: null,
        getPendingBookingApprovalLoader: true,
        getPendingBookingApprovalError: null
      };

    case GET_PENDING_BOOKING_APPROVAL_SUCCESS:
      return {
        ...state,
        pendingBookingApproval: action.payload,
        getPendingBookingApprovalLoader: false,
        getPendingBookingApprovalError: null
      };

    case GET_PENDING_BOOKING_APPROVAL_FAILURE:
      return {
        ...state,
        pendingBookingApproval: null,
        getPendingBookingApprovalLoader: false,
        getPendingBookingApprovalError: "Can not Get Pending Booking Approval"
      };

    //////////////////////// Create Package ////////////////////////

    case CREATE_PACKAGES:
      return {
        ...state,
        createPackages: null,
        createPackagesLoader: true,
        createPackagesError: null
      };

    case CREATE_PACKAGES_SUCCESS:
      return {
        ...state,
        createPackages: action.payload,
        createPackagesLoader: false,
        createPackagesError: null
      };

    case CREATE_PACKAGES_FAILURE:
      return {
        ...state,
        createPackages: null,
        createPackagesLoader: false,
        createPackagesError: "Can't create Packages"
      };

    //////////////////////////////////////////////

    case GET_PACKAGES:
      return {
        ...state,
        packages: null,
        getPackagesLoader: true,
        getPackagesError: null
      };

    case GET_PACKAGES_SUCCESS:
      return {
        ...state,
        packages: action.payload,
        getPackagesLoader: false,
        getPackagesError: null
      };

    case GET_PACKAGES_FAILURE:
      return {
        ...state,
        packages: null,
        getPackagesLoader: false,
        getPackagesError: "Can not Get Venue by id"
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

    ////////////////////

    case SAVE_BOOKING_ITEM:
      return {
        ...state,
        saveBookingItem: action.payload
      };

    ////////////////////

    case GET_BOOKING_ITEM:
      return {
        ...state,
        bookingItem: null,
        getBookingItemLoader: true,
        getBookingItemError: null
      };

    case GET_BOOKING_ITEM_SUCCESS:
      return {
        ...state,
        bookingItem: action.payload,
        getBookingItemLoader: false,
        getBookingItemError: null
      };
    case GET_BOOKING_ITEM_FAILURE:
      return {
        ...state,
        bookingItem: null,
        getBookingItemLoader: false,
        getBookingItemError: "No Booking Items Shows"
      };

    ////////////////////

    case GET_VENUE_FOR_BOOKED_DETAILS:
      return {
        ...state,
        bookedVenue: null,
        getVenueForBookedDetailsLoader: true,
        getVenueForBookedDetailsError: null
      };

    case GET_VENUE_FOR_BOOKED_DETAILS_SUCCESS:
      return {
        ...state,
        bookedVenue: action.payload,
        getVenueForBookedDetailsLoader: false,
        getVenueForBookedDetailsError: null
      };
    case GET_VENUE_FOR_BOOKED_DETAILS_FAILURE:
      return {
        ...state,
        bookedVenue: null,
        getVenueForBookedDetailsLoader: false,
        getVenueForBookedDetailsError: "No Booking Items Shows"
      };

    ////////////////////

    case GET_VENUES_BY_USER_ID:
      return {
        ...state,
        getVenuesByUserId: null,
        getVenuesByUserIdLoader: true,
        getVenuesByUserIdError: null
      };

    case GET_VENUES_BY_USER_ID_SUCCESS:
      return {
        ...state,
        getVenuesByUserId: action.payload,
        getVenuesByUserIdLoader: false,
        getVenuesByUserIdError: null
      };

    case GET_VENUES_BY_USER_ID_FAILURE:
      return {
        ...state,
        getVenuesByUserId: null,
        getVenuesByUserIdLoader: false,
        getVenuesByUserIdError: "Can not Get Venues by user id"
      };

    ///////////////////

    case CHANGE_OBJ_STATUS:
      return {
        ...state,
        changeObjStatus: 0,
        changeObjStatusLoader: true,
        changeObjStatusError: null
      };

    case CHANGE_OBJ_STATUS_SUCCESS:
      return {
        ...state,
        changeObjStatus: action.payload,
        changeObjStatusLoader: false,
        changeObjStatusError: null
      };

    case CHANGE_OBJ_STATUS_FAILURE:
      return {
        ...state,
        changeObjStatus: 0,
        changeObjStatusLoader: false,
        changeObjStatusError: "Can not Get Venues"
      };

    ///////////////////

    case CREATE_FEEDBACK:
      return {
        ...state,
        feedback: 0,
        createFeedbackLoader: true,
        createFeedbackError: null
      };

    case CREATE_FEEDBACK_SUCCESS:
      return {
        ...state,
        feedback: action.payload,
        createFeedbackLoader: false,
        createFeedbackError: null
      };

    case CREATE_FEEDBACK_FAILURE:
      return {
        ...state,
        feedback: 0,
        createFeedbackLoader: false,
        createFeedbackError: "Can not Create Feedbacks"
      };

    ///////////////////

    case GET_FEEDBACKS:
      return {
        ...state,
        feedbacked: 0,
        getFeedbackLoader: true,
        getFeedbackError: null
      };

    case GET_FEEDBACKS_SUCCESS:
      return {
        ...state,
        feedbacked: action.payload,
        getFeedbackLoader: false,
        getFeedbackError: null
      };

    case GET_FEEDBACKS_FAILURE:
      return {
        ...state,
        feedbacked: 0,
        getFeedbackLoader: false,
        getFeedbackError: "Can not Get Feedbacks"
      };

    /////////////////////////////////////// ADDRESS /////////////////////////////

    ///////////////////

    case GET_COUNTRY:
      return {
        ...state,
        country: [],
        getCountryLoader: true,
        getCountryError: null
      };

    case GET_COUNTRY_SUCCESS:
      return {
        ...state,
        country: action.payload,
        getCountryLoader: false,
        getCountryError: null
      };

    case GET_COUNTRY_FAILURE:
      return {
        ...state,
        country: [],
        getCountryLoader: false,
        getCountryError: "Can not Get Country"
      };

    ///////////////////

    case GET_STATE:
      return {
        ...state,
        states: [],
        getStateLoader: true,
        getStateError: null
      };

    case GET_STATE_SUCCESS:
      return {
        ...state,
        states: action.payload,
        getStateLoader: false,
        getStateError: null
      };

    case GET_STATE_FAILURE:
      return {
        ...state,
        states: [],
        getStateLoader: false,
        getStateError: "Can not Get State"
      };

    ///////////////////

    case GET_CITY:
      return {
        ...state,
        city: [],
        getCityLoader: true,
        getCityError: null
      };

    case GET_CITY_SUCCESS:
      return {
        ...state,
        city: action.payload,
        getCityLoader: false,
        getCityError: null
      };

    case GET_CITY_FAILURE:
      return {
        ...state,
        city: [],
        getCityLoader: false,
        getCityError: "Can not Get City"
      };

    default:
      return state;
  }
}
