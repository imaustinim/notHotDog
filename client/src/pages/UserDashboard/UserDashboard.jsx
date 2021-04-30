import React from "react";
import clsx from "clsx";
import Container from "@material-ui/core/Container";
import List from "@material-ui/core/List";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useState, useEffect } from "react";
import { getTokenData } from "../../utils/userUtils";
import Redeemable from "../../components/ListItems/Redeemable/Redeemable";
import { socket } from "../../utils/socketio";
import LoadingPage from "../../components/LoadingPage/LoadingPage";
import { sortData } from "./UserDashboardUtil";
import { Box, MenuItem, Select } from "@material-ui/core";

import EventSeatIcon from "@material-ui/icons/EventSeat";
import LoyaltyIcon from "@material-ui/icons/Loyalty";
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard";
import SortIcon from "@material-ui/icons/Sort";
import SearchBar from "../../components/NavBar/SearchBar/SearchBar";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import NotHotDog from "../../components/nothotdog/nothotdog";
import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(10),
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  cardcontent: {
    "&:last-child": {
      paddingBottom: theme.spacing(1),
    },
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  inline: {
    display: "inline",
  },
  ascending: {
    transform: "scaleY(-1)",
  },
  sort: {
    flexGrow: 1,
    width: "144px",
    boxShadow: "1px 1px 3px lightgrey",
    borderRadius: 0,
    borderTop: "1.5px solid grey",
    // borderBottom: "1.5px solid grey",
    borderLeft: "1px solid grey",
    borderRight: "1px solid grey",
    margin: "-1.5px -1px 0 -1px",
    top: "px",
  },
  borderMid: {
    boxShadow: "1px 1px 3px lightgrey",
    borderRadius: 0,
    borderTop: "1.5px solid grey",
    borderBottom: "1.5px solid lightgrey",
    borderRight: "1.5px solid grey",
    borderLeft: "1.5px solid grey",
    bottom: "1px",
    marginBottom: "-1px",
  },
  borderLeft: {
    boxShadow: "1px 1px 3px lightgrey",
    borderRadius: 0,
    borderRadiusTopLeft: 4,
    borderBottom: "1.5px solid lightgrey",
    borderTop: "1.5px solid grey",
    borderRight: "1.5px solid grey",
    bottom: "1.5px",
    marginBottom: "-1px",
  },
  borderRight: {
    boxShadow: "1px 1px 3px lightgrey",
    borderRadius: 0,
    borderBottomRightRadius: 4,
    // borderTop: "1.5px solid grey",
    // borderBottom: "1.5px solid lightgrey",
    borderLeft: "1.5px solid grey",
    bottom: "1px",
    marginBottom: "-1px",
  },
  utilityBar: {
    border: "none",
    borderRadius: 4,
    boxShadow: "1px 1px 5px grey",
  },
  list: {
    borderRadius: 4,
    boxShadow: "1px 1px 5px lightgrey",
    border: "none",
    padding: 0,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  giftcardIcon: {
    color: theme.palette.giftcard[theme.palette.type],
  },
  couponIcon: {
    color: theme.palette.coupon[theme.palette.type],
  },
  ticketIcon: {
    color: theme.palette.ticket[theme.palette.type],
  },
  landingCard: {
    boxShadow: "1px 1px 5px lightgrey",
  },
  fontBody: {
    fontSize: "18px",
    fontWeight: 200,
  },
}));

export default function UserDashboard(props) {
  const theme = useTheme();
  const classes = useStyles();
  let [loading, setLoading] = useState(false);
  let [newUser, setNewUser] = useState(false);
  let updateDataSet = async () => {
    setLoading(true);
    await getTokenData().then(async (res) => {
      await props.setDataSet(sortData(res, props.sort));
      if (res && res.length === 0) setNewUser(true);
      else setNewUser(false);
    });
    setLoading(false);
  };

  const [toggle, setToggle] = useState("");

  const handleEmit = (emitData) => {
    updateDataSet();
    props.setSnack({
      open: true,
      message: `Successfully redeemed '${emitData.name}'`,
      severity: "success",
    });
  };
  const handleSort = async (e) => {
    setLoading(true);
    let newSort = { ...props.sort };
    newSort.sort = e.target.value;
    await props.setSort(newSort);
    await props.setDataSet(sortData(props.dataSet, newSort));

    setLoading(false);
  };

  const handleAsc = async (e) => {
    setLoading(true);
    let newSort = { ...props.sort };
    newSort.asc = !newSort.asc;
    await props.setSort(newSort);
    await props.setDataSet(sortData(props.dataSet, newSort));
    setLoading(false);
  };
  const handleJustOne = async (e, val) => {
    if (val === toggle) {
      setToggle("");
    } else {
      setToggle(val);
    }
    let newSort = { ...props.sort };
    newSort.justOne = val;
    await props.setSort(newSort);
    await getTokenData().then((res) => {
      props.setDataSet(sortData(res, newSort));
    });
  };
  useEffect(() => {
    try {
      
      updateDataSet();
      socket.on("client-redeem", (data) => {
        handleEmit(data);
      });
    } catch (err) {
      console.log(err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container maxWidth='sm' className={classes.root}>
      <Box mb={1} className={classes.utilityBar}>
        <Grid container>
          <Grid item xs={12}>
            <Box display='flex' justifyContent='center'>
              <SearchBar user={props.user} setExpanded={props.setExpanded} />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box
              display='flex'
              justifyContent='flex-end'
              align='left'
              style={{ height: "48px" }}>
              <ToggleButtonGroup
                value={props.sort.justOne}
                exclusive
                onChange={handleJustOne}>
                <ToggleButton value='coupon' className={classes.borderLeft}>
                  <LoyaltyIcon
                    className={clsx({
                      [classes.couponIcon]: toggle === "coupon",
                    })}
                  />
                </ToggleButton>
                <ToggleButton value='ticket' className={classes.borderMid}>
                  <EventSeatIcon
                    className={clsx({
                      [classes.ticketIcon]: toggle === "ticket",
                    })}
                  />
                </ToggleButton>
                <ToggleButton value='gift card' className={classes.borderMid}>
                  <CardGiftcardIcon
                    className={clsx({
                      [classes.giftcardIcon]: toggle === "gift card",
                    })}
                  />
                </ToggleButton>
              </ToggleButtonGroup>
              <Select
                style={{ color: theme.palette.text[theme.palette.type] }}
                id='select-sort'
                value={props.sort.sort}
                variant='outlined'
                className={classes.sort}
                onChange={handleSort}>
                <MenuItem value={"expire"}>Expiry</MenuItem>
                <MenuItem value={"create"}>Activation</MenuItem>
                <MenuItem value={"businessName"}>Name</MenuItem>
              </Select>
              <ToggleButton
                selected={props.sort.asc}
                value={props.sort.asc}
                onChange={handleAsc}
                className={clsx(classes.borderRight, {
                  [classes.ascending]: !props.sort.asc,
                })}>
                <SortIcon />
              </ToggleButton>
            </Box>
          </Grid>
        </Grid>
      </Box>
      {newUser ? (
        <>
          <Box mt={2} className={classes.landingCard}>
            <Card>
              <CardContent>
                <Box my={2}>
                  <Typography
                    variant='h5'
                    align='center'
                    style={{ fontWeight: "600" }}>
                    Welcome
                  </Typography>
                </Box>
                <Box className={classes.featureBody} align='center'>
                  <Box className={classes.featureBody} align='center'>
                    <NotHotDog />
                    &nbsp;
                    <Typography display='inline' className={classes.fontBody}>
                      allows you to store all your coupons, gift cards, and
                      tokens without ever misplacing them! Designed to save,
                      this app takes care of the tedious and time consuming work
                      of organizing your loyalty rewards. Simply scan to add and
                      display the QR Code when it's time to save.
                    </Typography>
                    <Box mb={1} mt={3}>
                      <Typography display='inline' className={classes.fontBody}>
                        Go paperless with <NotHotDog />
                      </Typography>
                    </Box>
                    <Box mt={1} mb={3}>
                      <Typography display='inline' className={classes.fontBody}>
                        Go <NotHotDog />
                      </Typography>
                    </Box>
                    <Typography display='inline' className={classes.fontBody}>
                      Click on the button below to scan your first item.
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Box>
          <Box mt={2}>
            <Button 
              type='button'
              fullWidth
              variant='contained'
              color='primary'
              component={RouterLink}
              to={"/user/scan"}
            >
              Scan Item
            </Button>
          </Box>
        </>
      ) : (
        <></>
      )}
      <LoadingPage show={loading} message={loading}>
        <List className={classes.list}>
          {props.dataSet ? (
            props.dataSet.map((item, idx) => (
              <Redeemable
                darkMode={props.darkMode}
                expanded={props.expanded}
                handleAccordian={props.handleAccordian}
                URL={`${props.URL}/tokens/redeem/`}
                idx={item._id}
                key={item._id}
                data={item}
                setDataSet={props.setDataSet}
                setSnack={props.setSnack}
                user={props.user}
              />
            ))
          ) : (
            <></>
          )}
        </List>
      </LoadingPage>
    </Container>
  );
}
