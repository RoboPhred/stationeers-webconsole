import * as React from "react";
import { useDispatch } from "react-redux";

import { useTranslation } from "react-i18next";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import { webapiConnect } from "@/actions/webapi-connect";
import PageContainer from "@/components/PageContainer";
import RequireSteamAuthorization from "@/components/RequireSteamAuthorization";

const ConnectPage: React.FC = () => {
  const [address, setAddress] = React.useState("");
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const onAddressChanged = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setAddress(e.target.value);
    },
    []
  );

  const onConnectClick = React.useCallback(() => {
    dispatch(webapiConnect(address));
  }, [address]);

  return (
    <PageContainer title={t("pages.connect.title")}>
      <RequireSteamAuthorization />
      <div>
        <TextField
          label={t("pages.connect.server_address")}
          value={address}
          onChange={onAddressChanged}
        />
      </div>
      <div>
        <Button onClick={onConnectClick}>Connect to Server</Button>
      </div>
    </PageContainer>
  );
};

export default ConnectPage;
