import * as React from "react";
import { useTranslation } from "react-i18next";

import { UseDevice } from "@/services/webapi/hooks/useDevice";
import { PopulatedApiData } from "@/services/webapi/hooks/useApiData";

import PageContainer from "@/components/PageContainer";

export type DeviceDataContentProps = PopulatedApiData<UseDevice>;

const DeviceDataContent: React.FC<DeviceDataContentProps> = ({
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
        prefabName,
        referenceId
      })}
    ></PageContainer>
  );
};
export default DeviceDataContent;
