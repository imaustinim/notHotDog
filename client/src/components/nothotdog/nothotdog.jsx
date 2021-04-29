import { useState, useEffect } from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

export default function NotHotDog(props) {
  const useStyles = makeStyles((theme) => ({
    not: {
      position: "relative", 
      fontSize: "9px", 
      bottom: "9px",
    },
    fontBody: {
      fontSize: "18px",
      fontWeight: 200
    },
  }));
  const classes = useStyles();
  return (
    <Box display="inline">
      <Typography display="inline" variant="caption" align="center" className={classes.not}>
        <strong>not</strong>&nbsp;
      </Typography>
      <Typography display="inline" className={classes.fontBody}>
        <strong>Hot Dog</strong>
      </Typography>
    </Box>
  );
}