import { REVERSE_GEOCODING } from "./../constants";
import { Observable } from "rxjs/Rx";
import { venueAction } from "./../actions/index";
import { HttpService } from "../../services/http";
import path from "./../../config/path";
import credentials from "../../config/credentials";
import {
  SAVE_VENUES,
  GET_VENUES,
  GET_VENUE,
  SAVE_CUSTOM_BOOKING
} from "../constants";
import { db } from "../../firebase/FireBase";

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
            venueAction.likeProductFailure({ error: err.message })
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
        .switchMap(() => {
          return Observable.of(venueAction.saveVenueSuccess(payload));
        })
        .catch(err => {
          return venueAction.saveVenueFailure(`Error in Save venue! ${err}`);
        });
    });

  static getVenues = action$ =>
    action$.ofType(GET_VENUES).mergeMap(async () => {
      try {
        const querySnapshot = await db.collection("services").get();
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

  static getVenue = action$ =>
    action$.ofType(GET_VENUE).mergeMap(({ payload }) => {
      console.log(payload);
      return db
        .collection("services")
        .doc(payload)
        .get()
        .then(doc => {
          if (doc.exists) {
            console.log("Document data:", doc.data());
            return venueAction.getVenueSuccess({ ...doc.data(), vid: doc.id });
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
}
