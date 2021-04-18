import * as React from "react";

import { useTranslation } from "react-i18next";

import Typography from "@material-ui/core/Typography";

import ButtonLink from "@/components/ButtonLink";

import PageContainer from "@/components/PageContainer";
import RedirectIfLoggedIn from "@/components/RedirectIfLoggedIn";

const NotAuthorizedPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <PageContainer title={t("pages.not-authorized.title")}>
      <RedirectIfLoggedIn to="/server" />
      <Typography>{t("pages.not-authorized.description")}</Typography>
      <ButtonLink to="/connect">
        {t("pages.not-authorized.verbs.return_to_login")}
      </ButtonLink>
    </PageContainer>
  );
};

export default NotAuthorizedPage;
