import { useEffect, useState } from "react";
import { Route, Switch } from "react-router";
import { useHistory } from "react-router-dom";

/* Material */
import { useMediaQuery } from "@material-ui/core";
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
import BusinessDashboard from "../BusinessDashboard/BusinessDashboard";
import UserDashboard from "../UserDashboard/UserDashboard";
import QrScannerPage from "../QrScannerPage/QrScannerPage";
import LoadingPage from "../../components/LoadingPage/LoadingPage";
import { getUser, checkExp } from "../../utils/authUtils";

function App() {
  let [user, setUser] = useState(null);
  let history = useHistory();

  let [snack, setSnack] = useState({
    open: false,
    message: "",
    severity: "error",
  });

  let [darkMode, setDarkMode] = useState(
    useMediaQuery("(prefers-color-scheme: dark)")
  );

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

  const theme = createMuiTheme({
    palette: {
      giftcard: {
        light: "#FEDD9C",
        dark: "#684601",
      },
      ticket: {
        light: "#F4D6E1",
        dark: "#7F2345",
      },
      coupon: {
        light: "#C8D0F2",
        dark: "#1C2C74",
      },
      type: darkMode ? "dark" : "light",
      secondary: {
        main: "#000080",
        light: "#2F60E5",
        dark: "#102F85",
      },
      primary: {
        main: "#F0A202",
        light: "#FDBB36",
        dark: "#B27702",
      },
      error: {
        main: "#d92110",
        light: "#F14E3F",
        dark: "#A4190C",
      },
      warning: {
        main: "#edafb8",
        light: "#F2C4CB",
        dark: "#DA5C6F",
      },
      info: {
        main: "#E7F9A9",
        light: "#EEFBBF",
        dark: "#CDF247",
      },
      success: {
        main: "#85FFC7",
        light: "#A3FFD4",
        dark: "#24FF99",
      },
    },
  });

  /* Custom Colour palette, this is a global theme */

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
            path='/:type/scan'
            render={(props) => (
              <QrScannerPage setSnack={setSnack} user={user} {...props} />
            )}
          />
          <Route
            path='/dashboard'
            render={(props) => {
              if (!user) {
                return <LoadingPage />;
              } else {
                if (user.businessName) {
                  return (
                    <BusinessDashboard
                      setSnack={setSnack}
                      user={user}
                      {...props}
                    />
                  );
                } else {
                  return (
                    <UserDashboard setSnack={setSnack} user={user} {...props} />
                  );
                }
              }
            }}
          />
          <Route
            path='/'
            render={(props) => {
              if (!user) {
                return <DemoColourGrid {...props} />;
              } else {
                history.push("/dashboard");
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
      </main>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
