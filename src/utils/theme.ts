import { createTheme, ThemeOptions } from '@mui/material';

const commonSettings: ThemeOptions = {
    palette: {
        primary: { main: '#A266B0' },
        secondary: { main: '#A266B0' },
    },
    typography: {
        fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
        body1: {
            fontFamily: "'Open Sans', sans-serif",
        },
        button: {
            textTransform: 'none',
        },
    },
};

const lightTheme = createTheme({
    ...commonSettings,
    palette: {
        mode: 'light',
        ...commonSettings.palette,
    },
    typography: {
        ...commonSettings.typography,
    },
});

const darkTheme = createTheme({
    ...commonSettings,
    palette: {
        mode: 'dark',
        ...commonSettings.palette,
    },
    typography: {
        ...commonSettings.typography,
    },
});

export { lightTheme, darkTheme };
