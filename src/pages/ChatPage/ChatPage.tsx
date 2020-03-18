import * as React from "react";
import { useTranslation } from "react-i18next";

import CircularProgress from "@material-ui/core/CircularProgress";

import { useChat } from "@/services/webapi/hooks/useChat";

import PageContainer from "@/components/PageContainer";
import RequireLogin from "@/components/RequireWebapiAuthorization";
import ErrorPageContent from "@/components/ErrorPageContent";

const ChatPage: React.FC = () => {
  const { t } = useTranslation();

  const chatData = useChat();

  let content: React.ReactChild;
  if (chatData.errorMessage) {
    content = <ErrorPageContent errorMessage={chatData.errorMessage} />;
  } else if (!chatData.isLoaded) {
    return <CircularProgress />;
  } else {
    content = <pre>{JSON.stringify(chatData.chat)}</pre>;
  }

  return (
    <PageContainer title={t("pages.chat.title")}>
      <RequireLogin />
      {content}
    </PageContainer>
  );
};

export default ChatPage;
