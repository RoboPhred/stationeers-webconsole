import * as React from "react";
import { useSelector } from "react-redux";

import { ItemPayload } from "../payloads";
import { serverAddressSelector } from "../selectors/server";
import { authorizationSelector } from "../selectors/authorization";
import { getItems } from "../api";

export function useItems(): ItemPayload[] {
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
        // TODO: Show error to user
        console.error(e);
      }
    }

    fetchItems();
  }, []);

  return items;
}
