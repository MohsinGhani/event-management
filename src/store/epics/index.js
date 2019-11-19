import { combineEpics } from "redux-observable";
import authEpic from "./authEpic";
import venueEpic from "./venueEpic";

const rootEpic = combineEpics(
  authEpic.signIn,
  authEpic.signUp,
  authEpic.confirmSignUp,
  authEpic.resendSignUp,
  authEpic.postSignUp,
  authEpic.postConfirm,
  authEpic.isLoggedIn,
  authEpic.getUserById,
  authEpic.logout,

  venueEpic.reverseGeoCoding,
  venueEpic.saveVenue,
  venueEpic.getVenues,
  venueEpic.getVenue,
  venueEpic.saveCustomBooking,
  venueEpic.getVenuesByUserId,
  venueEpic.updateVenue,
  venueEpic.changeObjStatus,
  venueEpic.getArchiveVenues,
  venueEpic.createPackages,
  venueEpic.getPackages,
  venueEpic.getBookingItem,
  venueEpic.getVenueForBookedDetails,
  venueEpic.getPendingStatusVenues
);

export default rootEpic;
