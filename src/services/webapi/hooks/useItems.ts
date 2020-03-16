import * as React from "react";
import { useSelector, useDispatch } from "react-redux";

import { invalidateAuthentication } from "@/actions/invalidate-authentication";

import { ItemPayload } from "../payloads";
import { serverAddressSelector } from "../selectors/server";
import { authorizationSelector } from "../selectors/authorization";
import { getItems } from "../api";

export function useItems(): ItemPayload[] {
  const dispatch = useDispatch();
  const serverAddress = useSelector(serverAddressSelector);
  const authorization = useSelector(authorizationSelector);

  const [items, setItems] = React.useState<ItemPayload[]>([]);

  React.useEffect(() => {
    async function fetchItems() {
      if (!serverAddress || !authorization) {
        return;
      }

      try {
        const devices = await getItems(serverAddress, authorization);
        setItems(devices);
      } catch (e) {
        if (e.statusCode === 401) {
          dispatch(invalidateAuthentication());
          return;
        }

        // TODO: Show error to user
        console.error(e);
      }
    }

    fetchItems();
  }, []);

  return items;
}
