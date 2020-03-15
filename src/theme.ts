import { createMuiTheme } from "@material-ui/core/styles";
import { orange, deepOrange } from "@material-ui/core/colors";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: orange,
    secondary: deepOrange
  }
});

export default theme;
