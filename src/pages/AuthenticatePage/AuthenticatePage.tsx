import * as React from "react";

import { useTranslation } from "react-i18next";

import Button from "@material-ui/core/Button";

import PageContainer from "@/components/PageContainer";
import { createSteamLoginOpenIdUrl } from "@/services/webapi/api";

const AuthenticatePage: React.FC = () => {
  const { t } = useTranslation();

  const onLoginClick = React.useCallback(() => {
    window.location.href = createSteamLoginOpenIdUrl("authentication-callback");
  }, []);

  return (
    <PageContainer title={t("pages.authenticate.title")}>
      <Button onClick={onLoginClick}>{t("pages.authenticate.login")}</Button>
    </PageContainer>
  );
};

export default AuthenticatePage;
