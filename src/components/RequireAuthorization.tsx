import * as React from "react";
import { useSelector } from "react-redux";

import { Redirect } from "react-router-dom";

import { isLoggedInSelector } from "@/services/webapi/selectors/authorization";
import { hasServerSelector } from "@/services/webapi/selectors/server";

const RequireAuthorization: React.FC = () => {
  const hasServer = useSelector(hasServerSelector);
  const hasAuthorization = useSelector(isLoggedInSelector);

  if (!hasServer) {
    return <Redirect to="/connect" />;
  }

  if (!hasAuthorization) {
    return <Redirect to="/login" />;
  }

  return null;
};

export default RequireAuthorization;
