import * as React from "react";
import { useDispatch, useSelector } from "react-redux";

import { useTranslation } from "react-i18next";

import { Theme, makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

import { login } from "@/actions/login";

import { configuredServerAddressSelector } from "@/services/config/selectors/server";

import PageContainer from "@/components/PageContainer";
import RedirectIfLoggedIn from "@/components/RedirectIfLoggedIn";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(),
  },
  section: {
    padding: theme.spacing(),
  },
}));

const LoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const classes = useStyles();

  const configuredAddress = useSelector(configuredServerAddressSelector);
  const [userAddress, setUserAddress] = React.useState<string>("");

  const onLoginClick = React.useCallback(() => {
    const address = configuredAddress ?? userAddress;
    if (address.length === 0) {
      return;
    }
    dispatch(login(address));
  }, [userAddress]);

  const onUserAddressChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setUserAddress(e.target.value);
    },
    []
  );

  return (
    <PageContainer title={t("pages.login.title")}>
      <RedirectIfLoggedIn to="/settings" />
      <div className={classes.root}>
        {!configuredAddress && (
          <div className={classes.section}>
            <div>
              <Typography variant="caption">
                {t("pages.login.server_address")}
              </Typography>
            </div>
            <div>
              <TextField
                error={userAddress.length === 0}
                value={userAddress}
                onChange={onUserAddressChange}
              />
            </div>
          </div>
        )}
        <Button onClick={onLoginClick}>{t("pages.login.login_button")}</Button>
      </div>
    </PageContainer>
  );
};

export default LoginPage;
