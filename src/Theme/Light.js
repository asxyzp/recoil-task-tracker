// IMPORTING MODULES/PACKAGES
import { createTheme } from "@mui/material";

// LIGHT THEME
const LightTheme = createTheme({
    palette: {
        mode: 'light',
        spacing: 4,
        primary: {
            main: '#de4e4e',
        },
        secondary: {
            main: '#f76668',
        },
        error: {
            main: '#f57030',
        },
    },
    typography: {
        fontFamily: "'Work Sans', sans-serif",
        fontSize: 14,
    },
});

export default LightTheme;