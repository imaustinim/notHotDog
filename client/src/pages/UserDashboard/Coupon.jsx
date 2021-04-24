import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Grid";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Collapse from '@material-ui/core/Collapse';
import clsx from 'clsx';
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import { makeStyles } from "@material-ui/core/styles";

import { useState } from "react";
import { Link as RouterLink, useParams, useHistory } from "react-router-dom";

// import { CreateCampaign } from "../../utils/userUtils";

const useStyles = makeStyles((theme) => ({
  coupon: {
    height: theme.spacing(8),
    padding: theme.spacing(0),
    border: "1px dashed red",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  couponTitle: {
    border: "1px dashed red",
    height: theme.spacing(4),
  },
  couponValue: {
    border: "1px dashed red",
    textAlign: "end",
    height: theme.spacing(4),
  },
  couponBody: {
    border: "1px dashed red",
  },
  couponDates: {
    textAlign: "end",
    border: "1px dashed red",
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalCard: {
    height: theme.spacing(64)
  }
}));

export default function UserDashboard(props) {
  const classes = useStyles();
  const history = useHistory();
  const { type } = useParams();

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  return (
    <>
      <CardActionArea
        onClick={handleOpen}
      >
        <Grid container className={classes.coupon} xs={12} sm={12}>
          <Grid item className={classes.couponTitle} xs={9} sm={9}>
            <Typography>
              Name
            </Typography>
          </Grid>
          <Grid item className={classes.couponValue} xs={3} sm={3}>
            <Typography>
              Value
            </Typography>
          </Grid>
          <Grid item className={classes.couponTitle} xs={6} sm={6}>
            <Typography>
              Description
            </Typography>
          </Grid>
          <Grid item className={classes.couponDates} xs={6} sm={6}>
            <Typography>
              Date
            </Typography>
          </Grid>
        </Grid>

      </CardActionArea>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Container maxWidth='sm'>
            <Card className={classes.modalCard}>
              <CardContent className={classes.modelCardcontent}>
                <Typography component='h1' variant='h5' align="center">
                </Typography>
                <br/>
                <Grid container spacing={2}>
                </Grid>
              </CardContent>
            </Card>
          </Container>
        </Fade>
      </Modal>
    </>
  );
}
