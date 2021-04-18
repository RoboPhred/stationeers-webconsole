import { takeEvery, put, call } from "redux-saga/effects";
import { replace } from "connected-react-router";
import HttpStatusCodes from "http-status-codes";
import { parse as parseQueryString } from "query-string";

import {
  STEAM_AUTHENTICATED_ACTION,
  SteamAuthenticatedAction,
} from "@/actions/steam-authenticated";
import { webapiAuthenticated } from "@/actions/webapi-authenticated";
import { webapiError } from "@/actions/webapi-error";

import { authenticateOpenID } from "../api";

export default function* steamAuthenticatedSaga() {
  yield takeEvery(STEAM_AUTHENTICATED_ACTION, handleSteamAuthenticated);
}

function* handleSteamAuthenticated(action: SteamAuthenticatedAction) {
  const { queryString } = action.payload;

  try {
    const parsed = parseQueryString(queryString);
    const serverAddress = parsed["server-address"];
    if (typeof serverAddress !== "string" || serverAddress === "") {
      yield put(
        webapiError(
          "Steam authentication response did not include a target server address."
        )
      );
      yield put(replace("/login"));
      return;
    }

    const payload: PromiseReturnType<typeof authenticateOpenID> = yield call(
      authenticateOpenID,
      serverAddress,
      queryString
    );
    yield put(webapiAuthenticated(serverAddress, payload.authorization));
  } catch (e) {
    if (e.statusCode === HttpStatusCodes.UNAUTHORIZED) {
      yield put(replace("/not-authorized"));
      return;
    }

    // Might want to show the user the error message?
    yield put(
      webapiError("An error occurred while communicating with the server.")
    );
  }
}
