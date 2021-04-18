import { isWebapiAuthenticationInvalidatedAction } from "@/actions/webapi-authentication-invalidated";

import { createWebapiReducer } from "../utils";
import { storeAuthorization } from "../localstorage";

const invalidateAuthenticationReducer = createWebapiReducer((state, action) => {
  if (!isWebapiAuthenticationInvalidatedAction(action)) {
    return state;
  }

  storeAuthorization(null);

  return {
    ...state,
    userAuthorization: null,
  };
});
export default invalidateAuthenticationReducer;
