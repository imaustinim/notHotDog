import React from "react";
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

const useStyles = makeStyles((theme) => ({
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
  root: {
    marginTop: theme.spacing(8),
  },
  inline: {
    display: "inline",
  },
  sortForm: {
    display: "flex",
    flexDirection: "row",
  },
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
    <Container maxWidth='sm' className={classes.root}>
      <List className={classes.root}>
        <Box
          display='flex'
          className={classes.sortForm}
          justifyContent='center'>
          <ToggleButtonGroup
            value={props.sort.justOne}
            exclusive
            onChange={handleJustOne}>
            <ToggleButton value='coupon'>
              <LoyaltyIcon />
            </ToggleButton>
            <ToggleButton value='ticket'>
              <EventSeatIcon />
            </ToggleButton>
            <ToggleButton value='gift card'>
              <CardGiftcardIcon />
            </ToggleButton>
          </ToggleButtonGroup>

          <Select
            id='select-sort'
            value={props.sort.sort}
            variant='outlined'
            onChange={handleSort}>
            <MenuItem value={"expire"}>Expiry</MenuItem>
            <MenuItem value={"create"}>Activation</MenuItem>
            <MenuItem value={"businessName"}>Name</MenuItem>
          </Select>
          <ToggleButton
            selected={props.sort.asc}
            value={props.sort.asc}
            onChange={handleAsc}>
            <SortIcon />
          </ToggleButton>
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
      </List>
    </Container>
  );
}
