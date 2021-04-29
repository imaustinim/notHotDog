import { useState, useEffect } from "react";
import clsx from "clsx"
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import HotDogIcon from "../HotDogIcon/HotDogIcon"

export default function DemoColourGrid(props) {
  const [hotdog, setHotdog] = useState(true)

  useEffect(() => {
    setTimeout(() => setHotdog(!hotdog), 300)
  }, [])
  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
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
    not: {
      position: "relative", 
      fontSize: "9px", 
      bottom: "9px",
    },
    fontBody: {
      fontSize: "18px",
      fontWeight: 200
    }
  }));
  const classes = useStyles();
  return (
    <Container maxWidth="md" className={classes.paper}>
      <Box mb={2} mt={6}>
        <HotDogIcon 
        className={classes.icon}
        className={hotdog ? classes.hotdog : classes.nothotdog}
        onClick={() => setHotdog(!hotdog)}
        className={clsx(classes.icon, {
          [classes.hotdog]: hotdog,
        })}
        />
      </Box>
      <Box display="flex" className={classes.transition}>
        <Typography 
          className={clsx(classes.transition,{
            [classes.hidden]: hotdog
          })}
          align="center"
          variant="h6"
          style={{position: "relative", bottom: "2px"}}
        >
          <strong>not&nbsp;</strong>
          {/* not&nbsp; */}
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
      <Box mt={6} mb={6} width="98%">
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
            <Box textAlign="center">
              <Typography display="inline" variant="caption" align="center" className={classes.not}>
                <strong>not</strong>&nbsp;
              </Typography>
              <Typography display="inline" className={classes.fontBody}>
                <strong>Hot Dog</strong>&nbsp;
              </Typography>
              <Typography display="inline" align="justify" className={classes.fontBody}>
                is a multiplatform loyalty cards platform where customers can store, track, and manage their loyalty cards. Businesses can create and manage marketing campaigns and loyalty programs.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Box display="flex" justifyContent="center" mt={8} mb={2}>
              <Typography variant="h4">
                <strong>Features</strong>
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Box textAlign="center">
              <Typography display="inline" variant="caption" className={classes.not}>
                <strong>not&nbsp;</strong>
              </Typography>
              <Typography display="inline" className={classes.fontBody}>
                <strong>Hot Dog&nbsp;</strong>
              </Typography>
              <Typography display="inline" className={classes.fontBody}>
                allows you to keep track and manage various loyalty rewards cards such as coupons, gift cards, and tickets. Go paperless and never miss out on an opportunity to save!
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6} sm={3}>
          </Grid>
          <Grid item xs={6} sm={3}>
          </Grid>
          <Grid item xs={6} sm={3}>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}