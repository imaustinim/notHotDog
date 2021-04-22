import { useState } from "react";
import { Route, Switch } from "react-router";

/* Material */
import { Container, useMediaQuery } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

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
                  <strong>Home Page</strong>
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
