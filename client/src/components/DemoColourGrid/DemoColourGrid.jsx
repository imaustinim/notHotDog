import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

export default function DemoColourGrid(props) {
  return (
    <Container>
      <Box pt={9}>
        <strong>Please Log IN!</strong>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={4}>
            <Box bgcolor='primary.main' color='primary.contrastText' p={2}>
              primary.main
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box bgcolor='primary.dark' color='primary.contrastText' p={2}>
              primary.dark
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box bgcolor='primary.light' color='primary.contrastText' p={2}>
              primary.light
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box bgcolor='secondary.main' color='secondary.contrastText' p={2}>
              secondary.main
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box bgcolor='secondary.dark' color='primary.contrastText' p={2}>
            secondary.dark
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box bgcolor='secondary.light' color='primary.contrastText' p={2}>
            secondary.light
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box bgcolor='error.main' color='error.contrastText' p={2}>
              error.main
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box bgcolor='error.dark' color='primary.contrastText' p={2}>
            error.dark
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box bgcolor='error.light' color='primary.contrastText' p={2}>
            error.light
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box bgcolor='warning.main' color='warning.contrastText' p={2}>
              warning.main
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box bgcolor='warning.dark' color='primary.contrastText' p={2}>
            warning.dark
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box bgcolor='warning.light' color='primary.contrastText' p={2}>
            warning.light
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box bgcolor='info.main' color='info.contrastText' p={2}>
              info.main
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box bgcolor='info.dark' color='primary.contrastText' p={2}>
            info.dark
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box bgcolor='info.light' color='primary.contrastText' p={2}>
            info.light
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box bgcolor='success.main' color='success.contrastText' p={2}>
              success.main
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box bgcolor='success.dark' color='primary.contrastText' p={2}>
            success.dark
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box bgcolor='success.light' color='primary.contrastText' p={2}>
            success.light
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box bgcolor='text.primary' color='background.paper' p={2}>
              text.primary
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box bgcolor='text.secondary' color='background.paper' p={2}>
              text.secondary
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box bgcolor='text.disabled' color='background.paper' p={2}>
              text.disabled
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box bgcolor='giftcard.dark' color='primary.contrastText' p={2}>
            giftcard.dark
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box bgcolor='giftcard.light' color='primary.contrastText' p={2}>
            giftcard.light
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box bgcolor='ticket.dark' color='primary.contrastText' p={2}>
            ticket.dark
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box bgcolor='ticket.light' color='primary.contrastText' p={2}>
            ticket.light
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box bgcolor='coupon.dark' color='primary.contrastText' p={2}>
            coupon.dark
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box bgcolor='coupon.light' color='primary.contrastText' p={2}>
            coupon.light
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
