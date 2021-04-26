import React from "react";
import Container from "@material-ui/core/Container";
import List from "@material-ui/core/List";
import { makeStyles } from "@material-ui/core/styles";
import { useState, useEffect } from "react";
import { getTokenData } from "../../utils/userUtils";
import Redeemable from "../../components/ListItems/Redeemable/Redeemable";
import { setDate } from "date-fns";

// import { CreateCampaign } from "../../utils/userUtils";

const useStyles = makeStyles((theme) => ({
  paper: {
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
  root: {
    marginTop: theme.spacing(8),
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
}));

export default function UserDashboard(props) {
  const classes = useStyles();

  let [dataSet, setDataSet] = useState([]);

  useEffect(() => {
    try {
      getTokenData().then((res) => setDataSet(res));
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <Container className={classes.root}>
      <List className={classes.root}>
        {dataSet.length ? (
          dataSet.map((item, idx) => <Redeemable key={idx} data={item} />)
        ) : (
          <>No Campaigns Yet! Go add one, ya dork</>
        )}
      </List>
    </Container>
  );
}
