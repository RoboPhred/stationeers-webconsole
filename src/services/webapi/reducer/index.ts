import { concatReducers } from "@/store/utils";

import initReducer from "./init";
import webapiAuthenticatedReducer from "./webapi-authenticated";

const webAPIReducer = concatReducers(initReducer, webapiAuthenticatedReducer);

export default webAPIReducer;
