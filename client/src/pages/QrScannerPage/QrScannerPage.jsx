import {
  Box,
  Card,
  CardActions,
  CardContent,
  Container,
  Icon,
  IconButton,
  LinearProgress,
  TextField,
  Typography,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useState } from "react";
import QrReader from "react-qr-reader";
import FlipCameraIosIcon from "@material-ui/icons/FlipCameraIos";
import RedoIcon from "@material-ui/icons/Redo";
import * as QrScannerUtil from "./QrScannerUtil";

export default function QrScanner(props) {
  const theme = useTheme();
  const useStyles = makeStyles((theme) => ({
    scanning: { backgroundColor: theme.palette.info.light },
    success: { backgroundColor: theme.palette.success.light },
    codeBox: { overflowX: "scroll" },
    flexGrow: { flexGrow: 1 },
  }));
  const classes = useStyles();
  let [result, setResult] = useState("");

  let [facingMode, setFacingMode] = useState("environment");

  let handleScan = (data) => {
    if (data) {
      setResult(data);
    }
  };
  let handleError = (err) => {
    console.log(err);
  };
  let handleFacingMode = () => {
    if (facingMode === "environment") setFacingMode("user");
    else setFacingMode("environment");
  };

  let handleSubmit = async () => {
    try {
      if (result) {
        if (!props.user.businessName) {
          /* If this is the user scanner, work as normal */
          let res = await QrScannerUtil.checkCode(result);
          if (res.constructor && res.constructor.name === "Error") throw res;
          let response = JSON.parse(res);
          props.setSnack({
            open: true,
            message: `Added new coupon "${response._node.name}"`,
            severity: "success",
          });
        } else {
          /* If this is a business scanner: */
          let res = await QrScannerUtil.redeemCode(result);
          console.log(res);
          if (res.constructor && res.constructor.name === "Error") throw res;
          let response = res;
          props.setSnack({
            open: true,
            message: `Response: ${response}`,
            severity: "success",
          });
        }
      }
    } catch (err) {
      props.setSnack({
        open: true,
        message: err.message,
        severity: "error",
      });
    }
  };
  return (
    <Container component={Box} pt={10} maxWidth='sm'>
      <Card className={result ? classes.success : classes.scanning}>
        <CardContent>
          <Box display='flex' alignItems='center' justifyContent='center'>
            <QrReader
              delay={500}
              // facingMode={facingMode}
              style={{ width: "100%" }}
              onError={handleError}
              onScan={handleScan}
            />
          </Box>
          <LinearProgress color='secondary' />
        </CardContent>
        <CardActions>
          <IconButton onClick={handleFacingMode}>
            <FlipCameraIosIcon />
          </IconButton>
          <Typography className={classes.flexGrow}>Scanning...</Typography>
          {result ? (
            <>
              <IconButton onClick={handleSubmit}>
                <Icon>check</Icon>
              </IconButton>
              <IconButton
                onClick={() => {
                  setResult("");
                }}>
                <RedoIcon />
              </IconButton>
            </>
          ) : (
            <></>
          )}
          <TextField
            InputLabelProps={{
              style: { color: theme.palette.text[theme.palette.type] },
            }}
            id='outlined-basic'
            placeholder='Result'
            variant='outlined'
            onChange={(e) => setResult(e.target.value)}
            value={result}
          />
        </CardActions>
      </Card>
    </Container>
  );
}
