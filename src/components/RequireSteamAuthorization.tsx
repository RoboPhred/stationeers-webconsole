import * as React from "react";
import { useSelector } from "react-redux";

import { Redirect } from "react-router-dom";

import { hasAuthQuerySelector } from "@/services/webapi/selectors/authquery";

const RequireSteamAuthorization: React.FC = () => {
  const hasAuth = useSelector(hasAuthQuerySelector);
  if (!hasAuth) {
    return <Redirect to="/authenticate" />;
  }
  return null;
};

export default RequireSteamAuthorization;
