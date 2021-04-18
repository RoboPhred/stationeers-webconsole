import { AnyAction } from "redux";

export const WEBAPI_CONNECT_ACTION = "@webapi/connect" as const;
export const webapiConnect = (serverAddress?: string) => ({
  type: WEBAPI_CONNECT_ACTION,
  payload: { serverAddress },
});
export type WebapiConnectAction = ReturnType<typeof webapiConnect>;
export function isWebapiConnectAction(
  action: AnyAction
): action is WebapiConnectAction {
  return action.type === WEBAPI_CONNECT_ACTION;
}
