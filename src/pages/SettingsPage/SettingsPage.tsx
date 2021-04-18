import * as React from "react";
import { useTranslation } from "react-i18next";

import { useSettings } from "@/services/webapi/hooks/useSettings";

import PageContainer from "@/components/PageContainer";
import RequireAuthorization from "@/components/RequireAuthorization";
import ErrorPageContent from "@/components/ErrorPageContent";
import LoadingPageContent from "@/components/LoadingPageContent";

import SettingsContent from "./components/SettingsContent";

const SettingsPage: React.FC = () => {
  const { t } = useTranslation();
  const settings = useSettings();

  let content: React.ReactChild;
  if (settings.isLoaded) {
    content = <SettingsContent {...settings} />;
  } else if (settings.errorMessage) {
    content = <ErrorPageContent errorMessage={settings.errorMessage} />;
  } else {
    content = <LoadingPageContent />;
  }

  return (
    <PageContainer title={t("pages.settings.title")}>
      <RequireAuthorization />
      {content}
    </PageContainer>
  );
};

export default SettingsPage;
