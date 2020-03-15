import { createWebAPIReducer } from "../utils";
import { isWebapiAuthenticatedAction } from "@/actions/webapi-authenticated";

const setServerAddressReducer = createWebAPIReducer((state, action) => {
  if (!isWebapiAuthenticatedAction(action)) {
    return state;
  }

  const { authorization } = action.payload;
  return {
    ...state,
    userAuthorization: authorization
  };
});
export default setServerAddressReducer;
