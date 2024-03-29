import { Box, Grid } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import useAutocomplete from "@material-ui/lab/useAutocomplete";
import { fade, makeStyles, useTheme } from "@material-ui/core/styles";
import { useEffect, useState } from "react";
import * as SearchBarUtil from "./SearchBarUtil";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import InputAdornment from "@material-ui/core/InputAdornment";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  search: {
    borderRadius: 0,
    position: "relative",
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    maxWidth: "80ch",
    flexGrow: 1,
    marginLeft: 0,
    [theme.breakpoints.up("sm")]: {
      width: "auto",
    },
  },
  inputRoot: {
    color: "inherit",
    width: "100%",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em )`,
    transition: theme.transitions.create("width"),
    width: "100%",
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
  searchBar: {
    justifyContent: "center",
    display: "flex",
    width: "auto",
    boxShadow: "1px 1px 5px lightgrey",
  },
}));

export default function SearchBar(props) {
  const theme = useTheme();

  const classes = useStyles();
  let [searchList, setSearchList] = useState([]);
  const {
    getRootProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
  } = useAutocomplete({
    id: "autocomplete-searchbar",
    options: searchList,
    getOptionLabel: (option) =>
      `${option.type} - ${option.title} - ${option.value}`,
    onChange: async (evt, val) => {
      handleExpandAccordian(val.id);
    },
    getOptionSelected: (option, value) => option.id === value.id,
  });

  async function handleExpandAccordian(id) {
    await props.setExpanded(id);
    setTimeout(() => {
      window.location.href = `#${id}`;
    }, 300);
  }
  let updateSearchList = async () => {
    let options = await SearchBarUtil.handleSearchList(props.user);
    setSearchList(options);
  };
  useEffect(() => {
    updateSearchList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className={classes.search} {...getRootProps()}>
      <TextField
        InputLabelProps={{
          style: { color: theme.palette.text[theme.palette.type] },
        }}
        variant='filled'
        label='Search...'
        fullWidth={true}
        className={classes.searchBar}
        {...getInputProps()}
        InputProps={{
          endAdornment: (
            <InputAdornment position='start' style={{ marginBottom: "16px" }}>
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      {groupedOptions.length > 0 ? (
        <Card>
          <ul className={classes.listbox} {...getListboxProps()}>
            {groupedOptions.map((option, index) => (
              <li
                {...getOptionProps({
                  option,
                  index,
                })}>
                <Grid container>
                  <Grid item component={Box} pr={1}>
                    {option.value}
                  </Grid>
                  <Grid item className={classes.grow}>
                    {option.title}
                  </Grid>

                  <Grid item style={{ textAlign: "center" }}>
                    {option.icon}
                  </Grid>
                </Grid>
              </li>
            ))}
          </ul>
        </Card>
      ) : null}
    </div>
  );
}
