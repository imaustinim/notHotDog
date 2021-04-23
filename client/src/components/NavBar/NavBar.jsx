import {
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Link,
} from "@material-ui/core";

import InvertColorsIcon from "@material-ui/icons/InvertColors";
import MenuIcon from "@material-ui/icons/Menu";

import BusinessIcon from "@material-ui/icons/Business";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";

import { Link as RouterLink } from "react-router-dom";
import HideOnScroll from "../HideOnScroll/HideOnScroll";
import LoginButtons from "./LoginButtons/LoginButtons";

export default function NavBar(props) {
  return (
    <HideOnScroll {...props}>
      <AppBar position='fixed'>
        <Toolbar>
          {/*           <IconButton
            edge='start'
            aria-label='toggle light and dark mode'
            color='inherit'>
            <MenuIcon />
          </IconButton> */}
          <IconButton
            onClick={async () => {
              let jwt = localStorage.getItem("token");
              let res = await fetch("/api/test", {
                headers: { Authorization: "Bearer " + jwt },
              }).then((res) => res.json());
              console.log(res);
            }}
            aria-label='toggle light and dark mode'
            color='inherit'>
            <MenuIcon />
          </IconButton>
          <Typography
            variant='h5'
            component='h1'
            style={{ flexGrow: 1, textAlign: "center" }}>
            <Link component={RouterLink} to='/' color='inherit'>
              !HOTDOG
            </Link>
          </Typography>

          <LoginButtons icon={<BusinessIcon />} type='business' />
          <LoginButtons icon={<PersonOutlineIcon />} type='user' />
          <IconButton
            onClick={props.toggleLightDark}
            aria-label='toggle light and dark mode'
            color='inherit'>
            <InvertColorsIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  );
}
