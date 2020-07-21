import * as React from "react";
import { useTranslation } from "react-i18next";

import { Theme, makeStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";

import { UseSettings } from "@/services/webapi/hooks/useSettings";
import { PopulatedApiData } from "@/services/webapi/hooks/useApiData";

import CommitTextField from "@/components/CommitTextField";

export type SettingsContentProps = PopulatedApiData<UseSettings>;

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(),
  },
  section: {
    padding: theme.spacing(),
  },
}));

const SettingsContent: React.FC<SettingsContentProps> = ({
  name,
  setName,
  mapName,
  maxPlayers,
  password,
  setPassword,
}) => {
  const { t } = useTranslation();
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.section}>
        <div>
          <Typography variant="caption">
            {t("pages.settings.server_name")}
          </Typography>
        </div>
        <div>
          <CommitTextField value={name} onCommit={setName} />
        </div>
      </div>
      <div className={classes.section}>
        <div>
          <Typography variant="caption">
            {t("pages.settings.password")}
          </Typography>
        </div>
        <div>
          <CommitTextField value={password} onCommit={setPassword} />
        </div>
      </div>
      <div className={classes.section}>
        <Typography variant="caption">
          {t("pages.settings.map_name")}
        </Typography>
        <Typography variant="h6">{mapName}</Typography>
      </div>
      <div className={classes.section}>
        <Typography variant="caption">
          {t("pages.settings.max_players")}
        </Typography>
        <Typography variant="h6">{maxPlayers}</Typography>
      </div>
    </div>
  );
};

export default SettingsContent;
