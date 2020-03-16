import * as React from "react";
import { useSelector, useDispatch } from "react-redux";

import { invalidateAuthentication } from "@/actions/invalidate-authentication";

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
        dispatch(invalidateAuthentication());
        throw new WebAPIError(401, "Unauthorized.");
      }
      return apiCall(serverAddress, authorization, ...args).catch(e => {
        if (e.statusCode === 401) {
          dispatch(invalidateAuthentication());
        }
        throw e;
      });
    },
    [serverAddress, authorization]
  );
}
