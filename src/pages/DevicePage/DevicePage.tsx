import * as React from "react";
import { RouteComponentProps } from "react-router-dom";

import { useDevice } from "@/services/webapi/hooks/useDevice";

import RequireLogin from "@/components/RequireWebapiAuthorization";

import DeviceLoadingContent from "./components/DeviceLoadingContent";
import DeviceErrorContent from "./components/DeviceErrorContent";
import DeviceDataContent from "./components/DeviceDataContent";

export interface DevicePageParams {
  referenceId: string;
}

export type DevicePageProps = RouteComponentProps<DevicePageParams>;

const DevicePage: React.FC<DevicePageProps> = ({
  match: {
    params: { referenceId }
  }
}) => {
  const deviceData = useDevice(referenceId);

  let content: React.ReactChild;
  if (deviceData.isLoaded) {
    content = <DeviceDataContent {...deviceData} />;
  } else if (deviceData.errorMessage) {
    content = <DeviceErrorContent errorMessage={deviceData.errorMessage} />;
  } else {
    content = <DeviceLoadingContent />;
  }
  return (
    <>
      <RequireLogin />
      {content}
    </>
  );
};

export default DevicePage;
