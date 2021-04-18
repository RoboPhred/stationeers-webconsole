import { AnyAction } from "redux";

export const WEBAPI_AUTHENTICATED_ACTION = "@webapi/authenticated" as const;
export const webapiAuthenticated = (
  serverAddress: string,
  authorization: string
) => ({
  type: WEBAPI_AUTHENTICATED_ACTION,
  payload: { serverAddress, authorization },
});
export type WebapiAuthenticatedAction = ReturnType<typeof webapiAuthenticated>;
export function isWebapiAuthenticatedAction(
  action: AnyAction
): action is WebapiAuthenticatedAction {
  return action.type === WEBAPI_AUTHENTICATED_ACTION;
}
