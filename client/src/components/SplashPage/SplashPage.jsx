import { useState, useEffect } from "react";
import clsx from "clsx"
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import HotDogIcon from "../HotDogIcon/HotDogIcon"
import NotHotDog from "../nothotdog/nothotdog"

export default function DemoColourGrid(props) {
  const [hotdog, setHotdog] = useState(true)

  useEffect(() => {
    setTimeout(() => setHotdog(!hotdog), 300)
  }, [])
  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    icon: {
      width: "144px",
      height: "144px",
      // transform: "rotate(45deg)",
      transition: "1s ease-in-out",
      "&:hover": {
        cursor: "pointer"
      }
    },
    hotdog: {
      transform: "rotate(225deg)",
      transition: "1s ease-in-out",
    },
    hidden: {
      transition: "1s ease-in-out",
      opacity: 0,
    },
    shift: {
      transform: "translateX(-14.5px)"
    },
    transition: {
      transition: "1s ease-in-out",
    },
    aboutBody: {
      [theme.breakpoints.down("xs")]: {
        textAlign: "center"
      },
      textAlign: "left"
    },
    featureBody: {
      [theme.breakpoints.down("xs")]: {
        textAlign: "center"
      },
      textAlign: "center"
    }
  }));
  const classes = useStyles();
  return (
    <Container maxWidth="md" className={classes.paper}>
      <Box mb={2} mt={6}>
        <HotDogIcon 
        onClick={() => setHotdog(!hotdog)}
        className={clsx(classes.icon, {
          [classes.hotdog]: hotdog,
        })}
        />
      </Box>
      <Box mt={2} display="flex" className={classes.transition}>
        <Typography 
          className={clsx(classes.transition,{
            [classes.hidden]: hotdog
          })}
          align="center"
          variant="h6"
          style={{position: "relative", bottom: "2px"}}
        >
          <strong>not&nbsp;</strong>
        </Typography>
        <Typography 
          align="center"
          variant="h3"
          className={clsx(classes.transition,{
            [classes.shift]: hotdog
          })}>
          <strong>
            Hot Dog
          </strong>
        </Typography>
      </Box>
      <Box mt={3}>
        <Typography align="center" variant="h5">
              Your favourite customer loyalty app
        </Typography>
      </Box>
      <Box mt={6} mb={6} width="100%">
        <hr/>
      </Box>
      <Box>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <Box display="flex" justifyContent="center" mb={2}>
              <Typography variant="h4">
                <strong>About</strong>
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box className={classes.aboutBody}>
              <NotHotDog/>&nbsp;
              <Typography display="inline" className={classes.fontBody}>
                is a free, and easy-to-use loyalty rewards manager. Users can manage all their cards, coupons, and tickets in one place. 
                Small businesses can easily create and manage promotional campaigns and programs.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Box display="flex" justifyContent="center" mt={6} mb={2}>
              <Typography variant="h4">
                <strong>Features</strong>
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Box className={classes.featureBody}>
              <NotHotDog/>&nbsp;
              <Typography display="inline" className={classes.fontBody}>
              allows you to store your favourite coupons, gift cards, and tokens without ever misplacing them!
              Designed to save you time at home and in the checkout; our app lets you organize, collect and redeem benefits from local small businesses.
              <Box>
                Simply scan to add and display the QR Code when it's time to save.
                Let our QR scanner simplify the process of adding and claiming your benefits
              </Box>
              
              
              
              <Box mb={1} mt={3}>
                Go paperless with <NotHotDog/>
              </Box>
              <Box mt={1} mb={3}>
                Go <NotHotDog/>
              </Box>
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}