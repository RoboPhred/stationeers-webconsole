import { AppState } from "@/store";

import { configuredServerAddressSelector } from "@/services/config/selectors/server";

export const serverAddressSelector = (state: AppState) => {
  const { serverAddress } = state.services.webApi;
  if (serverAddress) {
    return serverAddress;
  }

  return configuredServerAddressSelector(state);
};
