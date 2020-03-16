import { isWebapiAuthenticatedAction } from "@/actions/webapi-authenticated";

import { createWebapiReducer } from "../utils";
import { storeAuthorization } from "../localstorage";

const setServerAddressReducer = createWebapiReducer((state, action) => {
  if (!isWebapiAuthenticatedAction(action)) {
    return state;
  }

  const { authorization } = action.payload;

  storeAuthorization(authorization);

  return {
    ...state,
    userAuthorization: authorization
  };
});
export default setServerAddressReducer;
