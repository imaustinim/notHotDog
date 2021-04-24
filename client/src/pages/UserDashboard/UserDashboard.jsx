import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
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

import { makeStyles } from "@material-ui/core/styles";

import { useState } from "react";
import { Link as RouterLink, useParams, useHistory } from "react-router-dom";

import Coupon from "./Coupon";
import GiftCard from "./GiftCard";
import Ticket from "./Ticket";


// import { CreateCampaign } from "../../utils/userUtils";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  cardcontent: {
    "&:last-child": {
      paddingBottom: theme.spacing(1)
    }
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function UserDashboard(props) {
  const classes = useStyles();
  const history = useHistory();
  const { type } = useParams();
  
  return (
    <Container component='main' maxWidth='sm'>
      <CssBaseline />
      <div className={classes.paper}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <Card className={classes.card}>
                <CardContent className={classes.cardcontent}>
                  <Typography component='h1' variant='h5' align="center">
                    User Dashboard
                  </Typography>
                  <br/>
                  <Grid container spacing={2}>
                    <Coupon/>
                    <Coupon/>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
      </div>
    </Container>
  );
}
