import { useState, useRef } from "react";
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
} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";

import { Link as RouterLink } from "react-router-dom";
import HotDogIcon from "../HotDogIcon/HotDogIcon";
import AllInboxIcon from "@material-ui/icons/AllInbox";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import InvertColorsIcon from "@material-ui/icons/InvertColors";
import EventSeatIcon from "@material-ui/icons/EventSeat";
import LoyaltyIcon from "@material-ui/icons/Loyalty";
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard";
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

  return (
    <>
      <IconButton
        edge='start'
        ref={anchorRef}
        aria-controls={open ? "menu-list-grow" : undefined}
        aria-haspopup='true'
        aria-label={"login" + props.type}
        onClick={handleToggle}
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
                  <Divider />
                  <MenuItem
                    onClick={handleClose}
                    to={`/`}
                    component={RouterLink}>
                    <ListItemIcon>
                      <AllInboxIcon />
                    </ListItemIcon>
                    <ListItemText primary='Show All' />
                  </MenuItem>
                  <MenuItem
                    onClick={handleClose}
                    to={`/`}
                    component={RouterLink}>
                    <ListItemIcon>
                      <LoyaltyIcon />
                    </ListItemIcon>
                    <ListItemText primary='Coupons' />
                  </MenuItem>
                  <MenuItem
                    onClick={handleClose}
                    to={`/`}
                    component={RouterLink}>
                    <ListItemIcon>
                      <CardGiftcardIcon />
                    </ListItemIcon>
                    <ListItemText primary='Giftcards' />
                  </MenuItem>
                  <MenuItem
                    onClick={handleClose}
                    to={`/`}
                    component={RouterLink}>
                    <ListItemIcon>
                      <EventSeatIcon />
                    </ListItemIcon>
                    <ListItemText primary='Tickets' />
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
