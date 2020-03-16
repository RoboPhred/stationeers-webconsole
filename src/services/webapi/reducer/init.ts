import { isInitAction } from "@/actions/init";

import { createWebapiReducer } from "../utils";
import { getStoredAuthorization } from "../localstorage";

const initReducer = createWebapiReducer((state, action) => {
  if (!isInitAction(action)) {
    return state;
  }

  const authorization = getStoredAuthorization();
  return {
    ...state,
    serverAddress: DEFAULT_WEBAPI_URL, // TODO: Load from configuration
    userAuthorization: authorization
  };
});

export default initReducer;
