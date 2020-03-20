import * as React from "react";
import { useTranslation } from "react-i18next";

import Typography from "@material-ui/core/Typography";

import { UseDevice } from "@/services/webapi/hooks/useDevice";
import { PopulatedApiData } from "@/services/webapi/hooks/useApiData";

import PageContainer from "@/components/PageContainer";

export type DevicePageContentProps = PopulatedApiData<UseDevice>;

const DevicePageContent: React.FC<DevicePageContentProps> = ({
  displayName,
  prefabName,
  referenceId
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
    </PageContainer>
  );
};
export default DevicePageContent;
