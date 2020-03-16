import {
  createServiceReducerCreator,
  createServiceSelectorCreator
} from "../service-state-utils";

export const createWebapiReducer = createServiceReducerCreator("webApi");
export const createWebapiSelector = createServiceSelectorCreator("webApi");
