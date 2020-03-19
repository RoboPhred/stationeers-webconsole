import * as React from "react";

import { DevicePayload } from "../payloads";
import { getDevice, setDeviceLogic } from "../api";

import { useApiCall } from "./useApiCall";
import { useApiData, UseApiData } from "./useApiData";

export interface UseDevicePopulated extends DevicePayload {
  setLogic(logicType: string, value: number): void;
}
export type UseDevice = UseApiData<UseDevicePopulated>;

export function useDevice(referenceId: string): UseDevice {
  const setLogicCall = useApiCall(setDeviceLogic);
  const result = useApiData(
    getDevice,
    result => ({ ...result }),
    referenceId
  ) as UseDevice;
  const { refresh } = result;

  const setLogic = React.useCallback(
    (logicType: string, logicValue: number) => {
      setLogicCall(referenceId, logicType, logicValue).then(refresh);
    },
    [referenceId, setLogicCall, refresh]
  );

  if (result.isLoaded) {
    result.setLogic = setLogic;
  }

  return result;
}
