import { RouterState } from "connected-react-router";

import { WebAPIState, defaultWebAPIState } from "@/services/webapi/state";

export interface AppState {
  router: RouterState;
  services: {
    webApi: WebAPIState;
  };
}

const _defaultAppState: AppState = {
  router: undefined as any,
  services: {
    webApi: defaultWebAPIState
  }
};

export const defaultAppState = Object.freeze(_defaultAppState);
