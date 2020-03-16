import { takeEvery, put, call } from "redux-saga/effects";
import { replace } from "connected-react-router";

import {
  STEAM_AUTHENTICATED_ACTION,
  SteamAuthenticatedAction
} from "@/actions/steam-authenticated";
import { webapiAuthenticated } from "@/actions/webapi-authenticated";

import { LoginPayload } from "../payloads";
import { authenticate } from "../api";

export default function* steamAuthenticatedSaga() {
  yield takeEvery(STEAM_AUTHENTICATED_ACTION, handleSteamAuthenticated);
}

function* handleSteamAuthenticated(action: SteamAuthenticatedAction) {
  const { queryString } = action.payload;
  const serverAddress = DEFAULT_WEBAPI_URL; // TODO: Get from configuration
  try {
    const payload: LoginPayload = yield call(
      authenticate,
      serverAddress,
      queryString
    );
    yield put(webapiAuthenticated(payload.authorization));
    yield put(replace("/server"));
  } catch (e) {
    if (e.statusCode === 401) {
      yield put(replace("/not-authorized"));
      return;
    }

    // Might want to show the user the error message?
    yield put(replace("/connection-error"));
  }
}
