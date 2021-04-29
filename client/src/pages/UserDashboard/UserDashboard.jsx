import React from "react";
import clsx from "clsx";
import Container from "@material-ui/core/Container";
import List from "@material-ui/core/List";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { makeStyles } from "@material-ui/core/styles";
import { useState, useEffect } from "react";
import { getTokenData } from "../../utils/userUtils";
import Redeemable from "../../components/ListItems/Redeemable/Redeemable";
// import { CreateCampaign } from "../../utils/userUtils";
import { socket } from "../../utils/socketio";
import LoadingPage from "../../components/LoadingPage/LoadingPage";
import { sortData } from "./UserDashboardUtil";
import { Box, FormControl, MenuItem, Select } from "@material-ui/core";

import EventSeatIcon from "@material-ui/icons/EventSeat";
import LoyaltyIcon from "@material-ui/icons/Loyalty";
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard";
import SortIcon from "@material-ui/icons/Sort";
import SearchBar from "../../components/NavBar/SearchBar/SearchBar";
import Grid from "@material-ui/core/Grid";


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
    transform: "scaleY(-1)"
  },
  sort: {
    flexGrow: 1,
    width: "144px",
    borderRadius: 0,
    borderTop: "1.5px solid grey",
    // borderBottom: "1.5px solid grey",
    borderLeft: "1px solid grey",
    borderRight: "1px solid grey",
    margin: "-1.5px -1px 0 -1px",
    top: "px"
  },
  borderMid: {
    borderRadius: 0,
    borderTop: "1.5px solid grey",
    borderBottom: "1.5px solid lightgrey",
    borderRight: "1.5px solid grey",
    borderLeft: "1.5px solid grey",
    bottom: "1px",
    marginBottom: "-1px"
  },
  borderLeft: {
    borderRadius: 0,
    borderRadiusTopLeft: 4,
    borderBottom: "1.5px solid lightgrey",
    borderTop: "1.5px solid grey",
    borderRight: "1.5px solid grey",
    bottom: "1.5px",
    marginBottom: "-1px"
  },
  borderRight: {
    borderRadius: 0,
    borderBottomRightRadius: 4,
    // borderTop: "1.5px solid grey",
    // borderBottom: "1.5px solid lightgrey",
    borderLeft: "1.5px solid grey",
    bottom: "1px",
    marginBottom: "-1px"
  },
  utilityBar: {
    border: "none",
    borderRadius: 4,
    boxShadow: "1px 1px 5px grey"
  }
}));

export default function UserDashboard(props) {
  const classes = useStyles();
  let [loading, setLoading] = useState(false);
  let updateDataSet = async () => {
    setLoading(true);
    await getTokenData().then((res) => {
      props.setDataSet(sortData(res, props.sort));
    });
    setLoading(false);
  };

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
        console.log("Client Side Redemption", data.name);
        handleEmit(data);
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <Container maxWidth='sm' className={classes.root} >
      <Box mb={1} className={classes.utilityBar}>
        <Grid container>
          <Grid item xs={12}>
            <Box display='flex' justifyContent='center'>
              <SearchBar
              user={props.user}
              setExpanded={props.setExpanded}
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box display='flex' justifyContent='flex-end' align="left" style={{height: "48px"}}>
              <ToggleButtonGroup
                value={props.sort.justOne}
                exclusive
                onChange={handleJustOne}>
                <ToggleButton value='coupon' className={classes.borderLeft}>
                  <LoyaltyIcon />
                </ToggleButton>
                <ToggleButton value='ticket' className={classes.borderMid}>
                  <EventSeatIcon/>
                </ToggleButton>
                <ToggleButton value='gift card' className={classes.borderMid}>
                  <CardGiftcardIcon/>
                </ToggleButton>
              </ToggleButtonGroup>
              <Select
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
                className={clsx(classes.borderRight,{
                  [classes.ascending]: !props.sort.asc,
                })}
              >
                <SortIcon />
              </ToggleButton>
            </Box>
          </Grid>
        </Grid>
      </Box>
        <LoadingPage show={loading} message={loading}>
          {props.dataSet ? (
            props.dataSet.map((item, idx) => (
              <Redeemable
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
        </LoadingPage>
    </Container>
  );
}
