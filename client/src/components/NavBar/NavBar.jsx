import { Typography, AppBar, Toolbar, Link, Box } from "@material-ui/core";

import { makeStyles, useTheme } from "@material-ui/core/styles";

import BusinessIcon from "@material-ui/icons/Business";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";

import { Link as RouterLink } from "react-router-dom";
import HideOnScroll from "../HideOnScroll/HideOnScroll";
import LoginButtons from "./LoginButtons/LoginButtons";
import SearchBar from "./SearchBar/SearchBar";
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
    marginLeft: "8px"
  },
  hotdog: {
    fontSize: "24px",
    fontWeight: 600,
  }
}));

export default function NavBar(props) {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <HideOnScroll {...props}>
      <AppBar position='fixed'>
        <Toolbar>
          {props.user ? (
            <>
              <HotDogMenu
                toggleLightDark={props.toggleLightDark}
                user={props.user}
              />
              <Box pr={1}>
                <Typography
                  variant='h5'
                  component='h1'
                  className={classes.grow}>
                  <Box display={{ xs: "block", sm: "block" }}>
                    <Link component={RouterLink} to='/dashboard' color='inherit'>
                      <Typography display="inline" className={classes.not}>
                      not&nbsp;
                      </Typography>
                      <Typography display="inline" className={classes.hotdog}>
                      Hot Dog
                      </Typography>
                    </Link>
                  </Box>
                </Typography>
              </Box>
            </>
          ) : (
            <>
              <HotDogIcon color={theme.palette.primary.contrastTest} />

              <Box pl={1}>
                <Typography
                  variant='h5'
                  component='h1'
                  className={classes.grow}>
                  <Box display={{ xs: "block", sm: "block" }}>
                  <Link component={RouterLink} to='/' color='inherit'>
                    <Typography display="inline" className={classes.not}>
                      not&nbsp;
                      </Typography>
                      <Typography display="inline" className={classes.hotdog}>
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
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  );
}
