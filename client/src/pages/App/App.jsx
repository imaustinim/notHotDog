import { useState } from "react";
import { Route, Switch } from "react-router";
import { Link as rLink } from "react-router-dom";
import { Link } from "@material-ui/core";
import "./App.css";

import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import InvertColorsIcon from "@material-ui/icons/InvertColors";

import { IconButton, useMediaQuery } from "@material-ui/core";

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
      <div className='App'>
        <Switch>
          <Route
            path='/auth/signup/:type'
            render={(props) => (
              <>
                <em>index react route</em>
              </>
            )}
          />
          <Route
            path='/auth/login:type'
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
                <header>
                  <em>index react route</em>
                  <IconButton
                    onClick={toggleLightDark}
                    aria-label='toggle light and dark mode'
                    color='inherit'>
                    <InvertColorsIcon />
                  </IconButton>
                </header>

                <div>
                  <strong>User Login</strong>
                  <Link component={rLink} to='/auth/signup/u' color='primary'>
                    Signup
                  </Link>
                  <Link component={rLink} to='/auth/signup/u' color='primary'>
                    Login User
                  </Link>
                </div>
                <div>
                  <strong>Business Login</strong>
                  <Link component={rLink} to='/auth/signup/b' color='primary'>
                    Signup
                  </Link>
                  <Link component={rLink} to='/auth/signup/b' color='primary'>
                    Login User
                  </Link>
                </div>
              </>
            )}
          />
        </Switch>
      </div>
    </ThemeProvider>
  );
}

export default App;
