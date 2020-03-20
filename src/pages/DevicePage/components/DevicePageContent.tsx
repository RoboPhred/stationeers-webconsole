import * as React from "react";
import { useTranslation } from "react-i18next";

import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import { UseDevice } from "@/services/webapi/hooks/useDevice";
import { PopulatedApiData } from "@/services/webapi/hooks/useApiData";

import PageContainer from "@/components/PageContainer";
import CommitTextField from "@/components/CommitTextField";

export type DevicePageContentProps = PopulatedApiData<UseDevice>;

const DevicePageContent: React.FC<DevicePageContentProps> = ({
  referenceId,
  displayName,
  customName,
  prefabName,
  setCustomName
}) => {
  const { t } = useTranslation();
  const [tab, setTab] = React.useState(0);

  const onTabChange = React.useCallback((_: any, value: number) => {
    setTab(value);
  }, []);

  return (
    <PageContainer
      back
      title={t("pages.device.title_named", {
        displayName,
        referenceId
      })}
    >
      <Typography variant="caption">{prefabName}</Typography>
      <CommitTextField
        label={t("pages.device.labeler_name")}
        value={customName}
        onCommit={setCustomName}
      />
      <Paper square>
        <Tabs textColor="secondary" value={tab} onChange={onTabChange}>
          <Tab label={t("pages.device.logic")}>TODO logic</Tab>
          <Tab label={t("pages.device.access_control")}>
            TODO access control
          </Tab>
        </Tabs>
      </Paper>
    </PageContainer>
  );
};
export default DevicePageContent;
