import * as React from "react";
import { useTranslation } from "react-i18next";

import { useChat } from "@/services/webapi/hooks/useChat";

import PageContainer from "@/components/PageContainer";
import RequireLogin from "@/components/RequireWebapiAuthorization";
import ErrorPageContent from "@/components/ErrorPageContent";
import LoadingPageContent from "@/components/LoadingPageContent";

import ChatPageContent from "./components/ChatPageContent";

const ChatPage: React.FC = () => {
  const { t } = useTranslation();
  const chatData = useChat();

  let content: React.ReactChild;
  if (chatData.isLoaded) {
    content = <ChatPageContent {...chatData} />;
  } else if (chatData.errorMessage) {
    content = <ErrorPageContent errorMessage={chatData.errorMessage} />;
  } else {
    return <LoadingPageContent />;
  }

  return (
    <PageContainer title={t("pages.chat.title")}>
      <RequireLogin />
      {content}
    </PageContainer>
  );
};

export default ChatPage;
