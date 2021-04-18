import { isWebapiAuthenticatedAction } from "@/actions/webapi-authenticated";

import { createWebapiReducer } from "../utils";
import { storeAuthorization } from "../localstorage";

export default createWebapiReducer((state, action) => {
  if (!isWebapiAuthenticatedAction(action)) {
    return state;
  }

  const { serverAddress, authorization } = action.payload;

  storeAuthorization(authorization);

  return {
    ...state,
    serverAddress,
    userAuthorization: authorization,
  };
});
