import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

import { useTranslation } from "react-i18next";

import { Theme, makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

import { serverHostSelector } from "@/services/webapi/selectors/server";
import { useLoginMethods } from "@/services/webapi/hooks/useLoginMethods";

import { webapiLogin } from "@/actions/webapi-login";

import PageContainer from "@/components/PageContainer";
import RedirectIfLoggedIn from "@/components/RedirectIfLoggedIn";
import RequireServer from "@/components/RequireServer";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(),
  },
  section: {
    padding: theme.spacing(),
  },
}));

const LoginPage: React.FC = () => {
  const { t } = useTranslation();

  const loginMethods = useLoginMethods();

  return (
    <PageContainer title={t("pages.login.title")}>
      <RequireServer />
      <RedirectIfLoggedIn to="/settings" />
      {!loginMethods.isLoaded && <LoginPageQuerying />}
      {loginMethods.isLoaded && (
        <LoginPageContent loginMethods={loginMethods.methods} />
      )}
    </PageContainer>
  );
};

const LoginPageQuerying: React.FC = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <div className={classes.root}>
      <Typography variant="h4">{t("pages.login.querying_server")}</Typography>
    </div>
  );
};

export default LoginPage;

const LoginPageContent: React.FC<{ loginMethods: string[] }> = ({
  loginMethods,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const classes = useStyles();
  const serverHost = useSelector(serverHostSelector);

  const [password, setPassword] = React.useState<string>("");

  const onPasswordLoginClick = React.useCallback(() => {
    dispatch(webapiLogin({ method: "password", password }));
  }, [password]);

  const onPasswordChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
    },
    []
  );

  const supportsSteam = loginMethods.indexOf("steam") !== -1;
  const supportsPassword = loginMethods.indexOf("password") !== -1;

  return (
    <div className={classes.root}>
      <div className={classes.section}>
        <Typography variant="h5">
          {t("pages.login.prompt", { host: serverHost })}
        </Typography>
      </div>
      {supportsSteam && (
        <div className={classes.section}>
          <div>
            <Typography variant="h5">
              {t("pages.login.steam_supported")}
            </Typography>
          </div>
          <Button onClick={onPasswordLoginClick}>
            {t("pages.login.verbs.login_steam_titlecase")}
          </Button>
        </div>
      )}
      {supportsPassword && (
        <div className={classes.section}>
          <div>
            <Typography variant="caption">
              {t("pages.login.password")}
            </Typography>
          </div>
          <div>
            <TextField
              error={password.length === 0}
              value={password}
              onChange={onPasswordChange}
            />
          </div>
          <Button onClick={onPasswordLoginClick}>
            {t("pages.login.verbs.login_password_titlecase")}
          </Button>
        </div>
      )}
    </div>
  );
};
