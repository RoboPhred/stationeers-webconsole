import * as React from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import { RouteComponentProps } from "react-router";

import { steamAuthenticated } from "@/actions/steam-authenticated";
import PageContainer from "@/components/PageContainer";

type Props = RouteComponentProps;

const AuthenticationCallbackPage: React.FC<Props> = ({
  location: { search }
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (search.length > 0) {
      dispatch(steamAuthenticated(search));
    }
  }, [search]);

  return (
    <PageContainer title={t("pages.authentication-callback.title")}>
      {t("verbs.authenticating")}
    </PageContainer>
  );
};

export default AuthenticationCallbackPage;
