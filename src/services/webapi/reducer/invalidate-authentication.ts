import { isInvalidateAuthenticationAction } from "@/actions/invalidate-authentication";

import { createWebapiReducer } from "../utils";
import { storeAuthorization } from "../localstorage";

const invalidateAuthenticationReducer = createWebapiReducer((state, action) => {
  if (!isInvalidateAuthenticationAction(action)) {
    return state;
  }

  storeAuthorization(null);

  return {
    ...state,
    userAuthorization: null
  };
});
export default invalidateAuthenticationReducer;
