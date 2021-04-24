import React from "react";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import List from "@material-ui/core/List";
import Box from "@material-ui/core/Box";

import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";

import { makeStyles } from "@material-ui/core/styles";

import { useState } from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";

import Coupon from "./Coupon";
import GiftCard from "./GiftCard";
import Ticket from "./Ticket";

// import { CreateCampaign } from "../../utils/userUtils";

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
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
}));

let data={
  avatar: "/forno.svg",
  businessName: "Forno Cultura",
  "_id":{"$oid":"608461f41322f07decec86c7"},
  "remainingQuantity":-1,
  "redeemedQuantity":0,
  "activeDate":{"$date":"2021-04-24T19:16:00.000Z"},
  "expireDate":{"$date":"2021-04-11T18:17:00.000Z"},
  "nodeItems":[],
  "_business":{"$oid":"60844eca0c92017397074cb3"},
  "name":"campaign name",
  "description":"this is a long description for a campaign, blah blah blahg, buy low sell high as hell",
  "type":"gift card",
  "address":"http:/localhost:5000/api/tokens/redeem/60844eca0c92017397074cb3",
  "contract":{
      "type":"gift card",
      "numUses":1,
      "value":"12312",
      "staticDate":false,
      "duration":null,
      "redeemed":false,
      "remainingValue":"12312"
      },
  "createdAt":{"$date":"2021-04-24T18:22:44.902Z"},
  "updatedAt":{"$date":"2021-04-24T18:22:44.902Z"},
  "__v":0}
let dataSet = [{ ...data }, { ...data }, { ...data }, { ...data }, { ...data },{ ...data }, { ...data }, { ...data }, { ...data }, { ...data }];
export default function UserDashboard(props) {
  const classes = useStyles();
  const history = useHistory();
  return (
    <Container className={classes.root}>
      <List className={classes.root}>
        {dataSet.map((item) => (
          <GiftCard data={item} />
        ))}
      </List>
    </Container>
  );
}
