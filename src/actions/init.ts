import { AnyAction } from "redux";

export const INIT_ACTION = "init" as const;
export const doInit = () => ({
  type: INIT_ACTION
});
export type InitAction = ReturnType<typeof doInit>;
export function isInitAction(action: AnyAction): action is InitAction {
  return action.type === INIT_ACTION;
}
