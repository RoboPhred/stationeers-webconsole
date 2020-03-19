import * as React from "react";
import { useTranslation } from "react-i18next";

import PageContainer from "@/components/PageContainer";
import ErrorPageContent from "@/components/ErrorPageContent";

export interface DeviceErrorContentProps {
  errorMessage: string;
}
const DeviceErrorContent: React.FC<DeviceErrorContentProps> = ({
  errorMessage
}) => {
  const { t } = useTranslation();
  return (
    <PageContainer back title={t("pages.devices.title")}>
      <ErrorPageContent errorMessage={errorMessage} />
    </PageContainer>
  );
};
export default DeviceErrorContent;
