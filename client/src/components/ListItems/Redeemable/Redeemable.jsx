import React, { useState } from 'react';
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import RedeemModal from "../RedeemModal/RedeemModal";
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import "./Redeemable.css"

import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';

import EventSeatIcon from "@material-ui/icons/EventSeat";
import LoyaltyIcon from "@material-ui/icons/Loyalty";
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard";

import { ParseData, ParseUserData } from "./RedeemableUtil";

export default function Redeemable(props) {
  const mytheme = useTheme();
  let parsedData = props.user.businessName
    ? ParseData(props.data, mytheme)
    : ParseUserData(props.data, mytheme);
  const useStyles = makeStyles((theme) => ({
    inline: {
      display: "inline",
    },
    listItem: {
      backgroundColor: parsedData.background[mytheme.palette.type],
      minWidth: "344px",
      minHeight: "196.57px",
      position: "relative"
    },
    accordianDetails: {
      "&:hover": {
        cursor: "pointer",
      }
    }
  }));
  const classes = useStyles();

  const campaignIcon = (type) => {
    if (type === "gift card") {
      return <CardGiftcardIcon/>
    } else if (type === "coupon") {
      return <LoyaltyIcon/>
    } else if (type === "ticket") {
      return <EventSeatIcon/>
    }
  }

  return (
    <>
    <Accordion
      expanded={props.expanded === props.idx} 
      onChange={props.handleAccordian(props.idx)}>
      <AccordionSummary
        id={props.idx}
        expandIcon={campaignIcon(props.data.contract.type)}>
        <Typography className={classes.heading}>General settings</Typography>
        <Typography className={classes.secondaryHeading}>I am an accordion</Typography>
      </AccordionSummary>
      <AccordionDetails
        className={classes.accordianDetails}
        onClick={props.handleAccordian(props.idx)}
        >
        <Avatar alt={parsedData.businessName} src={parsedData.avatar} /> 
        
        <Typography>
          Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget
          maximus est, id dignissim quam.
        </Typography>
      </AccordionDetails>
    </Accordion>
    {/* <Card
      className="card"
      >
      <RedeemModal
        data={parsedData}
        user={props.user}
        setDataSet={props.setDataSet}
        setSnack={props.setSnack}>
        <ListItem className={classes.listItem} alignItems='flex-start'>
          <ListItemAvatar>
            <Avatar alt={parsedData.businessName} src={parsedData.avatar} /> 
          </ListItemAvatar>
          <ListItemText
            primary={
              <React.Fragment>
                <Box display="flex">
                  <Box flexGrow={1}>
                    <Typography
                      component="span"
                      variant="h6"
                      color="textPrimary"
                    >
                    {parsedData.primary}
                  </Typography>
                  </Box>
                  <Box display="flex" alignSelf="center" justifyContent="flex-end">
                  </Box>
                </Box>
              </React.Fragment>
            }
            secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                color="textPrimary">
              {parsedData.secondary}
              </Typography>
            </React.Fragment>
            }
          />
        </ListItem>
      </RedeemModal>
    </Card> */}
    </>
  );
}
