import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Collapse from '@material-ui/core/Collapse';
import Typography from "@material-ui/core/Typography";
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles, useTheme } from "@material-ui/core/styles";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import InputAdornment from '@material-ui/core/InputAdornment';

import clsx from 'clsx';
import React, { useEffect } from "react";
import { CreateCampaign, getCampaignData } from "../../utils/businessUtils";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const symbols = [
  {
    value: 'dollar',
    label: '$',
  },
  {
    value: 'percent',
    label: '%',
  },
];

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  cardcontent: {
    "&:last-child": {
      paddingBottom: theme.spacing(1)
    },
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  expand: {
    display: "inline-block",
    verticalAlign: "middle",
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));

export default function CampaignForm(props) {
  const theme = useTheme();
  const classes = useStyles();
  const history = useHistory();

  let [expanded, setExpanded] = useState(false);
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

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

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
        access: access
      };
      
      let res = await CreateCampaign(formData);
      if (res.status !== 200) {
        throw res;
      } else {
        history.push("/");
        props.setSnack({
          open: true,
          message: `Successfully created campaign ${res.campaign.name}!`,
          severity: "success",
        });
        setExpanded(!expanded);
        setCampaignName("")
        setCampaignType("")
        setDescription("")
        setActiveDate("")
        setExpireDate("")
        setQuantity("")
        setValue("")
        setUnit("")
        setAccess("")
        setNumUses("")
        try {
          let data = await getCampaignData()
          props.setDataSet(data)
        } catch (err) {
          console.log(err)
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
          <Card className={classes.card}>
            <CardActionArea
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <CardContent>
                <Typography component='h1' variant='h5' align="center"
                >
                  Create New Campaign&nbsp;
                  <ExpandMoreIcon
                    color="inherit"
                    fontSize="large"
                    className={clsx(classes.expand, {
                      [classes.expandOpen]: expanded,
                    })}
                  />
                </Typography>
              </CardContent>
            </CardActionArea>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent className={classes.cardcontent}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      InputLabelProps={{
                        style: { color: theme.palette.text[theme.palette.type] },
                      }}
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
                    <FormControl fullWidth required variant="outlined" className={classes.formControl}>
                      <InputLabel htmlFor="outlined-age-native-simple" color={ props.darkMode ? "primary" : "secondary" }>Campaign Type</InputLabel>
                      <Select
                        native
                        value={campaignType}
                        onChange={(e) => {
                          setCampaignType(e.target.value)
                        }}
                        label="Campaign Type"
                        inputProps={{
                          name: 'age',
                          id: 'outlined-age-native-simple',
                        }}
                      >
                        <option aria-label="None" value="" />
                        <option value="gift card">Gift Card</option>
                        <option value="coupon">Coupon</option>
                        <option value="ticket">Ticket</option>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={12}>
                    <TextField
                      InputLabelProps={{
                        style: { color: theme.palette.text[theme.palette.type] },
                      }}
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
                  <Grid item xs={12} sm={6}>
                    <TextField
                      InputLabelProps={{
                        style: { color: theme.palette.text[theme.palette.type] },
                        shrink: true,
                      }}
                      fullWidth
                      id="activeDate"
                      label="Start Date"
                      type="datetime-local"
                      value={activeDate}
                      onChange={(e) => {
                        setActiveDate(e.target.value)}
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      InputLabelProps={{
                        style: { color: theme.palette.text[theme.palette.type] },
                        shrink: true,
                      }}
                      fullWidth
                      id="expireDate"
                      label="End Date"
                      type="datetime-local"
                      value={expireDate}
                      onChange={(e) => {
                        setExpireDate(e.target.value)}
                      }
                    />
                  </Grid>
                  <Grid item xs={6} sm={6}>
                    <TextField
                      InputLabelProps={{
                        style: { color: theme.palette.text[theme.palette.type] },
                      }}
                      variant='outlined'
                      required
                      fullWidth
                      id='quantity'
                      label='Quantity'
                      name='quantity'
                      type="number"
                      helperText="Use -1 for unlimited"
                      InputProps={{ inputProps: { min: -1 } }}
                      value={quantity}
                      onChange={(e) => {
                        setQuantity(e.target.value);
                        console.log(quantity)
                      }}
                    />
                  </Grid>
                  {campaignType === "gift card" ? (
                    <Grid item xs={6} sm={6}>
                      <TextField
                        InputLabelProps={{
                          style: { color: theme.palette.text[theme.palette.type] },
                        }}
                        variant='outlined'
                        required
                        fullWidth
                        id="outlined-adornment-amount"
                        value={value}
                        label="Amount"
                        type="number"
                        InputProps={{ 
                          inputProps: { min: 0 }, 
                          startAdornment: <InputAdornment position="start">{symbol}</InputAdornment>
                        }}
                        onChange={(e) => {setValue(e.target.value)}}
                      />
                    </Grid>
                  ) : (
                    <></>
                  )}
                  {campaignType === "coupon" ? (
                    <>
                    <Grid item xs={6} sm={6}>
                      <TextField
                        InputLabelProps={{
                          style: { color: theme.palette.text[theme.palette.type] },
                        }}
                        variant='outlined'
                        required
                        fullWidth
                        id='numUses'
                        label='Number of Uses'
                        name='numUses'
                        type="number"
                        helperText="Use -1 for unlimited"
                        InputProps={{ inputProps: { min: -1 } }}
                        value={numUses}
                        onChange={(e) => {
                          setNumUses(e.target.value);
                        }}
                      />
                    </Grid>
                    <Grid item xs={6} sm={6}>
                      <TextField
                        InputLabelProps={{
                          style: { color: theme.palette.text[theme.palette.type] },
                        }}
                        variant='outlined'
                        required
                        fullWidth
                        id="outlined-adornment-amount"
                        value={value}
                        label="Amount"
                        type="number"
                        InputProps={{ 
                          inputProps: { min: 0 }, 
                          startAdornment: <InputAdornment position="start">{symbol}</InputAdornment>
                        }}
                        onChange={(e) => {setValue(e.target.value)}}
                      />
                    </Grid>
                    <Grid item xs={6} sm={6}>
                      <TextField
                        InputLabelProps={{
                          style: { color: theme.palette.text[theme.palette.type] },
                        }}
                        fullWidth
                        id="unit"
                        select
                        label="Unit"
                        value={unit}
                        defaultValue={unit}
                        onChange={(e) => {
                          setUnit(e.target.value)
                          if (e.target.value === "percent") {
                            setSymbol("%")
                          } else {
                            setSymbol("$")
                          }
                        }}
                        variant="outlined"
                      >
                        {symbols.map((option) => {
                          return option.label === "$" ? (
                            <MenuItem selected key={option.label} value={option.value}>
                             {option.label}
                            </MenuItem>
                            ) :
                            <MenuItem selected key={option.label} value={option.value}>
                              {option.label}
                            </MenuItem>
                          }
                        )}
                      </TextField>
                    </Grid>
                    </>
                  ) : (
                    <></>
                  )}
                  {campaignType === "ticket" ? (
                    <>
                    <Grid item xs={6} sm={6}>
                      <TextField
                        InputLabelProps={{
                          style: { color: theme.palette.text[theme.palette.type] },
                        }}
                        variant='outlined'
                        required
                        fullWidth
                        id='numUses'
                        label='Number of Uses'
                        name='numUses'
                        type="number"
                        helperText="Use -1 for unlimited"
                        InputProps={{ inputProps: { min: -1 } }}
                        value={numUses}
                        onChange={(e) => {
                          setNumUses(e.target.value);
                        }}
                      />
                    </Grid>
                    <Grid item xs={6} sm={6}>
                      <TextField
                        InputLabelProps={{
                          style: { color: theme.palette.text[theme.palette.type] },
                        }}
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
                  Create Campaign
                </Button>
              </CardContent>
            </Collapse>
          </Card>
        </Grid>
      </Grid>
    </form>
  );
}
