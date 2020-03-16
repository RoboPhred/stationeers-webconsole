import * as React from "react";
import { useSelector } from "react-redux";

import { Redirect } from "react-router-dom";

import { isLoggedInSelector } from "@/services/webapi/selectors/authorization";

const RequireLogin: React.FC = () => {
  const hasAuthorization = useSelector(isLoggedInSelector);
  if (!hasAuthorization) {
    return <Redirect to="/login" />;
  }
  return null;
};

export default RequireLogin;
