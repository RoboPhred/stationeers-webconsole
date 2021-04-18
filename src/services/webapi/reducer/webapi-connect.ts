import { isWebapiConnectAction } from "@/actions/webapi-connect";

import { createWebapiReducer } from "../utils";

export default createWebapiReducer((state, action) => {
  if (!isWebapiConnectAction(action)) {
    return state;
  }

  const { serverAddress } = action.payload;

  if (!serverAddress) {
    return state;
  }

  return {
    ...state,
    serverHost: serverAddress,
  };
});
