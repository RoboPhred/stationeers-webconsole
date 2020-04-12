import * as React from "react";

import { ThingPayload } from "../payloads";
import { getThing, setThing } from "../api";

import { useApiCall } from "./useApiCall";
import { useApiData, UseApiData } from "./useApiData";

export interface UseThingPopulated extends ThingPayload {
  setAccessState(accessState: number): void;
  setCustomName(name: string): void;
}
export type UseThing = UseApiData<UseThingPopulated>;

export function useThing(referenceId: string): UseThing {
  const setThingCall = useApiCall(setThing);
  const result = useApiData(
    getThing,
    result => ({ ...result }),
    referenceId
  ) as UseThing;
  const { refresh } = result;

  const setAccessState = React.useCallback(
    (accessState: number) => {
      setThingCall(referenceId, { accessState }).then(refresh);
    },
    [referenceId, setThingCall, refresh]
  );

  const setCustomName = React.useCallback(
    (name: string) => {
      setThingCall(referenceId, { customName: name }).then(refresh);
    },
    [referenceId, setThingCall, refresh]
  );

  if (result.isLoaded) {
    result.setAccessState = setAccessState;
    result.setCustomName = setCustomName;
  }

  return result;
}
