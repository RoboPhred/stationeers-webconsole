import {
  createServiceReducerCreator,
  createServiceSelectorCreator
} from "../service-state-utils";

export const createWebAPIReducer = createServiceReducerCreator("webApi");
export const createWebAPISelector = createServiceSelectorCreator("webApi");
