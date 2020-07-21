import * as React from "react";

import { SettingsPayload } from "../payloads";
import { getSettings, setSettings as apiPostSettings } from "../api";

import { useApiCall } from "./useApiCall";
import { UseApiData, useApiData } from "./useApiData";

export interface UseSettingsFunctions {
  setName(name: string): void;
  setPassword(password: string): void;
}
export type UseSettings = UseApiData<SettingsPayload & UseSettingsFunctions>;

export function useSettings(): UseSettings {
  const postSettings = useApiCall(apiPostSettings);

  const result = useApiData(getSettings) as UseSettings;
  const { refresh } = result;

  const setName = React.useCallback(
    (name: string) => {
      if (!name || !name.length) {
        return;
      }
      postSettings({ name }).then(refresh);
    },
    [postSettings, refresh]
  );

  const setPassword = React.useCallback(
    (password: string) => {
      postSettings({ password }).then(refresh);
    },
    [postSettings, refresh]
  );

  if (result.isLoaded) {
    result.setName = setName;
    result.setPassword = setPassword;
  }

  return result;
}
