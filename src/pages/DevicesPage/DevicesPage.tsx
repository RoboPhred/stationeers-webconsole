import * as React from "react";
import { useTranslation } from "react-i18next";

import { useDevices } from "@/services/webapi/hooks/useDevices";

import PageContainer from "@/components/PageContainer";
import RequireAuthorization from "@/components/RequireAuthorization";
import ErrorPageContent from "@/components/ErrorPageContent";
import LoadingPageContent from "@/components/LoadingPageContent";

import DevicesPageContent from "./components/DevicesPageContent";

const DevicesPage: React.FC = () => {
  const { t } = useTranslation();
  const devicesData = useDevices();

  let content: React.ReactChild;
  if (devicesData.isLoaded) {
    content = <DevicesPageContent {...devicesData} />;
  } else if (devicesData.errorMessage) {
    content = <ErrorPageContent errorMessage={devicesData.errorMessage} />;
  } else {
    content = <LoadingPageContent />;
  }

  return (
    <PageContainer title={t("pages.devices.title")}>
      <RequireAuthorization />
      {content}
    </PageContainer>
  );
};

export default DevicesPage;
