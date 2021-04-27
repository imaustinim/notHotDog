import React from 'react';
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import RedeemModal from "../RedeemModal/RedeemModal";
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';


import { ParseData, ParseUserData } from "./RedeemableUtil";

export default function Redeemable(props) {
  const mytheme = useTheme();

  let parsedData = props.user.businessName
    ? ParseData(props.data, mytheme)
    : ParseUserData(props.data, mytheme);
  const useStyles = makeStyles((theme) => ({
    inline: {
      display: "inline",
    },
    listItem: {
      backgroundColor: parsedData.background[mytheme.palette.type],
      width: "100%",
    },
    cardItem: {
      marginBottom: theme.spacing(1),
    },
  }));
  const classes = useStyles();

  return (
    <Card className={classes.cardItem}>
      <RedeemModal
        data={parsedData}
        user={props.user}
        setDataSet={props.setDataSet}
        setSnack={props.setSnack}>
        <ListItem button className={classes.listItem} alignItems='flex-start'>
          <ListItemAvatar>
            <Avatar alt={parsedData.businessName} src={parsedData.avatar} />
          </ListItemAvatar>
          <ListItemText
            primary={parsedData.primary}
            secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                color="textPrimary"
              >
              {parsedData.secondary}
              </Typography>
            </React.Fragment>
              }
            />
          {/* <ListItemText
            primary={parsedData.primary}
            secondary={parsedData.secondary}
          /> */}
        </ListItem>
      </RedeemModal>
    </Card>

  );
}
