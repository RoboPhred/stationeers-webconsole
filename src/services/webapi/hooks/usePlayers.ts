import * as React from "react";

import { PlayerPayload } from "../payloads";
import {
  getPlayers,
  kickPlayer as apiKickPlayer,
  banPlayer as apiBanPlayer
} from "../api";

import { useApiCall } from "./useApiCall";
import { useApiData, UseApiData } from "./useApiData";

export interface UsePlayersData {
  players: PlayerPayload[];
  kickPlayer(steamId: string, reason: string | null): void;
  banPlayer(steamId: string, reason: string | null, duration: number): void;
}
export type UsePlayers = UseApiData<UsePlayersData>;
export function usePlayers(): UsePlayers {
  const kickPlayerCall = useApiCall(apiKickPlayer);
  const banPlayerCall = useApiCall(apiBanPlayer);

  const result = useApiData(getPlayers, players => ({ players })) as UsePlayers;
  const { refresh } = result;

  const kickPlayer = React.useCallback(
    (steamId: string, reason: string | null) => {
      kickPlayerCall(steamId, reason).then(refresh);
    },
    [kickPlayerCall, refresh]
  );

  const banPlayer = React.useCallback(
    (steamId: string, reason: string | null) => {
      banPlayerCall(steamId, reason).then(refresh);
    },
    [banPlayerCall, refresh]
  );

  if (result.isLoaded) {
    result.kickPlayer = kickPlayer;
    result.banPlayer = banPlayer;
  }

  return result;
}
