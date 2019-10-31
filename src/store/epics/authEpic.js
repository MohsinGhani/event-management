import {
  SIGNIN,
  SIGNUP,
  POST_SIGNUP,
  CONFIRM_SIGNUP,
  RESEND_SIGNUP,
  POST_CONFIRM,
  IS_LOGGED_IN,
  GET_USER_BY_ID,
  LOGOUT
} from "./../constants";
import { Observable } from "rxjs/Rx";
import { authAction } from "./../actions/index";
import auth from "./../../firebase/FireBase";
import { HttpService } from "./../../services/http";
import path from "./../../config/path";
import { confirm } from "../../services/AuthService";
import { db } from "../../firebase/FireBase";

export default class authEpic {
  static signUp = action$ =>
    action$.ofType(SIGNUP).switchMap(({ payload }) => {
      return Observable.fromPromise(
        auth.createUserWithEmailAndPassword(payload.userEmail, payload.userPass)
      )
        .switchMap(response => {
          payload["uid"] = response.user.uid;
          payload["display name"]= response.user.displayName
          if (response.type && response.type === "SIGNUP_FAILURE") {
            return Observable.of(authAction.signUpFailure(response.error));
          } else {
            return Observable.fromPromise(
              db
                .collection("users")
                .doc(response.user.uid)
                .set(payload)
            );
          }
        })
        .switchMap(response => {
          return Observable.of(authAction.signUpSuccess(payload));
        })
        .catch(({ message }) => {
          return Observable.of(authAction.signInFailure(message));
        });
    });

  static signIn = action$ =>
    action$.ofType(SIGNIN).switchMap(({ payload }) => {
      const { userEmail, userPass } = payload;
      return Observable.fromPromise(
        auth.signInWithEmailAndPassword(userEmail, userPass)
      )
        .switchMap(response => {
          if (response.type && response.type === "SIGNIN_FAILURE") {
            return Observable.of(authAction.signInFailure(response.error));
          } else {
            return Observable.of(authAction.signInSuccess(response));
          }
        })
        .catch(({ message }) => {
          return Observable.of(authAction.signInFailure(message));
        });
    });

  static logout = action$ =>
    action$.ofType(LOGOUT).switchMap(() => {
      return Observable.fromPromise(auth.signOut())
        .switchMap(response => {
          if (response.type && response.type === "LOGOUT_FAILURE") {
            return Observable.of(authAction.logoutFailure(response.error));
          } else {
            return Observable.of(authAction.logoutSuccess(response));
          }
        })
        .catch(err => {
          return Observable.of(authAction.logoutFailure(err));
        });
    });

  static isLoggedIn = action$ =>
    action$.ofType(IS_LOGGED_IN).switchMap(() => {
      return Observable.fromPromise(
        new Promise((res, rej) => {
          auth.onAuthStateChanged(user => {
            if (user) {
              res(user);
            } else {
              rej(false);
            }
          });
        })
      )
        .switchMap(res => {
          if (res.type && res.type === "IS_LOGGED_IN_FAILURE") {
            return Observable.of(authAction.isLoggedInFailure(res));
          } else {
            return Observable.of(
              authAction.isLoggedInSuccess(res),
              authAction.getUserById({ uid: res.uid })
            );
          }
        })
        .catch(err => {
          return Observable.of(authAction.isLoggedInFailure(err));
        });
    });

  static getUserById = action$ =>
    action$.ofType(GET_USER_BY_ID).mergeMap(({ payload }) => {
      return db
        .collection("users")
        .doc(payload.uid)
        .get()
        .then(doc => {
          if (doc.exists) {
            return authAction.getUserByIdSuccess({ ...doc.data() });
          } else {
            return authAction.getUserByIdFailure("no user");
          }
        })
        .catch(err => {
          return authAction.getUserByIdFailure(
            `Error in getting venue! ${err}`
          );
        });
    });

  /////////////////////////// Extra Api's //////////////////////

  static confirmSignUp = action$ =>
    action$.ofType(CONFIRM_SIGNUP).switchMap(({ payload }) => {
      let { user, code } = payload;
      return Observable.fromPromise(confirm(user, code))
        .catch(err => {
          return Observable.of(authAction.confirmSignUpFailure(err.message));
        })
        .switchMap(res => {
          if (res.type && res.type === "CONFIRM_SIGNUP_FAILURE") {
            return Observable.of(authAction.confirmSignUpFailure(res.payload));
          } else {
            return Observable.of(
              authAction.confirmSignUpSuccess(res),
              authAction.postConfirm({ user_id: res.user_id })
            );
          }
        });
    });

  static postSignUp = action$ =>
    action$.ofType(POST_SIGNUP).switchMap(({ payload }) => {
      return HttpService.post(path.POST_SIGNUP, payload)
        .switchMap(({ response }) => {
          if (response.status === 200) {
            return Observable.of(authAction.postSignUpSuccess(response.data));
          }
        })
        .catch(err => {
          return Observable.of(authAction.postSignUpFailure(`${err}`));
        });
    });

  static postConfirm = action$ =>
    action$.ofType(POST_CONFIRM).switchMap(({ payload }) => {
      return HttpService.put(`${path.POST_CONFIRMATION}/${payload.user_id}`)
        .switchMap(({ response }) => {
          if (response.status === 200) {
            return Observable.of(authAction.postConfirmSuccess(response.data));
          }
        })
        .catch(err => {
          return Observable.of(authAction.postConfirmFailure(`${err}`));
        });
    });

  static resendSignUp = action$ =>
    action$.ofType(RESEND_SIGNUP).switchMap(({ payload }) => {
      return HttpService.get(``)
        .switchMap(response => {
          if (response.status === 200) {
            return Observable.of(
              authAction.resendSignUpSuccess(response.response.results)
            );
          }
        })
        .catch(err => {
          return Observable.of(authAction.resendSignUpFailure(``));
        });
    });
}
