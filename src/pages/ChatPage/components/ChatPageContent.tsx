import * as React from "react";

import { UseChat } from "@/services/webapi/hooks/useChat";
import { PopulatedApiData } from "@/services/webapi/hooks/useApiData";

export type ChatPageContentProps = PopulatedApiData<UseChat>;

const ChatPageContent: React.FC<ChatPageContentProps> = ({ chat }) => {
  return <div>{JSON.stringify(chat, null, 2)}</div>;
};

export default ChatPageContent;
