import {
  Typography,
  AppBar,
  Toolbar,
  Link,
  InputBase,
  Input,
  Box,
  Icon,
  TextField,
} from "@material-ui/core";

import SearchIcon from "@material-ui/icons/Search";
import { fade, makeStyles } from "@material-ui/core/styles";
import useAutocomplete from "@material-ui/lab/useAutocomplete";

import BusinessIcon from "@material-ui/icons/Business";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";

import { Link as RouterLink } from "react-router-dom";
import HideOnScroll from "../HideOnScroll/HideOnScroll";
import LoginButtons from "./LoginButtons/LoginButtons";
import HotDogMenu from "../HotDogMenu/HotDogMenu";
import HotDogIcon from "../HotDogIcon/HotDogIcon";
import { useState } from "react";

/* 
                
 */
const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
    textAlign: "center",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    width: "100%",
    flexGrow: 1,
    marginRight: theme.spacing(),
    marginLeft: 0,
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    top: 0,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  listbox: {
    width: "100%",
    margin: 0,
    padding: 0,
    zIndex: 1,
    position: "absolute",
    listStyle: "none",
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    overflow: "auto",
    maxHeight: 200,
    border: "1px solid rgba(0,0,0,.25)",
    "& li": { padding: "1em" },
    '& li[data-focus="true"]': {
      backgroundColor: theme.palette.secondary.light,
      color: theme.palette.text.secondary,
      cursor: "pointer",
    },
    "& li:active": {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.common.white,
    },
  },
}));
let options = [
  { title: "1000andone" },
  { title: "2orso" },
  { title: "plus3" },
  { title: "4everukno" },
  { title: "volvo" },
  { title: "BMW" },
  { title: "Hyundai" },
];
export default function NavBar(props) {
  const classes = useStyles();
  const [search, setSearch] = useState("");
  const {
    getRootProps,
    getInputLabelProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
  } = useAutocomplete({
    id: "use-autocomplete-demo",
    options: options,
    getOptionLabel: (option) => option.title,
  });
  return (
    <HideOnScroll {...props}>
      <AppBar position='fixed'>
        <Toolbar>
          {props.user ? (
            <>
              <HotDogMenu toggleLightDark={props.toggleLightDark} />
              <Box display={{ xs: "none", sm: "inline" }}>
                <Typography
                  variant='h5'
                  component='h1'
                  className={classes.grow}>
                  <Link component={RouterLink} to='/' color='inherit'>
                    !HOTDOG
                  </Link>
                </Typography>
              </Box>

              <div className={classes.search} {...getRootProps()}>
                <div className={classes.searchIcon} {...getInputLabelProps()}>
                  <SearchIcon />
                </div>

                <Input
                  placeholder='Search…'
                  fullWidth={true}
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                  value={search}
                  {...getInputProps()}
                />
                {groupedOptions.length > 0 ? (
                  <ul className={classes.listbox} {...getListboxProps()}>
                    {groupedOptions.map((option, index) => (
                      <li {...getOptionProps({ option, index })}>
                        {option.title}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </>
          ) : (
            <>
              <Icon>
                <HotDogIcon />
              </Icon>
              <Box pl={1} display={{ xs: "none", sm: "inline" }}>
                <Typography
                  variant='h5'
                  component='h1'
                  className={classes.grow}>
                  <Link component={RouterLink} to='/' color='inherit'>
                    !HOTDOG
                  </Link>
                </Typography>
              </Box>
              <Box className={classes.grow}></Box>

              <LoginButtons icon={<PersonOutlineIcon />} type='user' />
              <LoginButtons icon={<BusinessIcon />} type='business' />
            </>
          )}

          {/* <div className={classes.grow} /> */}
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  );
}
