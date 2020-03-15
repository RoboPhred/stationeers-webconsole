import { takeEvery, put } from "redux-saga/effects";
import { replace } from "connected-react-router";

import { STEAM_AUTHENTICATED_ACTION } from "@/actions/steam-authenticated";

export default function* steamAuthenticatedSaga() {
  yield takeEvery(STEAM_AUTHENTICATED_ACTION, handleSteamAuthenticated);
}

function* handleSteamAuthenticated() {
  yield put(replace("/connect"));
}
