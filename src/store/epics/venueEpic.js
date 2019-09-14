import { REVERSE_GEOCODING } from "./../constants";
import { Observable } from "rxjs/Rx";
import { venueAction } from "./../actions/index";
import { HttpService } from "../../services/http";
import path from "./../../config/path";
import credentials from "../../config/credentials";
import { SAVE_VENUES, GET_VENUES } from "../constants";
import { db } from "../../firebase/FireBase";
import { storage } from "../../firebase/FireBase";

export default class venueEpic {
  static reverseGeoCoding = action$ =>
    action$.ofType(REVERSE_GEOCODING).switchMap(({ payload }) => {
      return HttpService.get(
        `${path.REVERSE_GEOCODING}/${payload.lng},${payload.lat}.json?access_token=${credentials.MAP_ACCESS_TOCKEN}`,
        payload
      )
        .switchMap(response => {
          if (response.status === 200) {
            // console.log(response['response'].features)
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
          return Observable.of(
            venueAction.saveVenueSuccess(payload)
            //   venueAction.getVenues()
          );
        })
        .catch(err => {
          return venueAction.saveVenueFailure(`Error in Save venue! ${err}`);
        });
    });

  static getVenues = action$ =>
    action$.ofType(GET_VENUES).mergeMap(async () => {
      try {
        const querySnapshot = await db
          .collection("services")
          .get();
        let services = [];
        querySnapshot.forEach(doc => {
          // console.log(doc.id, "=>", doc.data());
          services.push({ ...doc.data(), id: doc.id });
        });
        console.log('these services goint to reducer', services)
        return venueAction.getVenuesSuccess(services);
      }
      catch (err) {
        return venueAction.getVenuesFailure(`Error in getting services! ${err}`);
      }
    });
}
