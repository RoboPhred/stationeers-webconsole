import { AnyAction } from "redux";

export const WEBAPI_AUTHENTICATION_INVALIDATED_ACTION = "@webapi/authentication-invalidated" as const;
export const webapiAuthenticationInvalidated = () => ({
  type: WEBAPI_AUTHENTICATION_INVALIDATED_ACTION,
});
export type WebapiAuthenticationInvalidatedAction = ReturnType<
  typeof webapiAuthenticationInvalidated
>;
export function isWebapiAuthenticationInvalidatedAction(
  action: AnyAction
): action is WebapiAuthenticationInvalidatedAction {
  return action.type === WEBAPI_AUTHENTICATION_INVALIDATED_ACTION;
}
