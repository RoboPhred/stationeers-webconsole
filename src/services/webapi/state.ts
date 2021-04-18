export interface WebAPIState {
  serverHost: string | null;
  apiErrorMessage: string | null;
  userSteamId: string | null;
  userAuthorization: string | null;
}

const _defaultWebAPIState: WebAPIState = {
  serverHost: null,
  apiErrorMessage: null,
  userSteamId: null,
  userAuthorization: null,
};

export const defaultWebAPIState = Object.freeze(_defaultWebAPIState);
