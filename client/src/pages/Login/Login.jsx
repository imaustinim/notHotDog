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
import { attemptLogin } from "../../utils/authUtils";
import HotDogIcon from "../../components/HotDogIcon/HotDogIcon";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(12),
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn(props) {
  const history = useHistory();
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  const classes = useStyles();
  const { type } = useParams();

  /* get form data, attempt login, handle error/succcess msgs */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let formData = {
        type: type,
        email: email,
        password: password,
      };
      let res = await attemptLogin(formData);
      if (res && res._id) props.setUser(res);
      else throw res;
      props.setSnack({
        open: true,
        message: `You have logged in!`,
        severity: "success",
      });
      history.push("/dashboard");
    } catch (err) {
      props.setSnack({
        open: true,
        message: `${err.message}`,
        severity: "error",
      });
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
          } Sign in`}
        </Typography>
        <form onSubmit={handleSubmit} className={classes.form} noValidate>
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            autoComplete='email'
            autoFocus
          />
          <TextField
            variant='outlined'
            margin='normal'
            required
            fullWidth
            name='password'
            label='Password'
            type='password'
            id='password'
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            autoComplete='current-password'
          />
          <Button
            type='submit'
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}>
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link
                target='_blank'
                href='mailto:admin@notHotDog.ca?subject="Password reset request"'
                variant='body2'
                color='inherit'>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link
                component={RouterLink}
                to={`/${type}/signup`}
                variant='body2'
                color='inherit'>
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
