import React, { useState, useEffect } from 'react';
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles, ThemeProvider, useTheme } from "@material-ui/core/styles";
import RedeemModal from "../RedeemModal/RedeemModal";
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Hidden from '@material-ui/core/Hidden';

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
    },
    accordian: {
      paddingBottom: theme.spacing(5),
      marginBottom: theme.spacing(5)
    },
    accordionSummary: {
      height: "64px",
      // flexDirection: "row-reverse"
    },
    accordianDetails: {
      "&:hover": {
        cursor: "pointer",
      },
      minHeight: "132px",
      // maxHeight: "252px",
    },
    icon: {
      color: parsedData.background[mytheme.palette.type]
    }
  }));
  const classes = useStyles();

  const campaignIcon = (type) => {
    if (type === "gift card") {
      return <CardGiftcardIcon className={classes.icon}/>
    } else if (type === "coupon") {
      return <LoyaltyIcon className={classes.icon}/>
    } else if (type === "ticket") {
      return <EventSeatIcon className={classes.icon}/>
    }
  }


  return (
    <>
    <Accordion
      square={false}
      className={classes.accordion}
      className="accordian"
      expanded={props.expanded === props.idx} 
      onChange={props.handleAccordian(props.idx)}
      >
      <AccordionSummary 
        className={classes.accordionSummary}
        id={props.idx}
        // IconButtonProps={{edge: 'start'}}
        expandIcon={campaignIcon(props.data.contract.type)}>
        <Box my="auto">
          <Avatar alt="..." src={parsedData.avatar} /> 
        </Box>
        <Box my="auto" ml={1}>
          <Typography className={classes.heading}>{parsedData.businessName}</Typography>
        </Box>
        <Box my="auto" ml="auto">
          <Typography className={classes.heading}>{parsedData.secondary}</Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails
        className={classes.accordianDetails}
        onClick={props.handleAccordian(props.idx)}
        >
      </AccordionDetails>
        <Box>
          
        </Box>
      <AccordionDetails
        className={classes.accordianDetails}
        onClick={props.handleAccordian(props.idx)}
        >
        <Box mr="auto" mt="auto">
          <Typography
          variant="subtitle1"
          className={classes.heading}>{parsedData.name}
          </Typography>
          <Typography
          variant="body2"
          className={classes.heading}>{parsedData.name}
          </Typography>
        </Box>
        <Box mt="auto" ml="0" align="right">
          <Typography
          variant="caption"
          className={classes.heading}>{parsedData.date}</Typography>
        </Box>
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
