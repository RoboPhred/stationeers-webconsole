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
    serverHost: null,
    userAuthorization: authorization,
  };
});

export default initReducer;
