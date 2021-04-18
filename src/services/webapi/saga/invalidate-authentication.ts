import { takeEvery, put } from "redux-saga/effects";

import { push } from "connected-react-router";

import { WEBAPI_AUTHENTICATION_INVALIDATED_ACTION } from "@/actions/webapi-authentication-invalidated";

export default function* invalidateAuthenticationSaga() {
  yield takeEvery(
    WEBAPI_AUTHENTICATION_INVALIDATED_ACTION,
    handleInvalidateAuthentication
  );
}

function* handleInvalidateAuthentication() {
  yield put(push("/login"));
}
