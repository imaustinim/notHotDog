import Typography from "@material-ui/core/Typography";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import RedeemModal from "../../components/RedeemModal/RedeemModal";

const useStyles = makeStyles((theme) => ({
  inline: {
    display: "inline",
  },
}));

export default function GiftCard(props) {
  const classes = useStyles();
  return (
    <RedeemModal data={props.data}>
      <ListItem button alignItems='flex-start'>
        <ListItemAvatar>
          <Avatar alt={props.data.businessName} src={props.data.avatar} />
        </ListItemAvatar>
        <ListItemText
          primary={
            <>
              {`$${parseFloat(props.data.contract.remainingValue).toFixed(
                2
              )} / $${parseFloat(props.data.contract.value).toFixed(2)} `}
              <strong>{props.data.type.toUpperCase()}</strong>
            </>
          }
          secondary={
            <>
              <Typography
                variant='body2'
                noWrap='true'
                className={classes.inline}
                color='textPrimary'>
                {
                  <>
                    <em>{props.data.businessName}</em>
                    <span> - {props.data.name}</span>
                    <br />
                  </>
                }
              </Typography>
              <Typography noWrap='true' variant='subtitle2'>
                {props.data.description}
              </Typography>
            </>
          }
        />
      </ListItem>
      <Divider variant='inset' component='li' />
    </RedeemModal>
  );
}
