import { Box } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

function Copyright() {
  return (
    <Typography variant='body2' color='textSecondary' align='center'>
      {`Copyright © Austin Im, Douglas Jones ${new Date().getFullYear()}`}
    </Typography>
  );
}

export default function Footer(props) {
  return (
    <Box mt={8}>
      <Copyright />
    </Box>
  );
}
