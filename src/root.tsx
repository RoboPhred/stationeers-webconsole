import * as React from "react";

import { HashRouter } from "react-router-dom";

import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider } from "@material-ui/core/styles";

import theme from "@/theme";

import Routes from "@/routes";

const Root: React.FC = () => {
  return (
    <HashRouter>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Routes />
      </MuiThemeProvider>
    </HashRouter>
  );
};

export default Root;
