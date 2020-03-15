import * as React from "react";
import { useSelector } from "react-redux";

import { ServerPayload } from "../payloads";
import { serverAddressSelector } from "../selectors/server";
import { authorizationSelector } from "../selectors/authorization";
import { getServer, postServer } from "../api";

export interface UseServerNoData {
  isLoaded: false;
  errorMessage: string | null;
}
export interface UseServerData extends ServerPayload {
  isLoaded: true;
  errorMessage: string | null;
  setName(name: string): void;
}

export type UseServer = UseServerNoData | UseServerData;

export function useServer(): UseServer {
  const serverAddress = useSelector(serverAddressSelector);
  const authorization = useSelector(authorizationSelector);

  const [errorMessage, setError] = React.useState<string | null>(null);
  const [server, setServer] = React.useState<ServerPayload | null>(null);

  async function fetchServer() {
    if (!serverAddress || !authorization) {
      return;
    }

    try {
      const server = await getServer(serverAddress, authorization);
      setServer(server);
    } catch (e) {
      // TODO: Show error to user
      console.error(e);
    }
  }

  const postCurrentServer = React.useCallback(
    async (body: Partial<ServerPayload>) => {
      if (!serverAddress || !authorization) {
        return;
      }
      const server = await postServer(serverAddress, authorization, body);
      setServer(server);
    },
    [serverAddress, authorization]
  );

  React.useEffect(() => {
    fetchServer();
  }, []);

  const setName = React.useCallback(
    (name: string) => {
      postCurrentServer({ name });
    },
    [postServer]
  );

  if (!server) {
    return {
      isLoaded: false,
      errorMessage
    };
  }

  return {
    isLoaded: true,
    errorMessage,
    ...server,
    setName
  };
}
