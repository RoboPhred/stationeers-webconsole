import { createWebapiSelector } from "../utils";

export const authorizationSelector = createWebapiSelector(
  state => state.userAuthorization
);

export const isLoggedInSelector = createWebapiSelector(
  state => state.userAuthorization != null
);
