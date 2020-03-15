import * as React from "react";
import { useTranslation } from "react-i18next";

import { useDevices } from "@/services/webapi/hooks/useDevices";

import PageContainer from "@/components/PageContainer";
import RequireWebapiAuthorization from "@/components/RequireWebapiAuthorization";

const DevicesPage: React.FC = () => {
  const { t } = useTranslation();

  const devices = useDevices();

  return (
    <PageContainer title={t("pages.devices.title")}>
      <RequireWebapiAuthorization />
      <pre>{JSON.stringify(devices, null, 2)}</pre>
    </PageContainer>
  );
};

export default DevicesPage;
