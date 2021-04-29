import React from "react";
import clsx from "clsx";
import Container from "@material-ui/core/Container";
import List from "@material-ui/core/List";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useState, useEffect } from "react";
import { getCampaignData } from "../../utils/businessUtils";
import CampaignForm from "./CampaignForm";
import Redeemable from "../../components/ListItems/Redeemable/Redeemable";
import LoadingPage from "../../components/LoadingPage/LoadingPage";
import { Box, MenuItem, Select } from "@material-ui/core";
import EventSeatIcon from "@material-ui/icons/EventSeat";
import LoyaltyIcon from "@material-ui/icons/Loyalty";
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard";
import SortIcon from "@material-ui/icons/Sort";
import ToggleButton from "@material-ui/lab/ToggleButton";
import { sortData } from "../UserDashboard/UserDashboardUtil";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import SearchBar from "../../components/NavBar/SearchBar/SearchBar";
import Grid from "@material-ui/core/Grid";

export default function BusinessDashboard(props) {
  const theme = useTheme();
  const useStyles = makeStyles((theme) => ({
    root: {
      marginTop: theme.spacing(10),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    expand: {
      display: "inline-block",
      verticalAlign: "middle",
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: "rotate(180deg)",
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
      borderLeft: "1px solid grey",
      borderRight: "1px solid grey",
      margin: "-1.5px -1px 0 -1px",
      top: "px",
    },
    borderMid: {
      boxShadow: "1px 1px 3px lightgrey",
      borderRadius: 0,
      borderTop: "1.5px solid grey",
      borderBottom: "1.5px solid grey",
      borderRight: "1.5px solid grey",
      borderLeft: "1.5px solid grey",
      bottom: "1px",
      marginBottom: "-1px",
    },
    borderLeft: {
      boxShadow: "1px 1px 3px lightgrey",
      borderRadius: 0,
      borderRadiusTopLeft: 4,
      borderBottom: "1.5px solid grey",
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
      borderBottom: "1.5px solid grey",
      borderLeft: "1.5px solid grey",
      bottom: "1px",
      marginBottom: "-1px",
    },
    utilityBar: {
      boxShadow: "1px 1px 5px grey",
      border: "none",
      borderRadius: 4,
    },
    list: {
      boxShadow: "1px 1px 5px grey",
      borderRadius: 4,
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
  }));

  const classes = useStyles();
  let [loading, setLoading] = useState(false);
  const [toggle, setToggle] = useState("");

  useEffect(() => {
    try {
      updateDataSet();
    } catch (err) {
      console.log(err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let updateDataSet = async () => {
    setLoading(true);
    await getCampaignData().then((res) => {
      props.setDataSet(sortData(res, props.sort));
    });
    setLoading(false);
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
    await getCampaignData().then((res) => {
      props.setDataSet(sortData(res, newSort));
    });
  };
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
      <LoadingPage show={loading}>
        <List className={classes.list}>
          {props.dataSet ? (
            props.dataSet.map((item, idx) => (
              <Redeemable
                darkMode={props.darkMode}
                expanded={props.expanded}
                handleAccordian={props.handleAccordian}
                URL={props.URL + "tokens/create/"}
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

      <CampaignForm
        darkMode={props.darkMode}
        className='campaignform'
        setDataSet={props.setDataSet}
        setSnack={props.setSnack}
        user={props.user}
        {...props}
      />
    </Container>
  );
}
