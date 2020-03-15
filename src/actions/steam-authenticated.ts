import { AnyAction } from "redux";

export const STEAM_AUTHENTICATED_ACTION = "steam-authenticated" as const;
export const steamAuthenticated = (queryString: string) => ({
  type: STEAM_AUTHENTICATED_ACTION,
  payload: { queryString }
});
export type SteamAuthenticatedAction = ReturnType<typeof steamAuthenticated>;
export function isSteamAuthenticatedAction(
  action: AnyAction
): action is SteamAuthenticatedAction {
  return action.type === STEAM_AUTHENTICATED_ACTION;
}
