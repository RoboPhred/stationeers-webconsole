import * as React from "react";

import { DevicePayload } from "../payloads";
import { getDevice, setDeviceLogic, setDevice } from "../api";

import { useApiCall } from "./useApiCall";
import { useApiData, UseApiData } from "./useApiData";

export interface UseDevicePopulated extends DevicePayload {
  setLogic(logicType: string, value: number): void;
  setCustomName(name: string): void;
}
export type UseDevice = UseApiData<UseDevicePopulated>;

export function useDevice(referenceId: string): UseDevice {
  const setDeviceCall = useApiCall(setDevice);
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

  const setCustomName = React.useCallback(
    (name: string) => {
      setDeviceCall(referenceId, { customName: name }).then(refresh);
    },
    [referenceId, setDeviceCall, refresh]
  );

  if (result.isLoaded) {
    result.setLogic = setLogic;
    result.setCustomName = setCustomName;
  }

  return result;
}
