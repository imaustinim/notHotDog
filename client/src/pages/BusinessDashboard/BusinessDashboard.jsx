import React from "react";
import Container from "@material-ui/core/Container";
import List from "@material-ui/core/List";
import { makeStyles } from "@material-ui/core/styles";
import { useState, useEffect } from "react";
import { getCampaignData } from "../../utils/businessUtils";
import CampaignForm from "./CampaignForm";
import Redeemable from "../../components/ListItems/Redeemable/Redeemable";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(12),
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(12),
  },
  cardcontent: {
    "&:last-child": {
      paddingBottom: theme.spacing(1),
    },
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  expand: {
    display: "inline-block",
    verticalAlign: "middle",
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
}));

export default function BusinessDashboard(props) {
  const classes = useStyles();

  let [dataSet, setDataSet] = useState([]);

  useEffect(() => {
    try {
      getCampaignData().then((res) => setDataSet(res));
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <Container className={classes.root}>
      <CampaignForm
        className={classes.form}
        setDataSet={setDataSet}
        setSnack={props.setSnack}
        user={props.user}
        {...props}
      />
      <List>
        {dataSet.length ? (
          dataSet.map((item, idx) => <Redeemable key={idx} data={item} />)
        ) : (
          <>No Campaigns Yet! Go add one, ya dork</>
        )}
      </List>
    </Container>
  );
}
