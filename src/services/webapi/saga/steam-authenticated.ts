import { takeEvery, put, call } from "redux-saga/effects";
import { replace } from "connected-react-router";
import HttpStatusCodes from "http-status-codes";

import {
  STEAM_AUTHENTICATED_ACTION,
  SteamAuthenticatedAction
} from "@/actions/steam-authenticated";
import { webapiAuthenticated } from "@/actions/webapi-authenticated";

import { LoginPayload } from "../payloads";
import { authenticateOpenID } from "../api";

export default function* steamAuthenticatedSaga() {
  yield takeEvery(STEAM_AUTHENTICATED_ACTION, handleSteamAuthenticated);
}

function* handleSteamAuthenticated(action: SteamAuthenticatedAction) {
  const { queryString } = action.payload;
  const serverAddress = DEFAULT_WEBAPI_URL; // TODO: Get from configuration
  try {
    const payload: LoginPayload = yield call(
      authenticateOpenID,
      serverAddress,
      queryString
    );
    yield put(webapiAuthenticated(payload.authorization));
  } catch (e) {
    if (e.statusCode === HttpStatusCodes.UNAUTHORIZED) {
      yield put(replace("/not-authorized"));
      return;
    }

    // Might want to show the user the error message?
    yield put(replace("/connection-error"));
  }
}
