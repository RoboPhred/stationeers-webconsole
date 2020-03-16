import * as React from "react";

import { useTranslation } from "react-i18next";

import Typography from "@material-ui/core/Typography";

import PageContainer from "@/components/PageContainer";
import RedirectIfLoggedIn from "@/components/RedirectIfLoggedIn";

const ConnectionErrorPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <PageContainer title={t("pages.connection-error.title")}>
      <RedirectIfLoggedIn to="/server" />
      <Typography>{t("pages.connection-error.description")}</Typography>
    </PageContainer>
  );
};

export default ConnectionErrorPage;
