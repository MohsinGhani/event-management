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
  GET_ORDER_CONFIRMATION_ITEM
} from "../constants";
import { db } from "../../firebase/FireBase";
import auth from "../../firebase/FireBase";

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

  static changeObjStatus = action$ =>
    action$.ofType(CHANGE_OBJ_STATUS).switchMap(({ payload }) => {
      const { vid } = payload;

      return Observable.fromPromise(
        db
          .collection("services")
          .doc(vid)
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

  static getPackages = action$ =>
    action$.ofType(GET_PACKAGES).mergeMap(({ payload }) => {
      const { vid } = payload;
      let packages = [];

      return db
        .collection("packages")
        .where("eventId", "==", vid)
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(doc => {
            packages.push({ ...doc.data(), pid: doc.id });
          });
          console.log(packages);
          return venueAction.getPackagesSuccess(packages);
        })
        .catch(function(err) {
          return venueAction.getPackagesFailure(
            `Error in getting packages! ${err}`
          );
        });
    });

  static getArchiveVenues = action$ =>
    action$.ofType(GET_ARCHIVE_VENUES).mergeMap(({ payload }) => {
      // let user = auth.currentUser.uid;

      const { userId } = payload;
      let services = [];

      return db
        .collection("services")
        .where("userId", "==", userId)
        .where("objStatus", "==", 2)
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            services.push({ ...doc.data(), vid: doc.id });
            // alert("venue get");
            // console.log(doc.id, " => ", doc.data());
            // props.getMyProducts(doc.data());
          });
          return venueAction.getArchiveVenuesSuccess(services);
        })
        .catch(function(error) {
          console.log("Error getting documents: ", error);
          venueAction.getArchiveVenuesFailure(
            `Error in getting archive venue! ${error}`
          );
        });
    });

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

  static getVenueForBookedDetails = action$ =>
    action$.ofType(GET_VENUE_FOR_BOOKED_DETAILS).mergeMap(({ payload }) => {
      const { vid } = payload;
      let venue = [];

      return db
        .collection("services")
        .where("vid", "==", vid)
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(doc => {
            venue.push({ ...doc.data(), vid: doc.id });
          });
          console.log(venue);
          return venueAction.getVenueForBookedDetailsSuccess(venue);
        })
        .catch(function(err) {
          return venueAction.getVenueForBookedDetailsFailure(
            `Error in getting venue! ${err}`
          );
        });
    });

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

  static getVenuesByUserId = action$ =>
    action$.ofType(GET_VENUES_BY_USER_ID).mergeMap(({ payload }) => {
      // let user = auth.currentUser.uid;
      const { userId } = payload;
      const ven = [];

      return db
        .collection("services")
        .where("userId", "==", userId)
        .where("objStatus", "==", 1)
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            ven.push({ ...doc.data(), vid: doc.id });
            // alert("venue get");
            // console.log(doc.id, " => ", doc.data());
            // props.getMyProducts(doc.data());
          });
          return venueAction.getVenuesByUserIdSuccess(ven);
        })
        .catch(function(error) {
          console.log("Error getting documents: ", error);
          alert("ops no product Add some product");
          venueAction.getVenuesByUserIdFailure(
            `Error in getting venue! ${error}`
          );
        });
    });

  static getBookingItem = action$ =>
    action$.ofType(GET_BOOKING_ITEM).mergeMap(({}) => {
      // let user = auth.currentUser.uid;
      // const { userId } = payload;
      const bookingItem = [];

      return (
        db
          .collection("booking")
          // .where("userId", "==", userId)
          .get()
          .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
              // doc.data() is never undefined for query doc snapshots
              bookingItem.push({ ...doc.data(), vid: doc.id });
              console.log(doc.id, " => ", doc.data());
              // props.getMyProducts(doc.data());
            });

            return venueAction.getBookingItemSuccess(bookingItem);
          })
          .catch(function(error) {
            console.log("Error getting documents: ", error);
            alert("ops no product Add some product");
            venueAction.getBookingItemFailure(
              `Error in getting venue! ${error}`
            );
          })
      );
    });
}

// static getVenuesByUserId = action$ =>
//     action$.ofType(GET_VENUES_BY_USER_ID).mergeMap(({ payload }) => {
//       // const { userId, getVenue } = payload;
// const { user } = auth.currentUser;
//
//       return (
//         db
//           .collection("services")
//           // .where(userId.uid, "==",getVenue.userId )
//           // .doc(payload)
//           .where("userId", "==", user.uid)
//           .get()
//           .then(doc => {
//
//             console.log(payload);
//             if (doc.exists) {
//               console.log(doc.data());
//
//               console.log(doc.data());
//               return venueAction.getVenuesByUserIdSuccess({
//                 ...doc.data()
//               });
//             } else {
//               return venueAction.getVenuesByUserIdFailure(`No such document!`);
//             }
//           })
//           .catch(error => {
//
//             return venueAction.getVenuesByUserIdFailure(
//               `Error in getting venue! ${error}`
//             );
//           })
//       );

// static getDeletedVenues = action$ =>
// action$.ofType(GET_DELETED_VENUES).mergeMap(async () => {
//   try {
//     const querySnapshot = await db
//       .collection("services")
//       .where("objStatus", "==", 0)
//       .get();
//     let services = [];
//     querySnapshot.forEach(doc => {
//       services.push({ ...doc.data(), vid: doc.id });
//     });
//     return venueAction.getDeletedVenuesSuccess(services);
//   } catch (err) {
//     return venueAction.getDeletedVenuesFailure(
//       `Error in getting services! ${err}`
//     );
//   }
// });

// static getArchiveVenues = action$ =>
// action$.ofType(GET_ARCHIVE_VENUES).mergeMap(async () => {
//   try {
//     const querySnapshot = await db
//       .collection("services")
//       .where("objStatus", "==", 2)
//       .get();
//     let services = [];
//     querySnapshot.forEach(doc => {
//       services.push({ ...doc.data(), vid: doc.id });
//     });
//
//     return venueAction.getArchiveVenuesSuccess(services);
//   } catch (err) {
//     return venueAction.getArchiveVenuesFailure(
//       `Error in getting services! ${err}`
//     );
//   }
// });
