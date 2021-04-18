import * as React from "react";
import { RouteComponentProps } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { useDevice } from "@/services/webapi/hooks/useDevice";

import RequireAuthorization from "@/components/RequireAuthorization";
import PageContainer from "@/components/PageContainer";
import ErrorPageContent from "@/components/ErrorPageContent";
import LoadingPageContent from "@/components/LoadingPageContent";

import DevicePageContent from "./components/DevicePageContent";

export interface DevicePageParams {
  referenceId: string;
}

export type DevicePageProps = RouteComponentProps<DevicePageParams>;

const DevicePage: React.FC<DevicePageProps> = ({
  match: {
    params: { referenceId },
  },
}) => {
  const { t } = useTranslation();
  const deviceData = useDevice(referenceId);

  const title = deviceData.isLoaded
    ? t("pages.device.title_named", {
        displayName: deviceData.displayName,
        referenceId: deviceData.referenceId,
      })
    : t("pages.device.title");

  let content: React.ReactChild;
  if (deviceData.isLoaded) {
    content = <DevicePageContent {...deviceData} />;
  } else if (deviceData.errorMessage) {
    content = <ErrorPageContent errorMessage={deviceData.errorMessage} />;
  } else {
    content = <LoadingPageContent />;
  }

  return (
    <PageContainer back title={title}>
      <RequireAuthorization />
      {content}
    </PageContainer>
  );
};

export default DevicePage;
