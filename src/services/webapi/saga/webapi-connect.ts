import { takeLatest, put, select, call } from "redux-saga/effects";
import { replace } from "connected-react-router";

import {
  WebapiConnectAction,
  WEBAPI_CONNECT_ACTION
} from "@/actions/webapi-connect";
import { webapiAuthenticated } from "@/actions/webapi-authenticated";

import { authQuerySelector } from "../selectors/authquery";
import { LoginPayload } from "../payloads";
import { authenticate } from "../api";

export default function* webapiConnectSaga() {
  yield takeLatest(WEBAPI_CONNECT_ACTION, handleWebapiConnectAction);
}

function* handleWebapiConnectAction(action: WebapiConnectAction) {
  const { serverAddress } = action.payload;
  const authQuery = yield select(authQuerySelector);

  try {
    const payload: LoginPayload = yield call(
      authenticate,
      serverAddress,
      authQuery
    );
    yield put(webapiAuthenticated(payload.authorization));
    yield put(replace("/server"));
  } catch (e) {
    // TODO: Show user
    console.error(e);
  }
}
