import { Box, Fade, Typography } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

/* translucent overlay for while page loads */
export default function LoadingPage(props) {
  return (
    <>
      <Fade in={props.show}>
        <Box
          style={{
            // display: props.show ? "inline" : "none",
            position: "fixed",
            top: "0",
            left: "0",
            height: "100%",
            width: "100%",
            background: "rgba(0, 0, 0, 0.2)",
          }}>
          <Box
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
            }}>
            {props.show ? <CircularProgress color={"primary"} /> : <></>}
          </Box>
        </Box>
      </Fade>
      {props.children}
    </>
  );
}
/* 



*/
