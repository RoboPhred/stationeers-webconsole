import { AppState } from "@/store";

import { configuredServerHostSelector } from "@/services/config/selectors/server";

export const serverHostSelector = (state: AppState) => {
  const { serverHost } = state.services.webApi;
  if (serverHost) {
    return serverHost;
  }

  return configuredServerHostSelector(state);
};

export const serverAddressSelector = (state: AppState) => {
  let host = serverHostSelector(state);
  if (!host) {
    return null;
  }

  if (!host.startsWith("http://") && !host.startsWith("https://")) {
    host = "http://" + host;
  }

  return host;
};

export const hasServerSelector = (state: AppState) =>
  serverAddressSelector(state) != null;
