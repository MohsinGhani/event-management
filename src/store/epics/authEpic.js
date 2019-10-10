import {
  SIGNIN,
  SIGNUP,
  POST_SIGNUP,
  CONFIRM_SIGNUP,
  RESEND_SIGNUP,
  POST_CONFIRM,
  IS_LOGGED_IN,
  GET_USER_BY_ID,
  LOGOUT,
  SIGNUP_FAILURE,
  SIGNIN_FAILURE,
  LOGOUT_FAILURE,
  LOGOUT_SUCCESS
} from "./../constants";
import { Observable } from "rxjs/Rx";
import { authAction } from "./../actions/index";
import auth from "./../../firebase/FireBase";
import { HttpService } from "./../../services/http";
import path from "./../../config/path";
import {
  login,
  signup,
  confirm,
  isLoggedIn,
  logout
} from "../../services/AuthService";
import { db } from "../../firebase/FireBase";

export default class authEpic {
  static signUp = action$ =>
    action$.ofType(SIGNUP).switchMap(({ payload }) => {
      return Observable.fromPromise(
        auth.createUserWithEmailAndPassword(payload.userEmail, payload.userPass)
      )
        .catch(err => {
          return Observable.of(authAction.signUpFailure(err));
        })
        .switchMap(response => {
          let userId = "";
          userId = response.user.uid;
          if (response.type && response.type === "SIGNUP_FAILURE") {
            return Observable.of(authAction.signUpFailure(response.error));
          } else {
            return Observable.fromPromise(
              db
                .collection("Users")
                .doc(userId)
                .set(payload)
            )
              .switchMap(response => {
                return Observable.of(
                  authAction.signUpSuccess(response)
                  // authAction.signIn(response)
                );
              })
              .catch(err => {
                return Observable.of(authAction.signInFailure(err));
              });
          }
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
        })
    });

  ///////////////////////////////////////******************************************//////////////////////////////////////

  // static logout = action$ =>
  //   action$.ofType(LOGOUT).switchMap(() => {
  //     return (
  //       Observable.fromPromise(auth.signOut())
  //         .catch(err => {
  //           return Observable.of({ type: LOGOUT_FAILURE });
  //           // return Observable.of(authAction.logoutFailure(err));
  //         })
  //         // .switchMap(response => {
  //         //   if (response.type && response.type === LOGOUT_FAILURE) {
  //         //     return Observable.of(authAction.logoutFailure(response.error));
  //         //   } else {
  //         //     return Observable.of(authAction.logoutSuccess(response));
  //         //   }
  //         // });
  //         .map(response => {
  //           if (response.type && response.type === "LOGOUT_FAILURE") {
  //             return {
  //               type: LOGOUT_FAILURE
  //             };
  //           } else {
  //             return {
  //               type: LOGOUT_SUCCESS
  //             };
  //           }
  //         })
  //     );
  //   });

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
        .catch(err => {
          return Observable.of(authAction.isLoggedInFailure(err));
        })
        .switchMap(res => {
          if (res.type && res.type === "IS_LOGGED_IN_FAILURE") {
            return Observable.of(authAction.isLoggedInFailure(res));
          } else {
            return Observable.of(
              authAction.isLoggedInSuccess(res)
            );
          }
        });
    });

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

  static getUserById = action$ =>
    action$.ofType(GET_USER_BY_ID).switchMap(({ payload }) => {
      return HttpService.get(`${path.GET_USER_BY_ID}/${payload.user_id}`)
        .switchMap(({ response }) => {
          response = JSON.parse(response);
          if (response.status === 200) {
            return Observable.of(authAction.getUserByIdSuccess(response.data));
          }
        })
        .catch(err => {
          return Observable.of(
            authAction.getUserByIdFailure({ error: err.message })
          );
        });
    });
}
