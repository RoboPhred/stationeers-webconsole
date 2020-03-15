import { parse } from "query-string";
import { isSteamAuthenticatedAction } from "@/actions/steam-authenticated";

import { createWebAPIReducer } from "../utils";

const setServerAddressReducer = createWebAPIReducer((state, action) => {
  if (!isSteamAuthenticatedAction(action)) {
    return state;
  }

  const { queryString } = action.payload;

  const parsedQuery = parse(queryString);

  if (parsedQuery["openid.mode"] === "error") {
    // TODO: Store error in state, show to user.
    console.error(parsedQuery["openid.error"]);
    return state;
  }

  return {
    ...state,
    userSteamAuthenticateQuery: queryString
  };
});
export default setServerAddressReducer;
