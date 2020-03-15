import * as React from "react";
import { useSelector } from "react-redux";

import { ServerPayload } from "../payloads";
import { serverAddressSelector } from "../selectors/server";
import { authorizationSelector } from "../selectors/authorization";
import { getServer } from "../api";

export function useServer(): ServerPayload | null {
  const serverAddress = useSelector(serverAddressSelector);
  const authorization = useSelector(authorizationSelector);

  const [server, setServer] = React.useState<ServerPayload | null>(null);

  React.useEffect(() => {
    async function fetchServer() {
      if (!serverAddress || !authorization) {
        return;
      }

      try {
        const players = await getServer(serverAddress, authorization);
        setServer(players);
      } catch (e) {
        // TODO: Show error to user
        console.error(e);
      }
    }

    fetchServer();
  }, []);

  return server;
}
