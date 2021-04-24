import { useEffect, useState } from "react";
import { Route, Switch } from "react-router";

/* Material */
import { Typography, useMediaQuery, Box } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
/* Custom Components */
import "./App.css";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import DemoColourGrid from "../../components/DemoColourGrid/DemoColourGrid";
import SnackbarHandler from "../../components/SnackbarHandler/SnackbarHandler";

import Login from "../Login/Login";
import Signup from "../Signup/Signup";
import BusinessDashboard from "../BusinessDashboard/BusinessDashboard"
import UserDashboard from "../UserDashboard/UserDashboard"
import LoginButtons from "../../components/NavBar/LoginButtons/LoginButtons";

import { getUser, checkExp } from "../../utils/authUtils";

function App() {
  let [darkMode, setDarkMode] = useState(
    useMediaQuery("(prefers-color-scheme: dark)")
  );

  let [user, setUser] = useState(null);

  let [snack, setSnack] = useState({
    open: false,
    message: "",
    severity: "error",
  });

  let setOpen = () => {
    let thisSnack = { ...snack };
    thisSnack.open = false;
    setSnack(thisSnack);
  };

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token && checkExp(token)) {
      setUser(getUser(token));
    }
  }, []);
  /* Custom Colour palette, this is a global theme */
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
        <NavBar toggleLightDark={toggleLightDark} user={user} />
        <Switch>
          <Route
            path='/:type/signup/'
            render={(props) => (
              <Signup setSnack={setSnack} setUser={setUser} {...props} />
            )}
          />
          <Route
            path='/:type/login'
            render={(props) => (
              <Login setSnack={setSnack} setUser={setUser} {...props} />
            )}
          />
          <Route
            path='/'
            render={(props) => {
              if (user === null) {
                return (
                  <Box pt={8}>
                    <DemoColourGrid {...props} />
<<<<<<< HEAD
                  </>
=======
                  </Box>
>>>>>>> main
                );
              } else {
                return (
                  <>
                  <BusinessDashboard/>
                  <UserDashboard/>
                  <Box pt={8}>
                    <Typography> user: {user.email}</Typography>
                  </Box>
                  </>
                );
              }
            }}
          />
        </Switch>
        <SnackbarHandler
          setOpen={setOpen}
          open={snack.open}
          message={snack.message}
          severity={snack.severity}
        />
        <Footer />
      </main>
    </ThemeProvider>
  );
}

export default App;
