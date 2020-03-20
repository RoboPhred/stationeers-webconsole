import * as React from "react";
import { useTranslation } from "react-i18next";

import Typography from "@material-ui/core/Typography";

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
    </PageContainer>
  );
};
export default DevicePageContent;
