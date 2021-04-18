import { concatReducers } from "@/store/utils";

import initReducer from "./init";
import invalidateAuthenticationReducer from "./invalidate-authentication";
import loginReducer from "./webapi-connect";
import webapiAuthenticatedReducer from "./webapi-authenticated";

const webAPIReducer = concatReducers(
  initReducer,
  invalidateAuthenticationReducer,
  loginReducer,
  webapiAuthenticatedReducer
);

export default webAPIReducer;
