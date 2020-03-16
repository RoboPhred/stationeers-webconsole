import { fork } from "redux-saga/effects";

import steamAuthenticatedSaga from "./steam-authenticated";

export default function* webAPISaga() {
  yield fork(steamAuthenticatedSaga);
}
