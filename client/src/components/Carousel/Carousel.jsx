import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Container from "@material-ui/core/Container";
import { Typography, Box } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  gridList: {
    flexWrap: 'nowrap',
    width: "100% !important",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
  gridListTile: {
    height: "100vw",
    maxWidth: "360px",
    padding: "0",
    margin: "0",
  },
  img: {
    padding: "0",
    margin: "0",
    width: "auto",
    height: "80vw",
    maxWidth: "100%",
  }
}));

export default function Carousel() {
  const classes = useStyles();

  const tileData=[
    {
      src: "https://i.imgur.com/AbUvubM.png",
      title: "User Welcome Page",
    },
    {
      src: "https://i.imgur.com/ti1sgMm.png",
      title: "Scan Coupon"
    },
    {
      src: "https://i.imgur.com/wy4tcTe.png",
      title: "Redeem Coupons"
    },
    {
      src: "https://i.imgur.com/sGWUiHz.png",
      title: "Create Campaign From",
    }
  ]

  return (
      <Box>
        <Box mt={2} mb={2}>
          <Typography variant="h4" align="center">
            <strong>
              Screenshots
            </strong>
          </Typography>
        </Box >
        <Box mt={4}>
        <GridList className={classes.gridList} cols={1} cellHeight="auto">
          {tileData.map((tile) => (
            <GridListTile key={tile.src}>
              <Box align="center" m={0} p={0}>
                <img src={tile.src} alt={tile.title} className={classes.img}/>
              </Box>
              <Box mt={2} mx={0} p={0}>
                <Typography variant="h6" align="center">
                  {tile.title}
                </Typography>
              </Box>
            </GridListTile>
          ))}
        </GridList>
        </Box>
      </Box>
  );
}