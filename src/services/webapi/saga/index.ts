import { fork } from "redux-saga/effects";

import invalidateAuthenticationSaga from "./invalidate-authentication";
import steamAuthenticatedSaga from "./steam-authenticated";
import webapiAuthenticatedSaga from "./webapi-authenticated";
import webapiLoginSaga from "./webapi-login";

export default function* webAPISaga() {
  yield fork(invalidateAuthenticationSaga);
  yield fork(steamAuthenticatedSaga);
  yield fork(webapiAuthenticatedSaga);
  yield fork(webapiLoginSaga);
}
