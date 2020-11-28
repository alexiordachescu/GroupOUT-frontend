import React from "react";
import Card from "@material-ui/core/Card";
import Paper from "@material-ui/core/Paper";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import EventIcon from "@material-ui/icons/Event";
import LocalOfferRoundedIcon from "@material-ui/icons/LocalOfferRounded";

const useStyles = makeStyles({
  root: {
    width: 500,
    height: 400,
    marginTop: 20,
  },
  media: {
    height: 250,
  },
  container: {
    height: 150,
    marginBottom: "auto",
  },
  colorGreen: {
    backgroundColor: "green",
  },
  colorYellow: {
    backgroundColor: "yellow",
  },
  collorDarkOrange: {
    backgroundColor: "orange",
  },
});

export default function Group(props) {
  const classes = useStyles();
  const fullLimit = props.size / props.maxSize;
  let color;
  switch (true) {
    case fullLimit < 0.33:
      color = "green";
      break;
    case fullLimit > 0.66:
      color = "darkOrange";
      break;
    default:
      color = "yellow";
  }
  console.log(color);
  return (
    <Card className={classes.root}>
      <CardMedia image={props.image} className={classes.media} />
      <Grid
        container
        direction="column"
        justify="space-between"
        className={classes.container}
      >
        <Typography variant="subtitle1" color="primary" paragraph="true">
          {props.description}
        </Typography>{" "}
        <Grid container direction="row">
          <Paper>
            <Typography variant="caption">
              <EventIcon fontSize="small" />
              {props.date}
            </Typography>
          </Paper>
        </Grid>{" "}
        <Grid container direction="row" justify="space-between">
          <Grid item>
            <Paper elevation={1}>
              <Typography>
                <LocalOfferRoundedIcon fontSize="small" />
                {props.tags}
              </Typography>
            </Paper>
          </Grid>
          <Grid item>
            {color === "green" ? (
              <Paper elevation={1} className={classes.colorGreen}>
                <Typography variant="caption">
                  Members: {props.size} / {props.maxSize}
                </Typography>
              </Paper>
            ) : color === "yellow" ? (
              <Paper elevation={1} className={classes.colorYellow}>
                <Typography variant="caption">
                  Members: {props.size} / {props.maxSize}
                </Typography>{" "}
              </Paper>
            ) : (
              <Paper elevation={1} className={classes.collorDarkOrange}>
                <Typography variant="caption">
                  Members: {props.size} / {props.maxSize}
                </Typography>
              </Paper>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
}
