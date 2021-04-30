import { useState, useEffect } from "react";
import clsx from "clsx"
import { Typography, AppBar, Toolbar, Link, Box } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import BusinessIcon from "@material-ui/icons/Business";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";

import { Link as RouterLink } from "react-router-dom";
import HideOnScroll from "../HideOnScroll/HideOnScroll";
import LoginButtons from "./LoginButtons/LoginButtons";
import HotDogMenu from "../HotDogMenu/HotDogMenu";
import HotDogIcon from "../HotDogIcon/HotDogIcon";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  not: {
    fontSize: "10.3px",
    fontWeight: 600,
    position: "relative",
    bottom: "12.3px",
    marginLeft: "8px",
    transition: ".7s ease-in-out",
  },
  hotdogtext: {
    fontSize: "24px",
    fontWeight: 600,
    display: "inline-block",
    transition: ".7s ease-in-out",
  },
  hidden: {
    transition: ".7s ease-in-out",
    opacity: 0,
  },
  shift: {
    transform: "translateX(-6.5px)",
    display: "inline-block",
  },
  logo: {
    marginTop: "auto",
    marginBottom: "auto",
    marginRight: "auto",
    marginLeft: "auto",
    paddingRight: "36px",
    transition: ".7s ease-in-out",
  },
  hotdog: {
    transform: "rotate(225deg)",
    transition: ".7s ease-in-out",
  },
  icon: {
    transition: ".7s ease-in-out",
  },
}));

export default function NavBar(props) {
  const [hotdog, setHotdog] = useState(true)
  useEffect(() => {
    setTimeout(() => setHotdog(!hotdog), 300)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const classes = useStyles();
  const theme = useTheme();

  return (
    <HideOnScroll {...props}>
      <AppBar position='fixed' my="auto">
        <Toolbar >
          <Box m="auto" px={1} display="flex" flexGrow={1}>
          {props.user ? (
            <>
              <Box alignSelf="center">
                <HotDogMenu
                  setHotdog={setHotdog}
                  hotdog={hotdog}
                  toggleLightDark={props.toggleLightDark}
                  user={props.user}
                  />
              </Box>
              <Box className={classes.logo}>
                <Typography
                  variant='h5'
                  component='h1'
                  onClick={() => setHotdog(!hotdog)}
                  style={{transition: "1s ease-in-out"}}
                >
                  <Box display={{ xs: "block", sm: "block" }}
                  style={{transition: "1s ease-in-out"}}
                  >
                    <Link component={RouterLink} to='/dashboard' color='inherit'>
                      <Typography
                        display="inline"
                        className={clsx(classes.not,{
                          [classes.hidden]: hotdog
                        })}
                      >
                      not&nbsp;
                      </Typography>
                      <Typography
                        display="inline"
                        className={clsx(classes.hotdogtext,{
                          [classes.shift]: hotdog
                        })}
                      >
                      Hot Dog
                      </Typography>
                    </Link>
                  </Box>
                </Typography>
              </Box>
            </>
          ) : (
            <>
              <Box alignSelf="center">
                <HotDogIcon color={theme.palette.primary.contrastTest} />
              </Box>
              <Box className={classes.logo}>
                <Typography
                  variant='h5'
                  component='h1'
                  style={{transition: "1s ease-in-out"}}
                >
                  <Box display={{ xs: "block", sm: "block" }}
                  style={{transition: "1s ease-in-out"}}
                  >
                    <Link component={RouterLink} to='/' color='inherit'>
                      <Typography
                        display="inline"
                        className={clsx(classes.not,{
                          [classes.hidden]: hotdog
                        })}
                      >
                      not&nbsp;
                      </Typography>
                      <Typography
                        display="inline"
                        className={clsx(classes.hotdogtext,{
                          [classes.shift]: hotdog
                        })}
                      >
                      Hot Dog
                      </Typography>
                    </Link>
                  </Box>
                </Typography>
              </Box>
              <Box className={classes.grow}></Box>

              <LoginButtons icon={<PersonOutlineIcon />} type='user'/>
              <LoginButtons icon={<BusinessIcon />} type='business'/>
            </>
          )}
          </Box>
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  );
}
