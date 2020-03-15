import * as React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import AuthenticatePage from "@/pages/AuthenticatePage";
import AuthenticationCallbackPage from "@/pages/AuthenticationCallbackPage";
import ConnectPage from "@/pages/ConnectPage";
import DevicesPage from "@/pages/DevicesPage";
import ItemsPage from "@/pages/ItemsPage";
import PlayersPage from "@/pages/PlayersPage";
import ServerPage from "@/pages/ServerPage";

export const AUTHENTICATION_CALLBACK_ROUTE = "authentication-callback";

const Routes: React.FC = () => (
  <Switch>
    <Route path="/authenticate" exact component={AuthenticatePage} />
    <Route
      path="/authentication-callback"
      exact
      component={AuthenticationCallbackPage}
    />
    <Route path="/connect" exact component={ConnectPage} />
    <Route path="/server" exact component={ServerPage} />
    <Route path="/players" exact component={PlayersPage} />
    <Route path="/devices" exact component={DevicesPage} />
    <Route path="/items" exact component={ItemsPage} />
    <Redirect to="/authenticate" />
  </Switch>
);

export default Routes;
