import React from "react";
import Container from "@material-ui/core/Container";
import List from "@material-ui/core/List";
import { makeStyles } from "@material-ui/core/styles";
import { useState, useEffect } from "react";
import { getCampaignData } from "../../utils/businessUtils";
import CampaignForm from "./CampaignForm";
import Redeemable from "../../components/ListItems/Redeemable/Redeemable";

export default function BusinessDashboard(props) {
  const useStyles = makeStyles((theme) => ({
    root: {
      marginTop: theme.spacing(12),
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
  
  const classes = useStyles();
  let [dataSet, setDataSet] = useState([]);

  useEffect(() => {
    try {
      getCampaignData().then((data) => setDataSet(data))
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <Container maxWidth="sm" className={classes.root}>
      {dataSet ? (
        <List className={classes.list}>
          {dataSet.map((item, idx) => (
            <Redeemable
              expanded={props.expanded}
              handleAccordian={props.handleAccordian}
              URL={props.URL + "tokens/create/"}
              idx={idx}
              key={idx}
              data={item}
              setDataSet={setDataSet}
              setSnack={props.setSnack}
              user={props.user}
            />
          ))}
        </List>
      ) : (
        <></>
      )}
      <CampaignForm
        className="campaignform"
        setDataSet={setDataSet}
        setSnack={props.setSnack}
        user={props.user}
        {...props}
      />
    </Container>
  );
}
