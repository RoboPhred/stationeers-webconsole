import * as React from "react";

import { BanPayload } from "../payloads";
import { getBans, removeBan as apiRemoveBan } from "../api";

import { useApiData, UseApiData } from "./useApiData";
import { useApiCall } from "./useApiCall";

export interface UseBanPopulated {
  bans: BanPayload[];
  removeBan(steamId: string): void;
}
export type UseBans = UseApiData<UseBanPopulated>;
export function useBans(): UseBans {
  const removeBanCall = useApiCall(apiRemoveBan);

  const result = useApiData(getBans, bans => ({ bans })) as UseBans;

  const { refresh } = result;

  const removeBan = React.useCallback(
    (steamId: string) => {
      removeBanCall(steamId).then(refresh);
    },
    [removeBanCall, refresh]
  );

  if (result.isLoaded) {
    result.removeBan = removeBan;
  }

  return result;
}
