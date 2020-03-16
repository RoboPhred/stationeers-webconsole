import * as React from "react";
import { useSelector, useDispatch } from "react-redux";

import { invalidateAuthentication } from "@/actions/invalidate-authentication";

import { DevicePayload } from "../payloads";
import { serverAddressSelector } from "../selectors/server";
import { authorizationSelector } from "../selectors/authorization";
import { getDevices } from "../api";

export function useDevices(): DevicePayload[] {
  const dispatch = useDispatch();
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
        if (e.statusCode === 401) {
          dispatch(invalidateAuthentication());
          return;
        }
        // TODO: Show error to user
        console.error(e);
      }
    }

    fetchDevices();
  }, []);

  return devices;
}
