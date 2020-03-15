export interface WebAPIState {
  serverAddress: string | null;
  userSteamAuthenticateQuery: string | null;
  userSteamId: string | null;
  userAuthorization: string | null;
}

const _defaultWebAPIState: WebAPIState = {
  serverAddress: null,
  userSteamAuthenticateQuery: null,
  userSteamId: null,
  userAuthorization: null
};

export const defaultWebAPIState = Object.freeze(_defaultWebAPIState);
