import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import List from "@material-ui/core/List";

import { makeStyles } from "@material-ui/core/styles";

import { useState, useEffect } from "react";
import { Link as RouterLink, useParams, useHistory } from "react-router-dom";

import { getCampaignData } from "../../utils/businessUtils";
import CampaignForm from "./CampaignForm"
import Redeemable from "../../components/ListItems/Redeemable/Redeemable";

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
	
  let [dataSet, setDataSet] = useState([])

	useEffect(async () => {
		try {
			let data = await getCampaignData()
			setDataSet(data)
		} catch (err) {
			console.log(err)
		}
	}, [])

  return (
    <Container component='main' maxWidth='sm'>
      <CssBaseline />
      <div className={classes.paper}>
				<CampaignForm setDataSet={setDataSet} setSnack={props.setSnack} user={props.user} {...props}/>
				<List >
        {dataSet.map((item, idx) => (
        	<Redeemable key={idx} data={item} />
        ))}
      	</List>
      </div>
    </Container>
  );
}
