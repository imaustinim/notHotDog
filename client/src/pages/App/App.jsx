import { useEffect, useState } from "react";
import { Route, Switch } from "react-router";
import { useHistory } from "react-router-dom";

/* Material */
import { useMediaQuery } from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
/* Custom Components */
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import DemoColourGrid from "../../components/DemoColourGrid/DemoColourGrid";
import SplashPage from "../../components/SplashPage/SplashPage";
import SnackbarHandler from "../../components/SnackbarHandler/SnackbarHandler";

import Login from "../Login/Login";
import Signup from "../Signup/Signup";
import BusinessDashboard from "../BusinessDashboard/BusinessDashboard";
import UserDashboard from "../UserDashboard/UserDashboard";
import QrScannerPage from "../QrScannerPage/QrScannerPage";
import LoadingPage from "../../components/LoadingPage/LoadingPage";
import { getUser, checkExp } from "../../utils/authUtils";
import "./App.css";

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

  let [dataSet, setDataSet] = useState([]);
  let [sort, setSort] = useState({
    asc: false,
    sort: "expire",
    justOne: null,
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
    } else {
      history.push("/");
    }
  }, [history]);

  const [expanded, setExpanded] = useState(false);

  const handleAccordian = (panel) => (e, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const theme = createMuiTheme({
    palette: {
      giftcard: {
        dark: "#FBB1BD",
        light: "#FF7096",
      },
      ticket: {
        light: "#74C69D",
        dark: "#A8DCC2",
      },
      coupon: {
        light: "#85A9FF",
        dark: "#ADC6FF",
      },
      type: darkMode ? "dark" : "light",
      secondary: {
        main: "#3d5a80",
        light: "#354E6E",
        dark: "#5075A5",
      },
      primary: {
        main: "#FFE066",
        light: "#FFDA47",
        dark: "#FFEB99",
      },
      error: {
        main: "#F04542",
        light: "#ED201D",
        dark: "#F36A68",
      },
      warning: {
        main: "#F04542",
        light: "#ED201D",
        dark: "#F36A68",
      },
      info: {
        main: "#8D99AE",
        light: "#7C8AA2",
        dark: "#ABB4C4",
      },
      success: {
        main: "#04A777",
        light: "#048B63",
        dark: "#06DB9B",
      },
      background: {
        default: darkMode ? "#303030" : "#FFFBEB",
        paper: darkMode ? "#303030" : "#FFFBEB",
      },
      text: {
        light: "#354E6E", 
        dark: "#FFE066",
      }
    },
    typography: {
      fontFamily: "'Libre Franklin', sans-serif",
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
        <NavBar
          toggleLightDark={toggleLightDark}
          user={user}
          handleAccordian={handleAccordian}
          setExpanded={setExpanded}
          setSort={setSort}
        />
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
                      darkMode={darkMode}
                      handleAccordian={handleAccordian}
                      setExpanded={setExpanded}
                      expanded={expanded}
                      URL={URL}
                      setSnack={setSnack}
                      user={user}
                      setDataSet={setDataSet}
                      dataSet={dataSet}
                      setSort={setSort}
                      sort={sort}
                      {...props}
                    />
                  );
                } else {
                  return (
                    <UserDashboard
                      darkMode={darkMode}
                      handleAccordian={handleAccordian}
                      setExpanded={setExpanded}
                      expanded={expanded}
                      URL={URL}
                      setSnack={setSnack}
                      user={user}
                      setDataSet={setDataSet}
                      dataSet={dataSet}
                      setSort={setSort}
                      sort={sort}
                      {...props}
                    />
                  );
                }
              }
            }}
          />
          <Route
            path='/'
            render={(props) => {
              if (!user) {
                return <SplashPage {...props} />;
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
      <Footer className='footer' />
    </ThemeProvider>
  );
}

export default App;
