import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";

import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    width: 300,
    height: 320,
    marginTop: 15,
  },
  media: {
    height: 150,
  },
});
export default function Member(props) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia className={classes.media} image={props.image} />{" "}
        <CardContent>
          <Typography variant="h6" color="textPrimary">
            {props.firstName} {props.lastName}
          </Typography>
          <Typography variant="subtitle">{props.description}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
