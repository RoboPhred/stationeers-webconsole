import * as React from "react";
import { useTranslation } from "react-i18next";

import { useServer } from "@/services/webapi/hooks/useServer";

import PageContainer from "@/components/PageContainer";
import RequireLogin from "@/components/RequireWebapiAuthorization";
import ErrorPageContent from "@/components/ErrorPageContent";
import LoadingPageContent from "@/components/LoadingPageContent";

import ServerDataContent from "./components/ServerDataContent";

const ServerPage: React.FC = () => {
  const { t } = useTranslation();
  const serverData = useServer();

  let content: React.ReactChild;
  if (serverData.isLoaded) {
    content = <ServerDataContent {...serverData} />;
  } else if (serverData.errorMessage) {
    content = <ErrorPageContent errorMessage={serverData.errorMessage} />;
  } else {
    return <LoadingPageContent />;
  }

  return (
    <PageContainer title={t("pages.items.title")}>
      <RequireLogin />
      {content}
    </PageContainer>
  );
};

export default ServerPage;
