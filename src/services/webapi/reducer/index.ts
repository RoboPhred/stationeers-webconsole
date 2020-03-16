import { concatReducers } from "@/store/utils";

import initReducer from "./init";
import invalidateAuthenticationReducer from "./invalidate-authentication";
import webapiAuthenticatedReducer from "./webapi-authenticated";

const webAPIReducer = concatReducers(
  initReducer,
  invalidateAuthenticationReducer,
  webapiAuthenticatedReducer
);

export default webAPIReducer;
