import { ItemPayload } from "../payloads";
import { getItems } from "../api";
import { useApiData, UseApiData } from "./useApiData";

export type UseItems = UseApiData<{ items: ItemPayload[] }>;
export function useItems(): UseItems {
  return useApiData(getItems, items => ({ items }));
}
