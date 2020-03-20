import * as React from "react";
import { useTranslation } from "react-i18next";

import { usePlayers } from "@/services/webapi/hooks/usePlayers";

import PageContainer from "@/components/PageContainer";
import RequireLogin from "@/components/RequireWebapiAuthorization";
import ErrorPageContent from "@/components/ErrorPageContent";
import LoadingPageContent from "@/components/LoadingPageContent";

import PlayersPageContent from "./components/PlayersPageContent";

const PlayersPage: React.FC = () => {
  const { t } = useTranslation();
  const playersData = usePlayers();

  let content: React.ReactChild;
  if (playersData.isLoaded) {
    content = <PlayersPageContent {...playersData} />;
  } else if (playersData.errorMessage) {
    content = <ErrorPageContent errorMessage={playersData.errorMessage} />;
  } else {
    content = <LoadingPageContent />;
  }

  return (
    <PageContainer title={t("pages.items.title")}>
      <RequireLogin />
      {content}
    </PageContainer>
  );
};

export default PlayersPage;
