import { AnyAction } from "redux";

export interface WebapiLoginSteam {
  method: "steam";
}

export interface WebapiLoginPassword {
  method: "password";
  password: string;
}

export const WEBAPI_LOGIN_ACTION = "@webapi/login" as const;
export const webapiLogin = (login: WebapiLoginSteam | WebapiLoginPassword) => ({
  type: WEBAPI_LOGIN_ACTION,
  payload: login,
});
export type WebapiLoginAction = ReturnType<typeof webapiLogin>;
export function isWebapiLoginAction(
  action: AnyAction
): action is WebapiLoginAction {
  return action.type === WEBAPI_LOGIN_ACTION;
}
