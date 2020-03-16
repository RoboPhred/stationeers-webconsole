import { AnyAction } from "redux";

export const INVALIDATE_AUTHENTICATION_ACTION = "invalidate-authentication" as const;
export const invalidateAuthentication = () => ({
  type: INVALIDATE_AUTHENTICATION_ACTION
});
export type InvalidateAuthenticationAction = ReturnType<
  typeof invalidateAuthentication
>;
export function isInvalidateAuthenticationAction(
  action: AnyAction
): action is InvalidateAuthenticationAction {
  return action.type === INVALIDATE_AUTHENTICATION_ACTION;
}
