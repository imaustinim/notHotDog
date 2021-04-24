import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";

import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

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
}));

export default function SignUp(props) {
  const classes = useStyles();
  const history = useHistory();
  const { type } = useParams();

  let [firstName, setFirstName] = useState("");
  let [lastName, setLastName] = useState("");
  let [businessName, setBusinessName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    /* Parse object format, then pass it to util function
      to complete signup process and success or error message
    */
    try {
      e.preventDefault();
      let formData = {
        firstName: firstName,
        lastName: lastName,
        businessName: businessName !== "" ? businessName : null,
        email: email,
        password: password,
      };
      let res = await registerNewUser(formData);
      if (res && !res._id) {
        throw res;
      } else {
        history.push("/dashboard");
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
    <Container component='main' maxWidth='xs'>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          {`${
            type && type.length > 2 ? type[0].toUpperCase() + type.slice(1) : ""
          } Sign Up`}
        </Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete='fname'
                name='firstName'
                variant='outlined'
                required
                fullWidth
                id='firstName'
                label='First Name'
                autoFocus
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant='outlined'
                required
                fullWidth
                id='lastName'
                label='Last Name'
                name='lastName'
                autoComplete='lname'
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
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
            Sign Up
          </Button>
          <Grid container justify='flex-end'>
            <Grid item>
              <Link
                component={RouterLink}
                to={`/${type}/login`}
                variant='body2'
                color='inherit'>
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
