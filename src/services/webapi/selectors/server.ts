import { createWebAPISelector } from "../utils";

export const serverAddressSelector = createWebAPISelector(
  state => state.serverAddress
);
