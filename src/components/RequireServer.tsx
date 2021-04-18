import * as React from "react";
import { useSelector } from "react-redux";

import { Redirect } from "react-router-dom";

import { hasServerSelector } from "@/services/webapi/selectors/server";

const RequireServer: React.FC = () => {
  const hasServer = useSelector(hasServerSelector);
  if (!hasServer) {
    return <Redirect to="/connect" />;
  }
  return null;
};

export default RequireServer;
