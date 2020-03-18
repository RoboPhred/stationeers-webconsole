import { fork } from "redux-saga/effects";

import invalidateAuthenticationSaga from "./invalidate-authentication";
import loginSaga from "./login";
import steamAuthenticatedSaga from "./steam-authenticated";
import webapiAuthenticatedSaga from "./webapi-authenticated";

export default function* webAPISaga() {
  yield fork(invalidateAuthenticationSaga);
  yield fork(loginSaga);
  yield fork(steamAuthenticatedSaga);
  yield fork(webapiAuthenticatedSaga);
}
