import { createWebAPIReducer } from "../utils";
import { isWebapiConnectAction } from "@/actions/webapi-connect";

const setServerAddressReducer = createWebAPIReducer((state, action) => {
  if (!isWebapiConnectAction(action)) {
    return state;
  }

  const { serverAddress } = action.payload;
  return {
    ...state,
    serverAddress
  };
});
export default setServerAddressReducer;
