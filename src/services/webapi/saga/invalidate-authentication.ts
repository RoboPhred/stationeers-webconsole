import { takeEvery, put } from "redux-saga/effects";

import { push } from "connected-react-router";

import { INVALIDATE_AUTHENTICATION_ACTION } from "@/actions/invalidate-authentication";

export default function* invalidateAuthenticationSaga() {
  yield takeEvery(
    INVALIDATE_AUTHENTICATION_ACTION,
    handleInvalidateAuthentication
  );
}

function* handleInvalidateAuthentication() {
  yield put(push("/authenticate"));
}
