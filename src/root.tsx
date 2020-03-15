import * as React from "react";

import { ConnectedRouter } from "connected-react-router";

import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider } from "@material-ui/core/styles";

import theme from "@/theme";
import history from "@/history";

import I18NProvider from "@/services/i18n/components/I18NProvider";
import StoreProvider from "@/store/components/StoreProvider";

import Routes from "@/routes";

const Root: React.FC = () => {
  return (
    <I18NProvider>
      <StoreProvider>
        <ConnectedRouter history={history}>
          <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <Routes />
          </MuiThemeProvider>
        </ConnectedRouter>
      </StoreProvider>
    </I18NProvider>
  );
};

export default Root;
