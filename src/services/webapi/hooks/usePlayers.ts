import * as React from "react";
import { useSelector } from "react-redux";

import { PlayerPayload } from "../payloads";
import { serverAddressSelector } from "../selectors/server";
import { authorizationSelector } from "../selectors/authorization";
import { getPlayers } from "../api";

export function usePlayers(): PlayerPayload[] {
  const serverAddress = useSelector(serverAddressSelector);
  const authorization = useSelector(authorizationSelector);

  const [players, setPlayers] = React.useState<PlayerPayload[]>([]);

  React.useEffect(() => {
    async function fetchPlayers() {
      if (!serverAddress || !authorization) {
        return;
      }

      try {
        const players = await getPlayers(serverAddress, authorization);
        setPlayers(players);
      } catch (e) {
        // TODO: Show error to user
        console.error(e);
      }
    }

    fetchPlayers();
  }, []);

  return players;
}
