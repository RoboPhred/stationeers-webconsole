import { fork } from "redux-saga/effects";

import webAPISaga from "@/services/webapi/saga";

export default function* appSaga() {
  yield fork(webAPISaga);
}
