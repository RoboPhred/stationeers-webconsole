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
  const kickPlayer = useApiCall(apiKickPlayer);
  const banPlayer = useApiCall(apiBanPlayer);

  const result = useApiData(getPlayers, players => ({ players })) as UsePlayers;

  if (result.isLoaded) {
    result.kickPlayer = kickPlayer;
    result.banPlayer = banPlayer;
  }

  return result;
}
