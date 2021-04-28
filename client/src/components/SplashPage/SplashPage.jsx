import { useState } from "react";
import clsx from "clsx"
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import HotDogIcon from "../HotDogIcon/HotDogIcon"

export default function DemoColourGrid(props) {
  const [hotdog, setHotdog] = useState(true)
  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    icon: {
      width: "120px",
      height: "120px",
      transform: "rotate(45deg)",
      transition: "1s ease-in-out",
      "&:hover": {
        cursor: "pointer"
      }
    },
    hotdog: {
      transform: "rotate(180deg)",
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
    }
  }));
  const classes = useStyles();
  return (
    <>
    <Container className={classes.paper}>
      <Grid align="center">
        <Box mb={2} mt={4}>
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
          variant="body1"
        >
          <strong>not&nbsp;</strong>
        </Typography>
        <Typography 
          align="center"
          variant="h4"
          className={clsx(classes.transition,{
            [classes.shift]: hotdog
          })}>
          Hot Dog
        </Typography>
      </Box>
      </Grid>
      <Box display="flex" mt={3}>
        <Typography align="center" variant="h5">
          The ultimate loyalty rewards manager!
        </Typography>
      </Box>
      <Grid>

      </Grid>
    </Container>
    </>
  );
}
