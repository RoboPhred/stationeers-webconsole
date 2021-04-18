import { isLoginAction } from "@/actions/login";

import { createWebapiReducer } from "../utils";

export default createWebapiReducer((state, action) => {
  if (!isLoginAction(action)) {
    return state;
  }

  const { serverAddress } = action.payload;

  if (!serverAddress) {
    return state;
  }

  return {
    ...state,
    serverAddress,
  };
});
