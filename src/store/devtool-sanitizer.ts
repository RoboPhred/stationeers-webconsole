import { AnyAction } from "redux";

import { AppState } from "@/store";

export const actionsBlacklist: string[] = [];

export function actionSanitizer(action: AnyAction): AnyAction {
  return action;
}

export function stateSanitizer(state: AppState): any {
  return state;
}
