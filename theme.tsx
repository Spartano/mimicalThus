import { createMuiTheme } from "@material-ui/core/styles";
import red from "@material-ui/core/colors/red";

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#9c27b0",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#eee",
    },
  },
});

export default theme;
