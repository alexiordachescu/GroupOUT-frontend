import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
const useStyles = makeStyles({ avatarSize: { height: 25 } });

export default function Comment(props) {
  const classes = useStyles();
  const date = moment(props.date);
  const show = date.format("dddd HH:MM");

  return (
    <div>
      {" "}
      <Grid container direction="row" justify="flex-start">
        <Avatar className={classes.avatarSize}>
          {props.name.substring(0, 2)}
        </Avatar>{" "}
        {props.name} on {show}:
        <Grid item xs={12}>
          {props.comment}
        </Grid>
      </Grid>
    </div>
  );
}
