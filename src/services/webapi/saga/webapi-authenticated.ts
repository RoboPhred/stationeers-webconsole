import { takeEvery, put } from "redux-saga/effects";
import { push } from "connected-react-router";

import { WEBAPI_AUTHENTICATED_ACTION } from "@/actions/webapi-authenticated";

export default function* webapiAuthenticatedSaga() {
  yield takeEvery(WEBAPI_AUTHENTICATED_ACTION, handleWebapiAuthenticated);
}

function* handleWebapiAuthenticated() {
  // TODO: Redirect to wherever we were going to when we lost auth
  yield put(push("/server"));
}
