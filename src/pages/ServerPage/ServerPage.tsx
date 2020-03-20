import * as React from "react";
import { useTranslation } from "react-i18next";

import { Theme, makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";

import { useServer } from "@/services/webapi/hooks/useServer";

import PageContainer from "@/components/PageContainer";
import RequireLogin from "@/components/RequireWebapiAuthorization";
import ErrorPageContent from "@/components/ErrorPageContent";
import CommitTextField from "@/components/CommitTextField";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing()
  },
  section: {
    padding: theme.spacing()
  }
}));

const ServerPage: React.FC = () => {
  const { t } = useTranslation();
  const classes = useStyles();

  const server = useServer();

  if (server.errorMessage) {
    <PageContainer title={t("pages.server.title")}>
      <RequireLogin />
      <ErrorPageContent errorMessage={server.errorMessage} />
    </PageContainer>;
  }
  if (!server.isLoaded) {
    return (
      <PageContainer title={t("pages.server.title")}>
        <RequireLogin />
        <CircularProgress color="inherit" />
      </PageContainer>
    );
  }

  const {
    name,
    setName,
    mapName,
    maxPlayers,
    password,
    setPassword,
    refresh
  } = server;

  return (
    <PageContainer title={t("pages.server.title")}>
      <RequireLogin />
      <div className={classes.root}>
        <Button onClick={refresh}>Refresh</Button>
        {!server && <Typography>{t("verbs.loading")}</Typography>}
        {server && (
          <>
            <div className={classes.section}>
              <div>
                <Typography variant="caption">
                  {t("pages.server.server_name")}
                </Typography>
              </div>
              <div>
                <CommitTextField value={name} onCommit={setName} />
              </div>
            </div>
            <div className={classes.section}>
              <div>
                <Typography variant="caption">
                  {t("pages.server.password")}
                </Typography>
              </div>
              <div>
                <CommitTextField value={password} onCommit={setPassword} />
              </div>
            </div>
            <div className={classes.section}>
              <Typography variant="caption">
                {t("pages.server.map_name")}
              </Typography>
              <Typography variant="h6">{mapName}</Typography>
            </div>
            <div className={classes.section}>
              <Typography variant="caption">
                {t("pages.server.max_players")}
              </Typography>
              <Typography variant="h6">{maxPlayers}</Typography>
            </div>
          </>
        )}
      </div>
    </PageContainer>
  );
};

export default ServerPage;
