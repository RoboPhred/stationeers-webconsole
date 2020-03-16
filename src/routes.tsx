import * as React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import LoginPage from "@/pages/LoginPage";
import AuthenticationCallbackPage from "@/pages/AuthenticationCallbackPage";
import ConnectionErrorPage from "@/pages/ConnectionErrorPage";
import ChatPage from "@/pages/ChatPage";
import DevicesPage from "@/pages/DevicesPage";
import ItemsPage from "@/pages/ItemsPage";
import NotAuthorizedPage from "@/pages/NotAuthorizedPage";
import PlayersPage from "@/pages/PlayersPage";
import ServerPage from "@/pages/ServerPage";

export const AUTHENTICATION_CALLBACK_ROUTE = "authentication-callback";

const Routes: React.FC = () => (
  <Switch>
    <Route path="/login" exact component={LoginPage} />
    <Route
      path="/authentication-callback"
      exact
      component={AuthenticationCallbackPage}
    />
    <Route path="/not-authorized" exact component={NotAuthorizedPage} />
    <Route path="/connection-error" exact component={ConnectionErrorPage} />
    <Route path="/server" exact component={ServerPage} />
    <Route path="/chat" exact component={ChatPage} />
    <Route path="/players" exact component={PlayersPage} />
    <Route path="/devices" exact component={DevicesPage} />
    <Route path="/items" exact component={ItemsPage} />
    {/* Having this here breaks all redirects; Switch will select null for it's child */}
    {/* <RedirectIfLoggedIn to="/server" /> */}
    <Redirect to="/login" />
  </Switch>
);

export default Routes;
