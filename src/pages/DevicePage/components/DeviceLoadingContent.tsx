import * as React from "react";
import { useTranslation } from "react-i18next";

import CircularProgress from "@material-ui/core/CircularProgress";

import PageContainer from "@/components/PageContainer";

const DeviceLoadingContent: React.FC = () => {
  const { t } = useTranslation();
  return (
    <PageContainer back title={t("pages.devices.title")}>
      <CircularProgress />
    </PageContainer>
  );
};
export default DeviceLoadingContent;
