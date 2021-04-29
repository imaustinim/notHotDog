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
        console.log(res);
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
              // facingMode={facingMode}
              style={{ width: "100%" }}
              onError={handleError}
              onScan={handleScan}
            />
          </Box>
          <LinearProgress color='secondary' />
        </CardContent>
        <CardActions>
          <Grid container>
            <Grid item xs={12} component={Box} display='flex'>
              <IconButton onClick={handleFacingMode}>
                <FlipCameraIosIcon />
              </IconButton>
              <Typography className={classes.flexGrow}>Scanning...</Typography>
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
              <Grid item container xs={12} spacing={3}>
                <Grid item xs={6}>
                  <strong>{parsedResult.businessName}</strong> -{" "}
                  {parsedResult.name}
                  <br />
                  <strong>Description:</strong> {parsedResult.description}
                  <br />
                </Grid>
                <Grid item xs={6}>
                  {parsedResult._nodeItem.contract.type === "gift card" ? (
                    <>
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
                            <InputAdornment position='start'>$</InputAdornment>
                          ),
                        }}></TextField>
                      <Button
                        onClick={handleSubmit}
                        startIcon={<Icon>check</Icon>}>
                        Redeem
                      </Button>
                    </>
                  ) : (
                    <>
                      {parsedResult.secondary}

                      <Button
                        onClick={handleSubmit}
                        startIcon={<Icon>check</Icon>}>
                        Redeem
                      </Button>
                    </>
                  )}
                </Grid>
                <Grid item xs={6}>
                  {parsedResult.date}
                </Grid>
              </Grid>
            ) : (
              <></>
            )}

            {/* {
active: true,
avatar: undefined,
background: "linear-gradient(251deg, #FBB1BD 30%, #FF7096 70%)",
businessName: "Fakeys Fake Fakers",
color: {light: "#FBB1BD", dark: "#FF7096"},
date: {$$typeof: Symbol(react.element), type: Symbol(react.fragment), key: null, ref: null, props: {…}, …},
description: "this is a giftcard, boop",
endDate: Wed Sep 28 2022 14:57:00 GMT-0400 (Eastern Daylight Time) {},
expired: false,
id: "608ad3e750daf3116f86be30",
name: "giftcard w00t",
primary: {$$typeof: Symbol(react.element), type: Symbol(react.fragment), key: null, ref: null, props: {…}, …},
redeemed: false,
secondary: {$$typeof: Symbol(react.element), type: Symbol(react.fragment), key: null, ref: null, props: {…}, …},
startDate: Tue Apr 27 2021 14:57:00 GMT-0400 (Eastern Daylight Time) {},
_nodeItem:,
activeDate: "2021-04-27T18:57:00.000Z",
contract: {type: "gift card", numUses: 1, value: "100", staticDate: false, duration: null, …},
createdAt: "2021-04-29T15:42:31.539Z",
expireDate: "2022-09-28T18:57:00.000Z",
redeemed: false,
updatedAt: "2021-04-29T15:42:31.539Z",
__v: 0,
_id: "608ad3e750daf3116f86be30",
_node:,
activeDate: "2021-04-27T18:57:00.000Z",
contract: {type: "gift card", numUses: 1, value: "100", staticDate: false, duration: null, …},
createdAt: "2021-04-28T18:57:51.673Z",
description: "this is a giftcard, boop",
expireDate: "2022-09-28T18:57:00.000Z",
name: "giftcard w00t",
nodeItems: [],
redeemedQuantity: 0,
remainingQuantity: -1,
type: "gift card",
updatedAt: "2021-04-28T18:57:51.673Z",
__v: 0,
_business:,
businessName: "Fakeys Fake Fakers",
createdAt: "2021-04-23T03:24:30.305Z",
email: "th3dougler@gmail.com",
firstName: "Frank",
lastName: "mcFakey"
nodes: (9) ["60871343a46dbdd5b83ca520", "608714cc448299da792a45a7", "6087419d6cb3e52d49d7525b", "6087434c6cb3e52d49d7525d", "6088827e9080248e8f9142fa", "6088a04878c98bcb430a9bf2", "6089afe09de0dbb8f4cae165", "6089b02f9de0dbb8f4cae166", "6089e83f6360fa25411970cc"]
updatedAt: "2021-04-28T22:57:03.179Z"
__v: 9
_id: "60823dee226b39e7ea488a3b"
__proto__: Object
_id: "6089b02f9de0dbb8f4cae166"
__proto__: Object
_user: "60823071a05098c818bc54d2"
__proto__: Object
__proto__: Object
}
 */}
          </Grid>
        </CardActions>
      </Card>
    </Container>
  );
}
