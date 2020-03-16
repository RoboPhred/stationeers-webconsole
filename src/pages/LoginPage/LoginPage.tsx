import * as React from "react";

import { useTranslation } from "react-i18next";

import Button from "@material-ui/core/Button";

import PageContainer from "@/components/PageContainer";
import RedirectIfLoggedIn from "@/components/RedirectIfLoggedIn";

import { createSteamLoginOpenIdUrl } from "@/services/webapi/api";

const LoginPage: React.FC = () => {
  const { t } = useTranslation();

  const onLoginClick = React.useCallback(() => {
    window.location.href = createSteamLoginOpenIdUrl();
  }, []);

  return (
    <PageContainer title={t("pages.login.title")}>
      <RedirectIfLoggedIn to="/server" />
      <Button onClick={onLoginClick}>{t("pages.login.login_button")}</Button>
    </PageContainer>
  );
};

export default LoginPage;
