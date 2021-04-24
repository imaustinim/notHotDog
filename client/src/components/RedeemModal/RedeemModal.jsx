import React, { createRef, useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { Box, Typography } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import QRCode from "qrcode.react";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles({
  grow: {
    flexGrow: 1,
  },
});

function SimpleDialog(props) {
  const theme = useTheme();
  const classes = useStyles();
  const { data, onClose, open } = props;
  const [qrSize, setQrSize] = useState(128);
  let xsMatch = useMediaQuery(theme.breakpoints.down("xs"));
  let smMatch = useMediaQuery(theme.breakpoints.up("sm"));
  let mdMatch = useMediaQuery(theme.breakpoints.up("md"));
  let lgMatch = useMediaQuery(theme.breakpoints.up("lg"));
  useEffect(() => {
    if (lgMatch) console.log("0");
    else if (mdMatch) setQrSize(512);
    else if (smMatch) setQrSize(400);
    else if (xsMatch) setQrSize(200);
  }, [lgMatch, mdMatch, smMatch, xsMatch]);

  return (
    <Dialog
      fullWidth={true}
      onClose={onClose}
      aria-labelledby='simple-dialog-title'
      open={open}>
      <DialogTitle id='simple-dialog-title'>
        <ListItem alignItems='flex-start'>
          <ListItemAvatar>
            <Avatar alt={data.businessName} src={data.avatar} />
          </ListItemAvatar>
          <ListItemText primary={`${data.name} - ${data.businessName}`} />
        </ListItem>
      </DialogTitle>
      <DialogContent>
        <Box
          display='flex'
          flexDirection='column'
          justifyContent='center'
          alignItems='center'>
          <Typography>
            {`$${parseFloat(data.contract.remainingValue).toFixed(
              2
            )} / $${parseFloat(data.contract.value).toFixed(2)} `}
          </Typography>

          <QRCode
            value={data.address}
            size={qrSize}
            bgColor={theme.palette.secondary.dark}
            fgColor={theme.palette.primary.light}
          />
        </Box>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1a-content'
            id='panel1a-header'>
            <Typography variant='body2' color='textSecondary'>
              Reveal URL/Code
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Link style={{ overflowX: "scroll" }} href={data.address}>
              <code>{data.address}</code>
            </Link>
          </AccordionDetails>
        </Accordion>
        <DialogContentText id='alert-dialog-description'>
          <>{data.description}</>
          <div>
            <strong>Activated: </strong>
            {new Date(data.activeDate.$date).toDateString()}
          </div>
          <div>
            <strong>Expires: </strong>
            {new Date(data.expireDate.$date).toDateString()}
          </div>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color='primary' autoFocus>
          close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default function RedeemModal(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  return (
    <>
      <Box onClick={handleClickOpen}>{props.children}</Box>
      <SimpleDialog data={props.data} open={open} onClose={handleClose} />
    </>
  );
}
