import { ChatPayload } from "../payloads";
import { getChat } from "../api";
import { useApiData, UseApiData } from "./useApiData";

export type UseChat = UseApiData<{ chat: ChatPayload[] }>;

export function useChat(): UseChat {
  return useApiData(getChat, chat => ({ chat }));
}
