import { AnyAction } from "redux";
import { connectRouter } from "connected-react-router";

import history from "@/history";

import webAPIReducer from "@/services/webapi/reducer";

import { concatReducers, finalizeReducerList } from "./utils";
import { AppState, defaultAppState } from "./state";

const routerReducer = connectRouter(history);

const appReducer = finalizeReducerList(concatReducers(webAPIReducer));

export default function rootReducer(
  state: AppState = defaultAppState,
  action: AnyAction
): AppState {
  state = {
    ...state,
    router: routerReducer(state.router, action as any)
  };

  return appReducer(state, action);
}
