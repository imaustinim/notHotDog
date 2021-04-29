import { useState, useRef } from "react";
import clsx from "clsx";
import {
  Grow,
  Paper,
  Popper,
  MenuItem,
  MenuList,
  ClickAwayListener,
  IconButton,
  ListItemIcon,
  ListItemText,
  Icon,
  makeStyles,
} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";

import { Link as RouterLink } from "react-router-dom";
import HotDogIcon from "../HotDogIcon/HotDogIcon";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import InvertColorsIcon from "@material-ui/icons/InvertColors";

import { logout } from "../../utils/authUtils";
export default function HotDogMenu(props) {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const useStyles = makeStyles((theme) => ({
    hotdog: {
      transform: "rotate(180deg)",
      transition: ".7s ease-in-out",
    },
    icon: {
      transition: ".7s ease-in-out",
    },
  }));
  const classes = useStyles();

  return (
    <>
      <IconButton
        edge='start'
        ref={anchorRef}
        aria-controls={open ? "menu-list-grow" : undefined}
        aria-haspopup='true'
        aria-label={"login" + props.type}
        onClick={handleToggle}
        className={clsx(classes.icon, {
          [classes.hotdog]: open,
        })}
        color='inherit'>
        <HotDogIcon />
      </IconButton>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}>
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={open} id='menu-list-grow'>
                  {/* //dashboard */}
                  <MenuItem
                    onClick={handleClose}
                    to={`/`}
                    component={RouterLink}>
                    <ListItemIcon>
                      <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary='Dashboard' />
                  </MenuItem>
                  {/* //qr_code_scanner */}
                  <Divider />
                  <MenuItem
                    onClick={handleClose}
                    component={RouterLink}
                    to={
                      props.user.businessName ? "/business/scan" : "/user/scan"
                    }>
                    <ListItemIcon>
                      <Icon>qr_code_scanner</Icon>
                    </ListItemIcon>
                    <ListItemText primary='QR Scanner' />
                  </MenuItem>
                  <Divider />
                  {/* //toggle */}
                  <MenuItem
                    onClick={(e) => {
                      handleClose(e);
                      props.toggleLightDark();
                    }}>
                    <ListItemIcon>
                      <InvertColorsIcon />
                    </ListItemIcon>
                    <ListItemText primary='Toggle Light/Dark Mode' />
                  </MenuItem>
                  {/* //logout */}
                  <MenuItem
                    onClick={(e) => {
                      handleClose(e);
                      logout();
                    }}>
                    <ListItemIcon>
                      <ExitToAppIcon />
                    </ListItemIcon>
                    <ListItemText primary='Logout' />
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
}
