import { createWebAPISelector } from "../utils";

export const authorizationSelector = createWebAPISelector(
  state => state.userAuthorization
);

export const isAuthorizedSelector = createWebAPISelector(
  state => state.userAuthorization != null
);
