import { AnyAction } from "redux";

export const WEBAPI_ERROR_ACTION = "@webapi/error" as const;
export const webapiError = (errorMessage: string) => ({
  type: WEBAPI_ERROR_ACTION,
  payload: { errorMessage },
});
export type WebapiErrorAction = ReturnType<typeof webapiError>;
export function isWebapiErrorAction(
  action: AnyAction
): action is WebapiErrorAction {
  return action.type === WEBAPI_ERROR_ACTION;
}
