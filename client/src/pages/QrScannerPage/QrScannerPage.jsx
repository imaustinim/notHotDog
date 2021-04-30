import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  Icon,
  IconButton,
  InputAdornment,
  LinearProgress,
  TextField,
  Paper,
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
  let [parsedResult, setParsedResult] = useState({});
  let [redeemValue, setRedeemValue] = useState(1);
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
    setResult("");
    if (facingMode === "environment") setFacingMode("user");
    else setFacingMode("environment");
  };

  let handleSubmit = async () => {
    try {
      if (result) {
        if (!props.user.businessName) {
          /* If this is the user scanner, work as normal */
          let res = await QrScannerUtil.addCode(result);
          if (res.constructor && res.constructor.name === "Error") throw res;
          let response = JSON.parse(res);
          props.setSnack({
            open: true,
            message: `Added new coupon "${response._node.name}"`,
            severity: "success",
          });
        } else {
          /* If this is a business scanner: */
          let res = await QrScannerUtil.redeemCode(result, redeemValue);
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
    setResult("");
    setParsedResult({});
  };

  let timeOut;

  let handleChange = async (e, amount = null) => {
    clearTimeout(timeOut);
    await setResult(e.target.value);
    if (e.target.value === "" || !props.user.businessName) return;
    timeOut = setTimeout(async function () {
      try {
        let res = await QrScannerUtil.getOne(e.target.value, theme);
        if (res.constructor && res.constructor.name === "Error") throw res;

        setParsedResult(res);
      } catch (err) {
        console.log(err);
        props.setSnack({
          open: true,
          message: err.message,
          severity: "error",
        });
        setParsedResult("");
      }
    }, 500);
  };
  return (
    <Container component={Box} pt={10} maxWidth='sm'>
      <Card className={result ? classes.success : classes.scanning}>
        <CardContent>
          <Box display='flex' alignItems='center' justifyContent='center'>
            <QrReader
              delay={500}
              facingMode={facingMode}
              style={{ width: "100%" }}
              onError={handleError}
              onScan={handleScan}
            />
          </Box>
          <LinearProgress color='secondary' />
        </CardContent>
        <CardActions>
          <Grid container component={Paper}>
            <Box m={2}>
              <Grid item xs={12} component={Box} display='flex'>
                <IconButton onClick={handleFacingMode}>
                  <FlipCameraIosIcon />
                </IconButton>

                {props.user && !props.user.businessName && result ? (
                  <Button onClick={handleSubmit} startIcon={<Icon>check</Icon>}>
                    Add To Wallet
                  </Button>
                ) : (
                  <></>
                )}
                <TextField
                  id='outlined-basic'
                  placeholder='Result'
                  variant='outlined'
                  className={classes.flexGrow}
                  onChange={handleChange}
                  value={result}
                />
                <IconButton
                  onClick={() => {
                    setResult("");
                  }}>
                  <RedoIcon />
                </IconButton>
              </Grid>

              {props.user &&
              props.user.businessName &&
              parsedResult &&
              parsedResult._nodeItem ? (
                <Box p={2}>
                  <Grid item container xs={12} spacing={3}>
                    <Grid item xs={6}>
                      <strong>{parsedResult.businessName}</strong> -{" "}
                      {parsedResult.name}
                      <br />
                      <strong>Description:</strong> {parsedResult.description}
                      <br />
                    </Grid>

                    <Grid item container xs={6} m={2}>
                      {parsedResult._nodeItem.contract.type === "gift card" ? (
                        <>
                          <Grid item xs={12}>
                            <strong>Balance: </strong>$
                            {parseFloat(
                              parsedResult._nodeItem.contract.remainingValue
                            ).toFixed(2)}{" "}
                            / $
                            {parseFloat(
                              parsedResult._nodeItem.contract.value
                            ).toFixed(2)}
                            <TextField
                              type='number'
                              variant='outlined'
                              min='0'
                              step='any'
                              value={redeemValue}
                              onChange={(e) => {
                                setRedeemValue(e.target.value);
                              }}
                              InputProps={{
                                inputProps: { min: 0 },
                                startAdornment: (
                                  <InputAdornment position='start'>
                                    $
                                  </InputAdornment>
                                ),
                              }}></TextField>
                          </Grid>
                          <Grid item xs={12}>
                            <Button
                              onClick={handleSubmit}
                              startIcon={<Icon>check</Icon>}>
                              Redeem
                            </Button>
                          </Grid>
                        </>
                      ) : (
                        <>
                          <Grid item xs={12}>
                            {parsedResult.secondary}
                          </Grid>
                          <Grid item xs={12}>
                            <Button
                              onClick={handleSubmit}
                              startIcon={<Icon>check</Icon>}>
                              Redeem
                            </Button>
                          </Grid>
                        </>
                      )}
                    </Grid>
                    <Grid item xs={6}>
                      {parsedResult.date}
                    </Grid>
                  </Grid>
                </Box>
              ) : (
                <></>
              )}
            </Box>
          </Grid>
        </CardActions>
      </Card>
    </Container>
  );
}
