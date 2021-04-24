import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Collapse from '@material-ui/core/Collapse';
import clsx from 'clsx';
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import { makeStyles } from "@material-ui/core/styles";

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { useState } from "react";
import { Link as RouterLink, useParams, useHistory } from "react-router-dom";

import { CreateCampaign } from "../../utils/businessUtils";

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
    marginTop: theme.spacing(3),
  },
  cardcontent: {
    "&:last-child": {
      paddingBottom: theme.spacing(1)
    }
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

export default function BusinessDashboard(props) {
  const classes = useStyles();
  const history = useHistory();
  const { type } = useParams();

  let [expanded, setExpanded] = useState(false);
  let [campaignName, setCampaignName] = useState();
  let [campaignType, setCampaignType] = useState();
  let [description, setDescription] = useState();
  let [activeDate, setActiveDate] = useState();
  let [expireDate, setExpireDate] = useState();
  let [quantity, setQuantity] = useState();
  let [value, setValue] = useState();
  let [unit, setUnit] = useState();
  let [access, setAccess] = useState();
  let [numUses, setNumUses] = useState();
  
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleSubmit = async (e) => {
    /* Parse object format, then pass it to util function
      to complete signup process and success or error message
    */
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
      // if (res && !res._id) {
      //   throw res;
      // } else {
      //   history.push("/");
      //   props.setSnack({
      //     open: true,
      //     message: `Successfully created your account!`,
      //     severity: "success",
      //   });
      //   props.setUser(res);
      // }
    } catch (err) {
      // let newErrorSnack;
      // if (err.code === 11000) {
      //   newErrorSnack = {
      //     open: true,
      //     message: `${
      //       type[0].toUpperCase() + type.slice(1)
      //     } already exists under email ${email}`,
      //     severity: "error",
      //   };
      // } else {
      //   newErrorSnack = {
      //     open: true,
      //     message: `${err}`,
      //     severity: "error",
      //   };
      // }
      // props.setSnack(newErrorSnack);
    }
  };
  return (
    <Container component='main' maxWidth='sm'>
      <CssBaseline />
      <div className={classes.paper}>
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
                    <Typography component='h1' variant='h5' align="center">
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
                          <InputLabel htmlFor="outlined-age-native-simple">Campaign Type</InputLabel>
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
                          id="activeDate"
                          label="Start Date"
                          type="datetime-local"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          value={activeDate}
                          onChange={(e) => {
                            console.log(e.target.value)
                            setActiveDate(e.target.value)}
                          }
                        />
                      </Grid>
                      <Grid item xs={6} sm={6}>
                        <TextField
                          fullWidth
                          id="expireDate"
                          label="End Date"
                          type="datetime-local"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          value={expireDate}
                          onChange={(e) => {
                            setExpireDate(e.target.value)}
                          }
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
                          type="number"
                          helperText="Use -1 for unlimited"
                          InputProps={{ inputProps: { min: -1 } }}
                          value={quantity}
                          onChange={(e) => {
                            setQuantity(e.target.value);
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField
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
                        <Grid item xs={8} sm={8}>
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
                        <Grid item xs={4} sm={4}>
                          <TextField
                            required
                            fullWidth
                            id="unit"
                            select
                            label="Unit"
                            value={unit}
                            onChange={(e) => {
                              setUnit(e.target.value)
                            }}
                            variant="outlined"
                          >
                            {symbols.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
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
                      Create Campaign
                    </Button>
                  </CardContent>
                </Collapse>
              </Card>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
