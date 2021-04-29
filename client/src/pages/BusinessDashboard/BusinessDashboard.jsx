import React from "react";
import Container from "@material-ui/core/Container";
import List from "@material-ui/core/List";
import { makeStyles } from "@material-ui/core/styles";
import { useState, useEffect } from "react";
import { getCampaignData } from "../../utils/businessUtils";
import CampaignForm from "./CampaignForm";
import Redeemable from "../../components/ListItems/Redeemable/Redeemable";
import DemoColourGrid from "../../components/DemoColourGrid/DemoColourGrid";
import LoadingPage from "../../components/LoadingPage/LoadingPage";
import { Box, MenuItem, Select, FormControl } from "@material-ui/core";
import EventSeatIcon from "@material-ui/icons/EventSeat";
import LoyaltyIcon from "@material-ui/icons/Loyalty";
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard";
import SortIcon from "@material-ui/icons/Sort";
import ToggleButton from "@material-ui/lab/ToggleButton";
import { sortData } from "../UserDashboard/UserDashboardUtil";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
export default function BusinessDashboard(props) {
  const useStyles = makeStyles((theme) => ({
    root: {
      marginTop: theme.spacing(12),
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
  }));

  const classes = useStyles();
  let [loading, setLoading] = useState(false);
  useEffect(() => {
    try {
      updateDataSet();
    } catch (err) {
      console.log(err);
    }
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
    let newSort = { ...props.sort };
    newSort.justOne = val;
    await props.setSort(newSort);
    await getCampaignData().then((res) => {
      props.setDataSet(sortData(res, newSort));
    });
  };
  return (
    <Container maxWidth='sm' className={classes.root}>
      <Box display='flex' className={classes.sortForm} justifyContent='center'>
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
      <LoadingPage show={loading}>
        <List className={classes.list}>
          {props.dataSet ? (
            props.dataSet.map((item, idx) => (
              <Redeemable
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
        className='campaignform'
        setDataSet={props.setDataSet}
        setSnack={props.setSnack}
        user={props.user}
        {...props}
      />
      <DemoColourGrid />
    </Container>
  );
}
