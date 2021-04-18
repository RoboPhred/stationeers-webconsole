import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";

import { useTranslation } from "react-i18next";

import { Theme, makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

import { webapiConnect } from "@/actions/webapi-connect";

import { configuredServerHostSelector } from "@/services/config/selectors/server";

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

const ConnectPage: React.FC = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const classes = useStyles();

  const configuredAddress = useSelector(configuredServerHostSelector);
  const [userAddress, setUserAddress] = React.useState<string>("");

  const onConnectClick = React.useCallback(() => {
    const address = configuredAddress ?? userAddress;
    if (address.length === 0) {
      return;
    }
    dispatch(webapiConnect(address));
    dispatch(push("/login"));
  }, [userAddress]);

  const onUserAddressChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setUserAddress(e.target.value);
    },
    []
  );

  return (
    <PageContainer title={t("pages.connect.title")}>
      <RedirectIfLoggedIn to="/login" />
      <div className={classes.root}>
        {!configuredAddress && (
          <div className={classes.section}>
            <div>
              <Typography variant="caption">
                {t("pages.connect.server_address")}
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
        <Button onClick={onConnectClick}>
          {t("pages.connect.verbs.connect_titlecase")}
        </Button>
      </div>
    </PageContainer>
  );
};

export default ConnectPage;
