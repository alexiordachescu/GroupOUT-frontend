import React from "react";
import Card from "@material-ui/core/Card";
import Paper from "@material-ui/core/Paper";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import EventIcon from "@material-ui/icons/Event";
import LocalOfferRoundedIcon from "@material-ui/icons/LocalOfferRounded";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles({
  root: {
    width: 500,
    height: 400,
  },
  media: {
    height: 250,
  },
  container: {
    height: 150,
    marginBottom: "auto",
    backgroundColor: "rgba(55,150,131,0.2)",
  },
  typography: { fontSize: 12, fontWeight: "bold", marginTop: 3 },
  paper: { backgroundColor: "rgba(130, 130, 130, 0.08)" },
  colorGreen: {
    backgroundColor: "rgba(35,165,20,0.4)",
  },
  colorYellow: {
    backgroundColor: "rgba(241,231,103,0.4)",
  },
  colorDarkOrange: {
    backgroundColor: "rgba(255,118,12,0.4)",
  },
  colorRed: {
    backgroundColor: "rgba(234,12,12,0.4)",
  },
});

export default function Group(props) {
  const classes = useStyles();
  const fullLimit = parseInt((props.size / props.maxSize) * 100);
  let color;
  switch (true) {
    case 0 < fullLimit && fullLimit < 32:
      color = "green";
      break;
    case 32 < fullLimit && fullLimit < 55:
      color = "yellow";
      break;
    case 55 < fullLimit && fullLimit < 81:
      color = "darkOrange";
      break;
    default:
      color = "red";
  }

  let colorMap = new Map([
    ["green", classes.colorGreen],
    ["yellow", classes.colorYellow],
    ["darkOrange", classes.colorDarkOrange],
    ["red", classes.colorRed],
  ]);

  let memberG = `Members: ${props.size} / ${props.maxSize}`;

  return (
    <Card className={classes.root}>
      <CardMedia image={props.image} className={classes.media} />
      <Grid
        container
        direction="column"
        justify="space-between"
        className={classes.container}
      >
        <Typography
          variant="overline"
          color="initial"
          className={classes.typography}
        >
          {props.description}
        </Typography>{" "}
        <Grid container direction="row">
          <Paper variant="outlined">
            <Typography variant="h6">
              <EventIcon fontSize="small" />
              {props.date}
            </Typography>
          </Paper>
        </Grid>{" "}
        <Paper className={classes.paper}>
          <Grid container direction="row" justify="space-between">
            <Grid item>
              <LocalOfferRoundedIcon fontSize="medium" />
              {props.tags.map((i) => {
                return <Chip label={i.name} color="secondary" />;
              })}
            </Grid>
            <Grid item>
              <Chip label={memberG} className={colorMap.get(color)} />
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Card>
  );
}
