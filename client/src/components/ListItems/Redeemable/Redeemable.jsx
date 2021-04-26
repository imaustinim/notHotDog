import { useState } from "react";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import RedeemModal from "../RedeemModal/RedeemModal";

import { ParseData } from "./RedeemableUtil";

export default function Redeemable(props) {
  const mytheme = useTheme();
  let parsedData = ParseData(props.data, mytheme);
  const useStyles = makeStyles((theme) => ({
    inline: {
      display: "inline",
    },
    listItem: {
      backgroundColor: parsedData.background[mytheme.palette.type],
    },
  }));
  const classes = useStyles();

  const [edit, setEdit] = useState(false)

  const handleEdit = () => {
    setEdit(!edit)
  }
  return (
    <RedeemModal data={parsedData} handleEdit={handleEdit}>
      <ListItem button className={classes.listItem} alignItems='flex-start'>
        <ListItemAvatar>
          <Avatar alt={parsedData.businessName} src={parsedData.avatar} />
        </ListItemAvatar>
        <ListItemText
          primary={parsedData.primary}
          secondary={parsedData.secondary}
        />
      </ListItem>
      <Divider variant='inset' component='li' />
    </RedeemModal>
  );
}