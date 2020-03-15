import { createWebAPISelector } from "../utils";

export const authQuerySelector = createWebAPISelector(
  state => state.userSteamAuthenticateQuery
);

export const hasAuthQuerySelector = createWebAPISelector(
  state => state.userSteamAuthenticateQuery != null
);
