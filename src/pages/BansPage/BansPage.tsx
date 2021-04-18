import * as React from "react";
import { useTranslation } from "react-i18next";

import { useBans } from "@/services/webapi/hooks/useBans";

import PageContainer from "@/components/PageContainer";
import RequireAuthorization from "@/components/RequireAuthorization";
import ErrorPageContent from "@/components/ErrorPageContent";
import LoadingPageContent from "@/components/LoadingPageContent";
import BansPageContent from "./components/BansPageContent";

const BansPage: React.FC = () => {
  const { t } = useTranslation();
  const banData = useBans();

  let content: React.ReactChild;
  if (banData.isLoaded) {
    content = <BansPageContent {...banData} />;
  } else if (banData.errorMessage) {
    content = <ErrorPageContent errorMessage={banData.errorMessage} />;
  } else {
    content = <LoadingPageContent />;
  }

  return (
    <PageContainer title={t("pages.bans.title")}>
      <RequireAuthorization />
      {content}
    </PageContainer>
  );
};

export default BansPage;
