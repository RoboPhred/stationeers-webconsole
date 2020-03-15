import * as React from "react";
import { useSelector } from "react-redux";

import { PlayerPayload } from "../payloads";
import { serverAddressSelector } from "../selectors/server";
import { authorizationSelector } from "../selectors/authorization";
import {
  getPlayers,
  kickPlayer as apiKickPlayer,
  banPlayer as apiBanPlayer
} from "../api";

export interface UsePlayers {
  players: PlayerPayload[];
  kickPlayer(steamId: string, reason: string | null): void;
  banPlayer(steamId: string, reason: string | null, duration: number): void;
}
export function usePlayers(): UsePlayers {
  const serverAddress = useSelector(serverAddressSelector);
  const authorization = useSelector(authorizationSelector);

  const [players, setPlayers] = React.useState<PlayerPayload[]>([]);

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

  React.useEffect(() => {
    fetchPlayers();
  }, []);

  const kickPlayer = React.useCallback(
    async (steamId: string, reason: string | null) => {
      if (!serverAddress || !authorization) {
        return;
      }
      await apiKickPlayer(serverAddress, authorization, steamId, reason);
      fetchPlayers();
    },
    [serverAddress, authorization]
  );

  const banPlayer = React.useCallback(
    async (steamId: string, reason: string | null, duration: number) => {
      if (!serverAddress || !authorization) {
        return;
      }
      await apiBanPlayer(
        serverAddress,
        authorization,
        steamId,
        reason,
        duration
      );
      fetchPlayers();
    },
    [serverAddress, authorization]
  );

  return {
    players,
    kickPlayer,
    banPlayer
  };
}
