import React, { useEffect, useState } from "react";

import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemIcon from '@material-ui/core/ListItemIcon';
import IconButton from '@material-ui/core/IconButton';
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { Box, Link, Typography } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Slide from "@material-ui/core/Slide";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import EditCampaignForm from "./EditCampaignForm";


import QRCode from "qrcode.react";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

function SimpleDialog(props) {
  const theme = useTheme();
  const { data, onClose, open } = props;
  const URL = props.URL + data.id
  const [qrSize, setQrSize] = useState(128);
  let xsMatch = useMediaQuery(theme.breakpoints.down("xs"));
  let smMatch = useMediaQuery(theme.breakpoints.up("sm"));
  let mdMatch = useMediaQuery(theme.breakpoints.up("md"));
  
  useEffect(() => {
    if (mdMatch) setQrSize(512);
    else if (smMatch) setQrSize(400);
    else if (xsMatch) setQrSize(200);
  }, [mdMatch, smMatch, xsMatch]);

  const [edit, setEdit] = useState(false)

  const handleEdit = () => {
    setEdit(!edit)
  }

  return (
    <Dialog
      fullScreen={xsMatch}
      onClose={onClose}
      aria-labelledby='simple-dialog-title'
      open={open}
      TransitionComponent={Transition}>
      <DialogTitle id='simple-dialog-title'>
        <ListItem alignItems='flex-start'>
          <ListItemAvatar>
            <Avatar alt={data.businessName} src={data.avatar} />
          </ListItemAvatar>
          <ListItemText primary={data.primary} />
          <ListItemIcon>
            <IconButton edge="end" aria-label="delete">
              <EditIcon onClick={() => handleEdit()} />
            </IconButton>
          </ListItemIcon>
          {/* <ListItemIcon>
            <IconButton edge="end" aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </ListItemIcon> */}
        </ListItem>
      </DialogTitle>
      { edit ? (
        <>
        <DialogContent>
          <Box
            display='flex'
            flexDirection='column'
            justifyContent='center'
            alignItems='center'>
            <EditCampaignForm data={data} setDataSet={props.setDataSet} setSnack={props.setSnack}/>
          </Box>
        </DialogContent>
        </>
      ) : (
      <>
        <DialogContent>
          <Box
            display='flex'
            flexDirection='column'
            justifyContent='center'
            alignItems='center'>
            <QRCode
              value={URL}
              size={qrSize}
              bgColor={theme.palette.primary.light}
              fgColor={theme.palette.secondary.dark}
            />
          </Box>

          <DialogContentText id='alert-dialog-description'>
            <>
              <Box display='flex' justifyContent='center'>
                <Typography>{data.secondary}</Typography>
              </Box>
              {data.description}
            </>
          </DialogContentText>
        </DialogContent>
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
            <Box display='block' style={{ overflowX: "scroll" }}>
              <Link href={URL}>
                <code>{URL}</code>
              </Link>
              <Typography color='textSecondary' variant='body2'>
                <br />
                Start Date:
                {data.startDate.toLocaleDateString("en-us")}
                <br />
                End Date:
                {data.endDate.toLocaleDateString("en-us")}
              </Typography>
            </Box>
          </AccordionDetails>
        </Accordion>
      </>
      )}
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
      <SimpleDialog data={props.data} handleEdit={props.handleEdit} URL={props.URL} setDataSet={props.setDataSet} setSnack={props.setSnack} open={open} onClose={handleClose} />
    </>
  );
}
