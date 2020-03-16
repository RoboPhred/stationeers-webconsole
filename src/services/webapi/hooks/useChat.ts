import { ChatPayload } from "../payloads";
import { getChat } from "../api";
import { useApiData, UseApiDataPopulated } from "./useApiData";

export type UseChat = UseApiDataPopulated<{ chat: ChatPayload[] }>;

export function useChat(): UseChat {
  return useApiData(getChat, chat => ({ chat }));
}
