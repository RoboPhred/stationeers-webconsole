import * as React from "react";

import { ServerPayload } from "../payloads";
import { getServer, setServer as apiPostServer } from "../api";

import { useApiCall } from "./useApiCall";
import { UseApiData, useApiData } from "./useApiData";

export interface UseServerFunctions {
  setName(name: string): void;
  setPassword(password: string): void;
}
export type UseServer = UseApiData<ServerPayload & UseServerFunctions>;

export function useServer(): UseServer {
  const postServer = useApiCall(apiPostServer);

  const result = useApiData(getServer) as UseServer;
  const { refresh } = result;

  const setName = React.useCallback(
    (name: string) => {
      if (!name || !name.length) {
        return;
      }
      postServer({ name }).then(refresh);
    },
    [postServer, refresh]
  );

  const setPassword = React.useCallback(
    (password: string) => {
      postServer({ password }).then(refresh);
    },
    [postServer, refresh]
  );

  if (result.isLoaded) {
    result.setName = setName;
    result.setPassword = setPassword;
  }

  return result;
}
