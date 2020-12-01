import React from "react";
import CreateGroupForm from "../../components/CreateGroupForm";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import { selectUser } from "../../store/user/selectors";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

export default function CreateGroup() {
  const history = useHistory();
  const { token } = useSelector(selectUser);
  if (token === null) {
    history.push("/explore");
  }

  // STYLING:
  const useStyles = makeStyles({
    typography: { fontSize: 25 },
  });
  const classes = useStyles();

  return (
    <Grid
      container
      direction="column"
      justify="space-between"
      alignItems="center"
      spacing={6}
    >
      <Grid item xs={12}>
        <Typography variant="overline" className={classes.typography}>
          Use the form below to create a new group and meet up cool new people
        </Typography>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <CreateGroupForm />
      </Grid>
    </Grid>
  );
}
