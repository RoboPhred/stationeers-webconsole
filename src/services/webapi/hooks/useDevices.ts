import { DevicePayload } from "../payloads";
import { getDevices } from "../api";
import { useApiData, UseApiDataPopulated } from "./useApiData";

export type UseDevices = UseApiDataPopulated<{ devices: DevicePayload[] }>;
export function useDevices(): UseDevices {
  return useApiData(getDevices, devices => ({ devices }));
}
