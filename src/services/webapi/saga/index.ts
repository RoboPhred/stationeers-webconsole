import { fork } from "redux-saga/effects";

import steamAuthenticatedSaga from "./steam-authenticated";
import webapiConnectSaga from "./webapi-connect";

export default function* webAPISaga() {
  yield fork(steamAuthenticatedSaga);
  yield fork(webapiConnectSaga);
}
