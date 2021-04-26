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
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import QrReader from "react-qr-reader";
import FlipCameraIosIcon from "@material-ui/icons/FlipCameraIos";
import RedoIcon from "@material-ui/icons/Redo";
import * as QrScannerUtil from "./QrScannerUtil";
import { propTypes } from "qrcode.react";

export default function QrScanner(props) {
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

  let handleSubmit = () => {
    if (result) {
      QrScannerUtil.checkCode(result);
    } else {
      props.setSnack({
        open: true,
        message: `Please scan or input a barcode!`,
        severity: "warning",
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
