import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import HttpStatusCodes from "http-status-codes";

import { webapiAuthenticationInvalidated } from "@/actions/webapi-authentication-invalidated";

import { serverAddressSelector } from "../selectors/server";
import { authorizationSelector } from "../selectors/authorization";
import { ApiFunction } from "../api";
import { WebAPIError } from "../errors";

export function useApiCall<TResult, TArgs extends any[]>(
  apiCall: ApiFunction<TResult, TArgs>
): (...args: TArgs) => Promise<TResult> {
  const dispatch = useDispatch();
  dispatch.bind;
  const serverAddress = useSelector(serverAddressSelector);
  const authorization = useSelector(authorizationSelector);
  return React.useCallback(
    (...args) => {
      if (!serverAddress || !authorization) {
        dispatch(webapiAuthenticationInvalidated());
        throw new WebAPIError(HttpStatusCodes.UNAUTHORIZED, "Unauthorized.");
      }
      return apiCall(serverAddress, authorization, ...args).catch((e) => {
        if (e.statusCode === HttpStatusCodes.UNAUTHORIZED) {
          dispatch(webapiAuthenticationInvalidated());
        }
        throw e;
      });
    },
    [serverAddress, authorization]
  );
}
