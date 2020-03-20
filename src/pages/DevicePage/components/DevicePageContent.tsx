import * as React from "react";
import { useTranslation } from "react-i18next";

import { makeStyles, Theme } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import { UseDevice } from "@/services/webapi/hooks/useDevice";
import { PopulatedApiData } from "@/services/webapi/hooks/useApiData";

import CommitTextField from "@/components/CommitTextField";

export type DevicePageContentProps = PopulatedApiData<UseDevice>;

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing()
  },
  section: {
    padding: theme.spacing()
  }
}));

const DevicePageContent: React.FC<DevicePageContentProps> = ({
  customName,
  prefabName,
  setCustomName
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [tab, setTab] = React.useState(0);

  const onTabChange = React.useCallback((_: any, value: number) => {
    setTab(value);
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.section}>
        <Typography variant="caption">{t("things.prefab_type")}</Typography>
        <Typography variant="h6">{prefabName}</Typography>
      </div>
      <div className={classes.section}>
        <Typography variant="caption">
          {t("pages.device.labeler_name")}
        </Typography>
        <CommitTextField value={customName} onCommit={setCustomName} />
      </div>
      <Paper square>
        <Tabs textColor="secondary" value={tab} onChange={onTabChange}>
          <Tab label={t("pages.device.logic")}>TODO logic</Tab>
          <Tab label={t("pages.device.access_control")}>
            TODO access control
          </Tab>
        </Tabs>
      </Paper>
    </div>
  );
};
export default DevicePageContent;
