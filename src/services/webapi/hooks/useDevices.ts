import { DevicePayload } from "../payloads";
import { getDevices } from "../api";
import { useApiData, UseApiData } from "./useApiData";

export type UseDevices = UseApiData<{ devices: DevicePayload[] }>;
export function useDevices(): UseDevices {
  return useApiData(getDevices, devices => ({ devices }));
}
