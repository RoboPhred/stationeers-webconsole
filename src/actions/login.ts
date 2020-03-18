import { AnyAction } from "redux";

export const LOGIN_ACTION = "login" as const;
export const login = () => ({
  type: LOGIN_ACTION
});
export type LoginAction = ReturnType<typeof login>;
export function isLoginAction(action: AnyAction): action is LoginAction {
  return action.type === LOGIN_ACTION;
}
