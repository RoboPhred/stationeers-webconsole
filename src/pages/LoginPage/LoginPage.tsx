import * as React from "react";
import { useDispatch } from "react-redux";

import { useTranslation } from "react-i18next";

import Button from "@material-ui/core/Button";

import { login } from "@/actions/login";

import PageContainer from "@/components/PageContainer";
import RedirectIfLoggedIn from "@/components/RedirectIfLoggedIn";

const LoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const onLoginClick = React.useCallback(() => {
    dispatch(login());
  }, []);

  return (
    <PageContainer title={t("pages.login.title")}>
      <RedirectIfLoggedIn to="/server" />
      <Button onClick={onLoginClick}>{t("pages.login.login_button")}</Button>
    </PageContainer>
  );
};

export default LoginPage;
