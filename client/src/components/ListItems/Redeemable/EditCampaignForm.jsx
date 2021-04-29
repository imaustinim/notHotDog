import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";

import moment from "moment";
import React from "react";
import {
  EditCampaign,
  getCampaignData,
  getCampaign,
} from "../../../utils/businessUtils";
import { useState, useEffect } from "react";

const symbols = [
  {
    value: "dollar",
    label: "$",
  },
  {
    value: "percent",
    label: "%",
  },
];

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  cardcontent: {
    "&:last-child": {
      paddingBottom: theme.spacing(1),
    },
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function EditCampaignForm(props) {
  const classes = useStyles();

  let [campaignName, setCampaignName] = useState("");
  let [campaignType, setCampaignType] = useState("");
  let [description, setDescription] = useState("");
  let [activeDate, setActiveDate] = useState("");
  let [expireDate, setExpireDate] = useState("");
  let [quantity, setQuantity] = useState("");
  let [value, setValue] = useState("");
  let [unit, setUnit] = useState("");
  let [symbol, setSymbol] = useState("$");
  let [access, setAccess] = useState("");
  let [numUses, setNumUses] = useState("");

  const setCampaign = async () => {
    let data = await getCampaign(props.data.id);
    setCampaignName(data.name);
    setCampaignType(data.type);
    setDescription(data.description);
    setActiveDate(moment(data.activeDate).format("YYYY-MM-DDTkk:mm"));
    setExpireDate(moment(data.activeDate).format("YYYY-MM-DDTkk:mm"));
    setQuantity(data.remainingQuantity);
    setNumUses(data.contract.numUses);
    setValue(data.contract.value);
    setUnit(data.contract.unit);
    if (data.contract.unit === "dollar") {
      setSymbol("$");
    } else {
      setSymbol("%");
    }
    setAccess(data.contract.access);
  };

  useEffect(() => {
    try {
      setCampaign();
    } catch (err) {
      console.log(err);
    }
  });

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      let formData = {
        campaignName: campaignName,
        campaignType: campaignType,
        description: description,
        activeDate: activeDate,
        expireDate: expireDate,
        value: value,
        unit: unit,
        access: access,
        numUses: numUses,
      };

      let res = await EditCampaign(formData, props.data.id);
      if (res.status !== 200) {
        throw res;
      } else {
        props.handleClose();
        try {
          let data = await getCampaignData();
          setCampaign();
          props.setDataSet(data);
          props.setSnack({
            open: true,
            message: `Successfully edited ${res.campaign.name}!`,
            severity: "success",
          });
        } catch (err) {
          console.log(err);
        }
      }
    } catch (err) {
      let newErrorSnack;
      if (err.code === 11000) {
        newErrorSnack = {
          open: true,
          message: `${campaignName} not created`,
          severity: "error",
        };
      } else {
        newErrorSnack = {
          open: true,
          message: `${err}`,
          severity: "error",
        };
      }
      props.setSnack(newErrorSnack);
    }
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          {/* <Card className={classes.card}> */}
          <CardContent>
            <Typography component='h1' variant='h5' align='center'>
              Edit Campaign
            </Typography>
          </CardContent>
          <CardContent className={classes.cardcontent}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant='outlined'
                  required
                  fullWidth
                  id='campaignName'
                  label='Campaign Name'
                  name='campaignName'
                  autoComplete='cname'
                  value={campaignName}
                  onChange={(e) => {
                    setCampaignName(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl
                  fullWidth
                  required
                  variant='outlined'
                  className={classes.formControl}>
                  <InputLabel htmlFor='outlined-age-native-simple'>
                    Campaign Type
                  </InputLabel>
                  <Select
                    disabled
                    native
                    value={campaignType}
                    onChange={(e) => {
                      setCampaignType(e.target.value);
                    }}
                    label='Campaign Type'
                    inputProps={{
                      name: "age",
                      id: "outlined-age-native-simple",
                    }}>
                    <option aria-label='None' value='' />
                    <option value='gift card'>Gift Card</option>
                    <option value='coupon'>Coupon</option>
                    <option value='ticket'>Ticket</option>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  variant='outlined'
                  fullWidth
                  multiline
                  rows={3}
                  rowsMax={6}
                  id='description'
                  label='Description'
                  name='description'
                  autoComplete='description'
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <TextField
                  fullWidth
                  id='activeDate'
                  label='Start Date'
                  type='datetime-local'
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={activeDate}
                  onChange={(e) => {
                    setActiveDate(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={6} sm={6}>
                <TextField
                  fullWidth
                  id='expireDate'
                  label='End Date'
                  type='datetime-local'
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={expireDate}
                  onChange={(e) => {
                    setExpireDate(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant='outlined'
                  required
                  fullWidth
                  id='quantity'
                  label='Quantity'
                  name='quantity'
                  type='number'
                  helperText='Use -1 for unlimited'
                  InputProps={{ inputProps: { min: -1 } }}
                  value={quantity}
                  onChange={(e) => {
                    setQuantity(e.target.value);
                  }}
                />
              </Grid>
              {campaignType === "gift card" ? (
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant='outlined'
                    required
                    fullWidth
                    id='value'
                    label='Value'
                    name='value'
                    value={value}
                    onChange={(e) => {
                      setValue(e.target.value);
                    }}
                  />
                </Grid>
              ) : (
                <></>
              )}
              {campaignType === "coupon" ? (
                <>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant='outlined'
                      required
                      fullWidth
                      id='numUses'
                      label='Number of Uses'
                      name='numUses'
                      type='number'
                      helperText='Use -1 for unlimited'
                      InputProps={{ inputProps: { min: -1 } }}
                      value={numUses}
                      onChange={(e) => {
                        setNumUses(e.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <TextField
                      variant='outlined'
                      required
                      fullWidth
                      id='outlined-adornment-amount'
                      value={value}
                      label='Amount'
                      type='number'
                      InputProps={{
                        inputProps: { min: 0 },
                        startAdornment: (
                          <InputAdornment position='start'>
                            {symbol}
                          </InputAdornment>
                        ),
                      }}
                      onChange={(e) => {
                        setValue(e.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <TextField
                      fullWidth
                      id='unit'
                      select
                      label='Unit'
                      value={unit}
                      defaultValue={unit}
                      onChange={(e) => {
                        setUnit(e.target.value);
                        if (e.target.value === "percent") {
                          setSymbol("%");
                        } else {
                          setSymbol("$");
                        }
                      }}
                      variant='outlined'>
                      {symbols.map((option) => {
                        return option.label === "$" ? (
                          <MenuItem
                            selected
                            key={option.label}
                            value={option.value}>
                            {option.label}
                          </MenuItem>
                        ) : (
                          <MenuItem
                            selected
                            key={option.label}
                            value={option.value}>
                            {option.label}
                          </MenuItem>
                        );
                      })}
                    </TextField>
                  </Grid>
                </>
              ) : (
                <></>
              )}
              {campaignType === "ticket" ? (
                <>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant='outlined'
                      required
                      fullWidth
                      id='numUses'
                      label='Number of Uses'
                      name='numUses'
                      type='number'
                      helperText='Use -1 for unlimited'
                      InputProps={{ inputProps: { min: -1 } }}
                      value={numUses}
                      onChange={(e) => {
                        setNumUses(e.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <TextField
                      variant='outlined'
                      required
                      fullWidth
                      id='access'
                      label='Access'
                      name='access'
                      value={access}
                      onChange={(e) => {
                        setAccess(e.target.value);
                      }}
                    />
                  </Grid>
                  {/* <Grid item xs={6} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="numUses"
                      label="Number of Uses"
                      type="number"
                      // InputLabelProps={{
                      //   shrink: true,
                      // }}
                      variant="outlined"
                    />
                  </Grid> */}
                </>
              ) : (
                <></>
              )}
            </Grid>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              className={classes.submit}>
              Save Changes
            </Button>
          </CardContent>
          {/* </Card> */}
        </Grid>
      </Grid>
    </form>
  );
}
