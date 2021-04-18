import { takeEvery, put, select, call } from "redux-saga/effects";
import HttpStatusCodes from "http-status-codes";
import { replace } from "connected-react-router";

import { WEBAPI_LOGIN_ACTION, WebapiLoginAction } from "@/actions/webapi-login";
import { webapiAuthenticated } from "@/actions/webapi-authenticated";
import { webapiError } from "@/actions/webapi-error";

import { serverAddressSelector } from "../selectors/server";
import { authenticate, adjustOpenIDReturnTo } from "../api";

export default function* webapiLoginSaga() {
  yield takeEvery(WEBAPI_LOGIN_ACTION, handleWebapiLogin);
}

function* handleWebapiLogin(action: WebapiLoginAction) {
  const serverAddress: string | null = yield select(serverAddressSelector);
  if (!serverAddress) {
    yield put(replace("/connect"));
    return;
  }

  try {
    const response: PromiseReturnType<typeof authenticate> = yield call(
      authenticate,
      serverAddress
    );
    if (response.type === "redirect") {
      const location = adjustOpenIDReturnTo(response.location, serverAddress);
      window.location.href = location;
    } else if (response.type === "jwt") {
      yield put(webapiAuthenticated(serverAddress, response.authorization));
    }
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
