import { ItemPayload } from "../payloads";
import { getItems } from "../api";
import { useApiData, UseApiDataPopulated } from "./useApiData";

export type UseItems = UseApiDataPopulated<{ items: ItemPayload[] }>;
export function useItems(): UseItems {
  return useApiData(getItems, items => ({ items }));
}
