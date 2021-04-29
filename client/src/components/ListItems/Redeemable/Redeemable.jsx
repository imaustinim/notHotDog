import React, { useState } from "react";
import clsx from "clsx";

import Avatar from "@material-ui/core/Avatar";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Container from "@material-ui/core/Container";

import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

import EditCampaignForm from "./EditCampaignForm";
import { deleteCampaign, getCampaignData } from "../../../utils/businessUtils";
import { deleteToken, getTokenData } from "../../../utils/userUtils";

import "./Redeemable.css";

import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";

import EventSeatIcon from "@material-ui/icons/EventSeat";
import LoyaltyIcon from "@material-ui/icons/Loyalty";
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard";

import { ParseData, ParseUserData } from "./RedeemableUtil";
import QRCode from "qrcode.react";

export default function Redeemable(props) {
  const [open, setOpen] = useState(false);
  const qrSize = 256;
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    try {
      let res;
      if (props.user.businessName) {
        res = await deleteCampaign(parsedData.id);
        getCampaignData().then((data) => props.setDataSet(data));
        props.setSnack({
          open: true,
          message: `Successfully deleted ${res.node.name}!`,
          severity: "success",
        });
      } else {
        res = await deleteToken(parsedData.id);
        getTokenData().then((data) => props.setDataSet(data));
        props.setSnack({
          open: true,
          message: `Successfully deleted ${res.token._node.name}!`,
          severity: "success",
        });
      }
      props.handleAccordian(props.idx);
    } catch (err) {
      console.log(err);
    }
  };

  const theme = useTheme();
  let parsedData = props.user.businessName
    ? ParseData(props.data, theme)
    : ParseUserData(props.data, theme);
  const useStyles = makeStyles((theme) => ({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    accordionSummary: {
      height: "5em",
    },
    accordianDetails: {
      display: "block",
      "&:hover": {
        cursor: "pointer",
        filter: "grayscale(100%)",
      },
      paddingTop: "0px",
      minHeight: "146px",
    },
    icon: {
      color: "#F8FFA8",
      filter: "brightness(100%)",
    },
    heading: {
      height: "5em",
      display: "flex",
      flexGrow: 1,
    },
    secondary: {
      textAlign: "right",
      height: "5em",
    },

    active: {
      "&:hover": {
        filter: props.darkMode ? "brightness(100%)" : "brightness(110%)",
      },
      filter: props.darkMode ? "brightness(80%)" : "",
    },
    inactive: {
      filter: props.darkMode
        ? "grayscale(100%) brightness(80%)"
        : "grayscale(100%)",
      "&:hover": {
        filter: props.darkMode ? "grayscale(80%)" : "grayscale(80%)",
      },
    },
  }));
  const classes = useStyles();

  const campaignIcon = (type) => {
    if (type === "gift card") {
      return <CardGiftcardIcon className={classes.icon} />;
    } else if (type === "coupon") {
      return <LoyaltyIcon className={classes.icon} />;
    } else if (type === "ticket") {
      return <EventSeatIcon className={classes.icon} />;
    }
  };

  return (
    <>
      <Accordion
        style={{
          background: parsedData.background,
        }}
        className={clsx({
          [classes.active]: parsedData.active,
          [classes.inactive]: !parsedData.active,
        })}
        expanded={props.expanded === props.idx}
        onChange={props.handleAccordian(props.idx)}>
        <AccordionSummary
          className={classes.accordionSummary}
          id={props.idx}
          IconButtonProps={{ edge: "end" }}
          expandIcon={campaignIcon(props.data.contract.type)}>
          <Box my='auto'>
            <Avatar alt='...' src={parsedData.avatar} />
          </Box>
          <Box my='auto' ml={2} className={classes.heading}>
            <Typography variant='h6' style={{ alignSelf: "center" }}>
              {props.user.businessName
                ? parsedData.name
                : parsedData.businessName}
            </Typography>
          </Box>
          <Box my='auto' display='flex' className={classes.secondary}>
            <Typography variant='subtitle1' style={{ alignSelf: "center" }}>
              {parsedData.secondary}
            </Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails
          className={classes.accordianDetails}
          onClick={props.handleAccordian(props.idx)}>
          <Box display='flex' flexDirection='column'>
            <Box display='flex' flexDirection='column'>
              <Box display='flex'>
                <Box alignSelf='center'>
                  <Typography variant='h6'>
                    {props.user.businessName
                      ? parsedData.businessName
                      : parsedData.name}
                  </Typography>
                </Box>
                <Box display='flex' ml='auto'>
                  {props.user.businessName ? (
                    <Box>
                      <IconButton
                        onClick={handleOpen}
                        edge='end'
                        aria-label='edit'>
                        <EditIcon />
                      </IconButton>
                    </Box>
                  ) : (
                    <></>
                  )}
                  <Box>
                    <IconButton
                      onClick={handleDelete}
                      edge='end'
                      aria-label='delete'>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
              </Box>
              <Box minHeight='50px'>
                <Typography variant='body2'>
                  {parsedData.description}
                </Typography>
              </Box>
              <Box display='flex' mt='auto' mb={0} pt={1}>
                <Box mt='auto' mr='auto' align='left'>
                  {props.user.businessName ? (
                    <>
                      <Box mt='auto' mr='auto' align='left'>
                        <Typography variant='body2'>
                          <strong>Redeemed:&nbsp;</strong>
                          {props.data.redeemedQuantity}
                        </Typography>
                      </Box>
                      <Box mt='auto' mr='auto' align='left'>
                        <Typography variant='body2'>
                          <strong>Quantity:&nbsp;</strong>
                          {props.data.remainingQuantity > -1
                            ? props.data.remainingQuantity
                            : "Unlimited"}
                        </Typography>
                      </Box>
                    </>
                  ) : (
                    <></>
                  )}
                  <Box>
                    <Typography variant='body2'>
                      <strong>Status:&nbsp;</strong>
                      {props.user.businessName
                        ? parsedData.expired
                          ? "Finished"
                          : "Active"
                        : parsedData.redeemed
                        ? "Redeemed"
                        : parsedData.expired
                        ? "Expired"
                        : "Active"}
                    </Typography>
                  </Box>
                </Box>
                <Box mt='auto' ml='auto' mr={0} align='right'>
                  <Typography variant='body2' className={classes.heading}>
                    {parsedData.date}
                  </Typography>
                </Box>
              </Box>
            </Box>
            {parsedData.active ? (
              <>
                <Box mt={2} mb={3}>
                  <hr color='white' style={{ filter: "brightness(85%)" }} />
                </Box>
                <Box
                  mx='auto'
                  display='block'
                  justifyContent='center'
                  alignItems='center'>
                  <Box>
                    <QRCode
                      value={parsedData.id}
                      size={qrSize}
                      bgColor={theme.palette.primary.main}
                      fgColor={theme.palette.secondary.main}
                    />
                  </Box>
                  <Box mt={1}>
                    <Typography variant='subtitle1' align='center'>
                      Id: {parsedData.id}
                    </Typography>
                  </Box>
                </Box>
              </>
            ) : (
              <></>
            )}
          </Box>
        </AccordionDetails>
      </Accordion>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        open={open}
        className={classes.modal}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 100 }}>
        <Fade in={open}>
          <Card>
            <Container maxWidth='sm' className={classes.paper}>
              <EditCampaignForm
                darkMode={props.darkMode}
                handleClose={handleClose}
                data={parsedData}
                setDataSet={props.setDataSet}
                setSnack={props.setSnack}
              />
            </Container>
          </Card>
        </Fade>
      </Modal>
    </>
  );
}
