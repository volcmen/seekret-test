import { red } from "@material-ui/core/colors";
import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

// Create a theme instance.
const theme = responsiveFontSizes(
    createMuiTheme({
        palette: {
            primary: {
                main: "#556cd6",
            },
            secondary: {
                main: "#19857b",
            },
            error: {
                main: red.A400,
            },
            background: {
                default: "#fff",
            },
        },
    }),
);

export default theme;
