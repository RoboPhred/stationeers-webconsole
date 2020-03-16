import { createWebapiSelector } from "../utils";

export const serverAddressSelector = createWebapiSelector(
  state => state.serverAddress
);
