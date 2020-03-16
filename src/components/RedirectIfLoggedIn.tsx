import * as React from "react";
import { useSelector } from "react-redux";

import { Redirect } from "react-router-dom";

import { isLoggedInSelector } from "@/services/webapi/selectors/authorization";

export interface RedirectIfLoggedInProps {
  to: string;
}
const RedirectIfLoggedIn: React.FC<RedirectIfLoggedInProps> = ({ to }) => {
  const hasAuthorization = useSelector(isLoggedInSelector);
  if (hasAuthorization) {
    return <Redirect to={to} />;
  }
  return null;
};

export default RedirectIfLoggedIn;
