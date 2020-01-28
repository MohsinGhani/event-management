import { Observable } from "rxjs/Rx";
import { venueAction } from "./../actions/index";
import { HttpService } from "../../services/http";
import path from "./../../config/path";
import credentials from "../../config/credentials";

import {
  REVERSE_GEOCODING,
  SAVE_VENUES,
  UPDATE_VENUE,
  GET_VENUES,
  GET_VENUE,
  SAVE_CUSTOM_BOOKING,
  GET_VENUES_BY_USER_ID,
  CHANGE_OBJ_STATUS,
  GET_ARCHIVE_VENUES,
  CREATE_PACKAGES,
  GET_PACKAGES,
  GET_BOOKING_ITEM,
  GET_VENUE_FOR_BOOKED_DETAILS,
  GET_ORDER_CONFIRMATION_ITEM,
  GET_PENDING_STATUS_VENUES,
  CREATE_FEEDBACK,
  GET_FEEDBACKS,
  GET_PENDING_BOOKING_STATUS,
  GET_PENDING_BOOKING_APPROVAL,
  GET_COUNTRY,
  GET_STATE,
  GET_CITY
} from "../constants";
import { db } from "../../firebase/FireBase";

/////////////////////////// Get location latitude and logitude

export default class venueEpic {
  static reverseGeoCoding = action$ =>
    action$.ofType(REVERSE_GEOCODING).switchMap(({ payload }) => {
      return HttpService.get(
        `${path.REVERSE_GEOCODING}/${payload.lng},${payload.lat}.json?access_token=${credentials.MAP_ACCESS_TOCKEN}`,
        payload
      )
        .switchMap(response => {
          if (response.status === 200) {
            return Observable.of(
              venueAction.reverseGeoCodingSuccess(response["response"].features)
            );
          }
        })
        .catch(err => {
          return Observable.of(
            venueAction.likeProductFailure({
              error: err.message
            })
          );
        });
    });

  /////////////////////////// save form detail in our database

  static saveVenue = action$ =>
    action$.ofType(SAVE_VENUES).switchMap(({ payload }) => {
      return Observable.fromPromise(
        db
          .collection("services")
          .doc()
          .set(payload)
      )
        .switchMap(doc => {
          return Observable.of(venueAction.saveVenueSuccess(payload));
        })
        .catch(err => {
          return venueAction.saveVenueFailure(`Error in Save venue! ${err}`);
        });
    });

  /////////////////////////// create packages in database

  static createPackages = action$ =>
    action$.ofType(CREATE_PACKAGES).switchMap(({ payload }) => {
      return Observable.fromPromise(
        db
          .collection("packages")
          .doc()
          .set(payload)
      )
        .switchMap(doc => {
          return Observable.of(venueAction.createPackagesSuccess(payload));
        })
        .catch(err => {
          return venueAction.createPackagesFailure(
            `Error in create package! ${err}`
          );
        });
    });

  /////////////////////////// cretae feedbacks form

  static createFeedback = action$ =>
    action$.ofType(CREATE_FEEDBACK).switchMap(({ payload }) => {
      return Observable.fromPromise(
        db
          .collection("feedback")
          .doc()
          .set(payload)
      )
        .switchMap(doc => {
          return Observable.of(venueAction.createFeedbackSuccess(payload));
        })
        .catch(err => {
          return venueAction.createFeedbackFailure(
            `Error in Save venue! ${err}`
          );
        });
    });

  /////////////////////////// get feedbacks data

  static getFeedbacks = action$ =>
    action$.ofType(GET_FEEDBACKS).mergeMap(({ payload }) => {
      const { vid } = payload;
      const feedbacks = [];
      return (
        db
          .collection("feedback")
          .where("eventId", "==", vid)
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              feedbacks.push({ ...doc.data(), fid: doc.id });
            });
            return venueAction.getFeedbacksSuccess(feedbacks);
          })
          .catch(err => {
            return venueAction.getArchiveVenuesFailure(
              `Error in getting feedbacks! ${err}`
            );
          })
      );
    });

  /////////////////////////// update or edit your form details

  static updateVenue = action$ =>
    action$.ofType(UPDATE_VENUE).switchMap(({ payload }) => {
      const { vid } = payload;

      return Observable.fromPromise(
        db
          .collection("services")
          .doc(vid)
          .set(payload)
      )
        .switchMap(() => {
          return Observable.of(venueAction.updateVenueSuccess(payload));
        })
        .catch(err => {
          return venueAction.updateVenueFailure(
            `Error in update venue! ${err}`
          );
        });
    });

  /////////////////////////// change status of venue for delete, archive and unarchive

  static changeObjStatus = action$ =>
    action$.ofType(CHANGE_OBJ_STATUS).switchMap(({ payload }) => {
      const { itemId, collectionName } = payload;

      return Observable.fromPromise(
        db
          .collection(collectionName)
          .doc(itemId)
          .set(payload)
      )
        .switchMap(() => {
          return Observable.of(venueAction.changeObjStatusSuccess(payload));
        })
        .catch(err => {
          return venueAction.changeObjStatusFailure(
            `Error in update venue! ${err}`
          );
        });
    });

  /////////////////////////// get all venue in main page

  static getVenues = action$ =>
    action$.ofType(GET_VENUES).mergeMap(async () => {
      try {
        const querySnapshot = await db
          .collection("services")
          .where("objStatus", "==", 1)
          .get();
        let services = [];
        querySnapshot.forEach(doc => {
          services.push({ ...doc.data(), vid: doc.id });
        });
        return venueAction.getVenuesSuccess(services);
      } catch (err) {
        return venueAction.getVenuesFailure(
          `Error in getting services! ${err}`
        );
      }
    });

  /////////////////////////// get packages on venue details page

  static getPackages = action$ =>
    action$.ofType(GET_PACKAGES).mergeMap(({ payload }) => {
      const { vid } = payload;
      let packages = [];

      if (vid) {
        return db
          .collection("packages")
          .where("eventId", "==", vid)
          .get()
          .then(function (querySnapshot) {
            querySnapshot.forEach(doc => {
              packages.push({ ...doc.data(), pid: doc.id });
            });
            return venueAction.getPackagesSuccess(packages);
          })
          .catch(function (err) {
            return venueAction.getPackagesFailure(
              `Error in getting packages! ${err}`
            );
          });
      } else {
        return venueAction.getPackagesFailure('venue is is not found');
      }
    });

  /////////////////////////// get archive venue on archive section

  static getArchiveVenues = action$ =>
    action$.ofType(GET_ARCHIVE_VENUES).mergeMap(({ payload }) => {
      const { userId } = payload;
      let services = [];

      if (userId) {
        return db
          .collection("services")
          .where("userId", "==", userId)
          .where("objStatus", "==", 2)
          .get()
          .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
              services.push({ ...doc.data(), vid: doc.id });
            });
            return venueAction.getArchiveVenuesSuccess(services);
          })
          .catch(function (error) {
            console.log("Error getting documents: ", error);
            return venueAction.getArchiveVenuesFailure(
              `Error in getting archive venue! ${error}`
            );
          });
      }
      else {
        return venueAction.getArchiveVenuesFailure('user id not found');
      }
    });

  ///////////////////////////get venue if venue present in database

  static getVenue = action$ =>
    action$.ofType(GET_VENUE).mergeMap(({ payload }) => {
      return db
        .collection("services")
        .doc(payload)
        .get()
        .then(doc => {
          if (doc.exists) {
            return venueAction.getVenueSuccess({
              ...doc.data(),
              vid: doc.id
            });
          } else {
            return venueAction.getVenueFailure(`No such document!`);
          }
        })
        .catch(error => {
          return venueAction.getVenueFailure(
            `Error in getting venue! ${error}`
          );
        });
    });

  /////////////////////////// get venue booked detail

  static getVenueForBookedDetails = action$ =>
    action$.ofType(GET_VENUE_FOR_BOOKED_DETAILS).mergeMap(({ payload }) => {
      const { vid } = payload;
      let venue = [];

      if (vid) {
        return db
          .collection("services")
          .where("vid", "==", vid)
          .get()
          .then(function (querySnapshot) {
            querySnapshot.forEach(doc => {
              venue.push({ ...doc.data(), vid: doc.id });
            });
            return venueAction.getVenueForBookedDetailsSuccess(venue);
          })
          .catch(function (err) {
            return venueAction.getVenueForBookedDetailsFailure(
              `Error in getting venue! ${err}`
            );
          });
      }
      else {
        return venueAction.getVenueForBookedDetailsFailure('venue id is not define');
      }
    });

  /////////////////////////// save booking in database

  static saveCustomBooking = action$ =>
    action$.ofType(SAVE_CUSTOM_BOOKING).mergeMap(({ payload }) => {
      return Observable.fromPromise(
        db
          .collection("booking")
          .doc()
          .set(payload)
      )
        .switchMap(() => {
          return Observable.of(venueAction.saveCustomBookingSuccess(payload));
        })
        .catch(err => {
          return venueAction.saveCustomBookingFailure(
            `Error in Save Booking! ${err}`
          );
        });
    });

  ///////////////////////////  get user venue on dashboard

  static getVenuesByUserId = action$ =>
    action$.ofType(GET_VENUES_BY_USER_ID).mergeMap(({ payload }) => {
      const { userId } = payload;
      const ven = [];

      if (userId) {
        return db
          .collection("services")
          .where("userId", "==", userId)
          .where("objStatus", "==", 1)
          .get()
          .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
              // doc.data() is never undefined for query doc snapshots
              ven.push({ ...doc.data(), vid: doc.id });
            });
            return venueAction.getVenuesByUserIdSuccess(ven);
          })
          .catch(function (error) {
            console.log("Error getting documents: ", error);
            alert("ops no product Add some product");
            venueAction.getVenuesByUserIdFailure(
              `Error in getting venue! ${error}`
            );
          });
      }
      else {
        return venueAction.getVenuesByUserIdFailure(
          `User id not found`
        );
      }
    });

  /////////////////////////// get booking item on deshboard section

  static getBookingItem = action$ =>
    action$.ofType(GET_BOOKING_ITEM).mergeMap(({ payload }) => {
      const { userId, vid } = payload;
      const bookingItem = [];
      if (userId) {
        return db
          .collection("booking")
          .where("userId", "==", userId)
          .where("bookingStatus", "==", 1)
          .get()
          .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
              // doc.data() is never undefined for query doc snapshots
              bookingItem.push({ ...doc.data(), bid: doc.id });
            });

            return venueAction.getBookingItemSuccess(bookingItem);
          })
          .catch(function (error) {
            venueAction.getBookingItemFailure(
              `Error in getting venue! ${error}`
            );
          });
      } else if (vid) {
        return db
          .collection("booking")
          .where("eventId", "==", vid)
          .where("bookingStatus", "==", 1)
          .get()
          .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
              // doc.data() is never undefined for query doc snapshots
              bookingItem.push({ ...doc.data(), bid: doc.id });
              // props.getMyProducts(doc.data());
            });

            return venueAction.getBookingItemSuccess(bookingItem);
          })
          .catch(function (error) {
            venueAction.getBookingItemFailure(
              `Error in getting venue! ${error}`
            );
          });
      }
      else {
        return venueAction.getBookingItemFailure(
          `id not found`
        );
      }
    });

  /////////////////////////// get pending booking Status in dashboard section

  static getPendingBookingStatus = action$ =>
    action$.ofType(GET_PENDING_BOOKING_STATUS).mergeMap(({ payload }) => {
      const { userId } = payload;
      const pendingBooking = [];

      if (userId) {
        return db
          .collection("booking")
          .where("userId", "==", userId)
          .where("bookingStatus", "==", 0)
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              pendingBooking.push({ ...doc.data(), bid: doc.id });
            });
            return venueAction.getPendingBookingStatusSuccess(pendingBooking);
          })
          .catch(error => {
            venueAction.getPendingBookingStatusFailure(
              `Error in getting pending status ${error}`
            );
          });
      }
      else {
        return venueAction.getPendingBookingStatusFailure('user id is not found');
      }
    });

  /////////////////////////// get pending booking Approval in dashboard section

  static getPendingBookingApproval = action$ =>
    action$.ofType(GET_PENDING_BOOKING_APPROVAL).mergeMap(({ payload }) => {
      const { userId } = payload;
      const bookingApproval = [];

      if (userId) {
        return db
          .collection("booking")
          .where("eventCreatorId", "==", userId)
          .where("bookingStatus", "==", 0)
          .get()
          .then(querySnapshot => {
            querySnapshot.forEach(doc => {
              bookingApproval.push({ ...doc.data(), bookingApprovalID: doc.id });
            });
            return venueAction.getPendingBookingApprovalSuccess(bookingApproval);
          })
          .catch(error => {
            venueAction.getPendingBookingApprovalFailure(
              `Error in getting pending status ${error}`
            );
          });
      }
      else {
        return venueAction.getPendingBookingApprovalFailure('user id not found');
      }
    });

  /////////////////////////// get pending status venues in dashboard section

  static getPendingStatusVenues = action$ =>
    action$.ofType(GET_PENDING_STATUS_VENUES).mergeMap(({ payload }) => {
      const { userId } = payload;
      const ven = [];

      if (userId) {
        return db
          .collection("services")
          .where("userId", "==", userId)
          .where("objStatus", "==", 0)
          .get()
          .then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
              // doc.data() is never undefined for query doc snapshots
              ven.push({ ...doc.data(), vid: doc.id });
            });
            return venueAction.getPendingStatusVenuesSuccess(ven);
          })
          .catch(function (error) {
            console.log("Error getting documents: ", error);
            alert("ops no product Add some product");
            venueAction.getPendingStatusVenuesFailure(
              `Error in getting venue! ${error}`
            );
          });
      } else {
        return venueAction.getPendingStatusVenuesFailure('user id not found');
      }
    });

  /////////////////////////////////////////////////

  static getCountry = action$ =>
    action$.ofType(GET_COUNTRY).switchMap(() => {
      return HttpService.get(path.GET_COUNTRY)
        .switchMap(({ response }) => {
          let countries = [];
          Object.keys(response.result).map((key, i) => {
            countries.push({ name: response.result[key], code: key });
          });
          return Observable.of(venueAction.getCountrySuccess(countries));
        })
        .catch(err => {
          return Observable.of(
            venueAction.getCountryFailure({ error: err.message })
          );
        });
    });

  /////////////////////////////////////////////////

  static getState = action$ =>
    action$.ofType(GET_STATE).switchMap(({ payload }) => {
      const { countryCode } = payload;
      return HttpService.get(`${path.GET_STATE}${countryCode}`)
        .switchMap(({ response }) => {
          let states = [];
          Object.keys(response.result).map((key, i) => {
            states.push({ name: response.result[key], code: key.slice(1, -1) });
          });
          return Observable.of(venueAction.getStateSuccess(states));
        })
        .catch(err => {
          return Observable.of(
            venueAction.getStateFailure({ error: err.message })
          );
        });
    });

  /////////////////////////////////////////////////

  static getCity = action$ =>
    action$.ofType(GET_CITY).switchMap(({ payload }) => {
      const { countryCode, stateCode } = payload;
      return HttpService.get(
        `${path.GET_CITY}${countryCode}${path.city1}${stateCode}`
      )
        .switchMap(({ response }) => {
          let cities = [];
          Object.keys(response.result).map((key, i) => {
            cities.push({ name: response.result[key], code: key.slice(1, -1) });
          });
          return Observable.of(venueAction.getCitySuccess(cities));
        })
        .catch(err => {
          return Observable.of(
            venueAction.getCityFailure({ error: err.message })
          );
        });
    });
}
