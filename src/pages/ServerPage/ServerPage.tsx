import * as React from "react";
import { useTranslation } from "react-i18next";

import { Theme, makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import { useServer } from "@/services/webapi/hooks/useServer";

import PageContainer from "@/components/PageContainer";
import RequireWebapiAuthorization from "@/components/RequireWebapiAuthorization";

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

  return (
    <PageContainer title={t("pages.server.title")}>
      <RequireWebapiAuthorization />
      <div className={classes.root}>
        {!server && <Typography>{t("verbs.loading")}</Typography>}
        {server && (
          <>
            <div className={classes.section}>
              <Typography variant="caption">
                {t("pages.server.server_name")}
              </Typography>
              <Typography variant="h6">{server.name}</Typography>
            </div>
            <div className={classes.section}>
              <Typography variant="caption">
                {t("pages.server.password")}
              </Typography>
              <Typography variant="h6">{server.password}</Typography>
            </div>
            <div className={classes.section}>
              <Typography variant="caption">
                {t("pages.server.map_name")}
              </Typography>
              <Typography variant="h6">{server.mapName}</Typography>
            </div>
            <div className={classes.section}>
              <Typography variant="caption">
                {t("pages.server.max_players")}
              </Typography>
              <Typography variant="h6">{server.maxPlayers}</Typography>
            </div>
          </>
        )}
      </div>
    </PageContainer>
  );
};

export default ServerPage;
