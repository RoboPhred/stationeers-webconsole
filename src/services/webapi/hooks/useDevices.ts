import * as React from "react";
import { useSelector } from "react-redux";

import { DevicePayload } from "../payloads";
import { serverAddressSelector } from "../selectors/server";
import { authorizationSelector } from "../selectors/authorization";
import { getDevices } from "../api";

export function useDevices(): DevicePayload[] {
  const serverAddress = useSelector(serverAddressSelector);
  const authorization = useSelector(authorizationSelector);

  const [devices, setDevices] = React.useState<DevicePayload[]>([]);

  React.useEffect(() => {
    async function fetchDevices() {
      if (!serverAddress || !authorization) {
        return;
      }

      try {
        const devices = await getDevices(serverAddress, authorization);
        setDevices(devices);
      } catch (e) {
        // TODO: Show error to user
        console.error(e);
      }
    }

    fetchDevices();
  }, []);

  return devices;
}
