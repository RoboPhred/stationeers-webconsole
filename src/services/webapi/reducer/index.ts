import { concatReducers } from "@/store/utils";

import steamAuthenticatedReducer from "./steam-authenticated";
import webapiAuthenticatedReducer from "./webapi-authenticated";
import webapiConnectReducer from "./webapi-connect";

const webAPIReducer = concatReducers(
  steamAuthenticatedReducer,
  webapiAuthenticatedReducer,
  webapiConnectReducer
);

export default webAPIReducer;
