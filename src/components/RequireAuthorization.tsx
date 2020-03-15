import * as React from "react";
import { useSelector } from "react-redux";

import { Redirect } from "react-router-dom";

import { isAuthorizedSelector } from "@/services/webapi/selectors/authorization";

const RequireAuthorization: React.FC = () => {
  const hasAuthorization = useSelector(isAuthorizedSelector);
  if (!hasAuthorization) {
    return <Redirect to="/authenticate" />;
  }
  return null;
};

export default RequireAuthorization;
