import * as React from "react";

import { useTranslation } from "react-i18next";

import PageContainer from "@/components/PageContainer";
import RedirectIfLoggedIn from "@/components/RedirectIfLoggedIn";
import ErrorPageContent from "@/components/ErrorPageContent";

const ConnectionErrorPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <PageContainer title={t("pages.connection-error.title")}>
      <RedirectIfLoggedIn to="/server" />
      <ErrorPageContent
        errorMessage={t("pages.connection-error.description")}
      />
    </PageContainer>
  );
};

export default ConnectionErrorPage;
