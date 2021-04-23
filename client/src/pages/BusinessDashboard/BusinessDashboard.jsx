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

import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

import { makeStyles } from "@material-ui/core/styles";

import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


import { useState } from "react";
import { Link as RouterLink, useParams, useHistory } from "react-router-dom";

import { registerNewUser } from "../../utils/authUtils";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  expand: {
    display: "inline-block",
    verticalAlign: "middle",
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));

export default function BusinessDashboard(props) {
  const classes = useStyles();
  const history = useHistory();
  const { type } = useParams();

  let [firstName, setFirstName] = useState("");
  let [businessName, setBusinessName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  
  let [expanded, setExpanded] = useState(false);
  let [campaignName, setCampaignName] = useState("");
  let [description, setDescription] = useState("");
  let [activeDate, setActiveDate] = useState(new Date());
  let [expireDate, setExpireDate] = useState(new Date());

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };


  const handleSubmit = async (e) => {
    /* Parse object format, then pass it to util function
      to complete signup process and success or error message
    */

    try {
      e.preventDefault();
      let formData = {
        firstName: firstName,
        // lastName: lastName,
        businessName: businessName !== "" ? businessName : null,
        email: email,
        password: password,
      };
      let res = await registerNewUser(formData);
      if (res && !res._id) {
        throw res;
      } else {
        history.push("/");
        props.setSnack({
          open: true,
          message: `Successfully created your account!`,
          severity: "success",
        });
        props.setUser(res);
      }
    } catch (err) {
      let newErrorSnack;
      if (err.code === 11000) {
        newErrorSnack = {
          open: true,
          message: `${
            type[0].toUpperCase() + type.slice(1)
          } already exists under email ${email}`,
          severity: "error",
        };
      } else {
        newErrorSnack = {
          open: true,
          message: `${err}`,
          severity: "error",
        };
      }
      props.setSnack(newErrorSnack);
    }
  };
  return (
    <Container component='main' maxWidth='sm'>
      <CssBaseline />
      <div className={classes.paper}>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <Card className={classes.root}>
                <CardActionArea
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                  <CardContent>
                    <Typography component='h1' variant='h5' align="center">
                      Create New Campaign&nbsp;
                      <ExpandMoreIcon
                        color="inherit"
                        fontSize="large"
                        className={clsx(classes.expand, {
                          [classes.expandOpen]: expanded,
                        })}
                      />
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          variant='outlined'
                          required
                          fullWidth
                          id='campaignName'
                          label='Campaign Name'
                          name='campaignName'
                          autoComplete='cname'
                          value={campaignName}
                          onChange={(e) => {
                            setCampaignName(e.target.value);
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          variant='outlined'
                          required
                          fullWidth
                          id='campaignName'
                          label='Campaign Name'
                          name='campaignName'
                          autoComplete='lname'
                          value={campaignName}
                          onChange={(e) => {
                            setCampaignName(e.target.value);
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12}>
                        <TextField
                          variant='outlined'
                          fullWidth
                          multiline
                          rows={3}
                          rowsMax={6}
                          id='description'
                          label='Description'
                          name='description'
                          autoComplete='description'
                          value={description}
                          onChange={(e) => {
                            setDescription(e.target.value);
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <MuiPickersUtilsProvider utils={MomentUtils}>
                          <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="MM/DD/yyyy"
                            id="activeDate"
                            label="Start Date"
                            value={activeDate}
                            onChange={(date) => {
                              setActiveDate(date);
                            }}
                            KeyboardButtonProps={{
                              'aria-label': 'change date',
                            }}
                          />
                        </MuiPickersUtilsProvider>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <MuiPickersUtilsProvider utils={MomentUtils}>
                          <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="MM/DD/yyyy"
                            id="expireDate-inline"
                            label="End Date"
                            value={expireDate}
                            onChange={(date) => {
                              setExpireDate(date);
                            }}
                            KeyboardButtonProps={{
                              'aria-label': 'change date',
                            }}
                          />
                        </MuiPickersUtilsProvider>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Collapse>
              </Card>
            </Grid>
            {type && type === "business" ? (
              <Grid item xs={12}>
                <TextField
                  variant='outlined'
                  required
                  fullWidth
                  id='bname'
                  label='Business Name'
                  name='businessName'
                  value={businessName}
                  onChange={(e) => {
                    setBusinessName(e.target.value);
                  }}
                />
              </Grid>
            ) : (
              <></>
            )}

            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='email'
                label='Email Address'
                type='email'
                name='email'
                autoComplete='email'
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant='outlined'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='current-password'
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </Grid>
          </Grid>
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}>
            Create Campaign
          </Button>
          {/* <Grid container justify='flex-end'>
            <Grid item>
              <Link
                component={RouterLink}
                to={`/${type}/login`}
                variant='body2'
                color='inherit'>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid> */}
        </form>
      </div>
    </Container>
  );
}
