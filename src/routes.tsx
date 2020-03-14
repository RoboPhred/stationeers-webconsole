import * as React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import LoginPage from "@/pages/LoginPage";

const Routes: React.FC = () => (
  <Switch>
    <Route path="/login" exact component={LoginPage} />
    <Redirect to="/login" />
  </Switch>
);

export default Routes;
