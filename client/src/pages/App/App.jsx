import { useState } from "react";
import { Route, Switch } from "react-router";

/* Material */
import { Container, useMediaQuery } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";

/* Custom Components */
import "./App.css";
import NavBar from "../../components/NavBar/NavBar";

function App() {
  let [darkMode, setDarkMode] = useState(
    useMediaQuery("(prefers-color-scheme: dark)")
  );

  const theme = createMuiTheme({
    palette: {
      type: darkMode ? "dark" : "light",
      primary: {
        main: "#240065",
        light: "#7A33FF",
        dark: "#120033",
      },
      secondary: {
        main: "#F0A202",
        light: "#FED179",
        dark: "#775001",
      },
      error: {
        main: "#d92110",
        light: "#F5897F",
        dark: "#6D1108",
      },
      warning: {
        main: "#edafb8",
        light: "#F6D8DC",
        dark: "#A8263A",
      },
      info: {
        main: "#E7F9A9",
        light: "#F3FCD4",
        dark: "#9CC40E",
      },
      success: {
        main: "#85FFC7",
        light: "#C2FFE2",
        dark: "#00C267",
      },
    },
  });

  const toggleLightDark = () => {
    setDarkMode(darkMode ? false : true);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main className='App'>
        <NavBar toggleLightDark={toggleLightDark} />
        <Switch>
          <Route
            path='/:type/signup/'
            render={(props) => (
              <>
                <em>index react route</em>
              </>
            )}
          />
          <Route
            path='/:type/login'
            render={(props) => (
              <>
                <em>index react route</em>
              </>
            )}
          />
          <Route
            path='/'
            render={(props) => (
              <>
                <Container>
                  <Box pt={10}>
                    <strong>Home Page</strong>
                    <Grid container spacing={1}>
                      <Grid item xs={12} sm={4}>
                        <Box
                          bgcolor='primary.main'
                          color='primary.contrastText'
                          p={2}>
                          primary.main
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Box
                          bgcolor='secondary.main'
                          color='secondary.contrastText'
                          p={2}>
                          secondary.main
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Box
                          bgcolor='error.main'
                          color='error.contrastText'
                          p={2}>
                          error.main
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Box
                          bgcolor='warning.main'
                          color='warning.contrastText'
                          p={2}>
                          warning.main
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Box
                          bgcolor='info.main'
                          color='info.contrastText'
                          p={2}>
                          info.main
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Box
                          bgcolor='success.main'
                          color='success.contrastText'
                          p={2}>
                          success.main
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Box
                          bgcolor='text.primary'
                          color='background.paper'
                          p={2}>
                          text.primary
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Box
                          bgcolor='text.secondary'
                          color='background.paper'
                          p={2}>
                          text.secondary
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <Box
                          bgcolor='text.disabled'
                          color='background.paper'
                          p={2}>
                          text.disabled
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </Container>
              </>
            )}
          />
        </Switch>
      </main>
    </ThemeProvider>
  );
}

export default App;
