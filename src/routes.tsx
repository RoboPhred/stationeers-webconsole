import * as React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import ConnectPage from "@/pages/ConnectPage";
import LoginPage from "@/pages/LoginPage";
import AuthenticationCallbackPage from "@/pages/AuthenticationCallbackPage";
import ChatPage from "@/pages/ChatPage";
import BansPage from "@/pages/BansPage";
import DevicesPage from "@/pages/DevicesPage";
import DevicePage from "@/pages/DevicePage";
import ItemsPage from "@/pages/ItemsPage";
import NotAuthorizedPage from "@/pages/NotAuthorizedPage";
import PlayersPage from "@/pages/PlayersPage";
import SettingsPage from "@/pages/SettingsPage";

export const AUTHENTICATION_CALLBACK_ROUTE = "authentication-callback";

const Routes: React.FC = () => (
  <Switch>
    <Route path="/connect" exact component={ConnectPage} />
    <Route path="/login" exact component={LoginPage} />
    <Route
      path={`/${AUTHENTICATION_CALLBACK_ROUTE}`}
      exact
      component={AuthenticationCallbackPage}
    />
    <Route path="/not-authorized" exact component={NotAuthorizedPage} />
    <Route path="/settings" exact component={SettingsPage} />
    <Route path="/chat" exact component={ChatPage} />
    <Route path="/players" exact component={PlayersPage} />
    <Route path="/bans" exact component={BansPage} />
    <Route path="/devices" exact component={DevicesPage} />
    <Route path="/devices/:referenceId" exact component={DevicePage} />
    <Route path="/items" exact component={ItemsPage} />
    <Redirect to="/settings" />
  </Switch>
);

export default Routes;
