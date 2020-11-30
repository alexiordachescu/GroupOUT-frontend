import React, { useState } from "react";
import { selectUser } from "../../store/user/selectors";
import { useSelector } from "react-redux";
import Member from "../../components/Member";
import ChangeProfile from "../../components/ChangeProfile";
import { useHistory } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

export default function MyProfile() {
  const user = useSelector(selectUser);
  const [edit, setEdit] = useState(false);
  const { token } = useSelector(selectUser);
  const history = useHistory();
  if (token === null) {
    history.push("/");
  }

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
      {" "}
      <Grid item xs={12}>
        <Typography
          variant="overline"
          color="inherit"
          className={classes.typography}
        >
          Welcome to your profile, {user.firstName}
        </Typography>
        <Divider variant="middle" />
      </Grid>
      <Grid item xs={12}>
        <Member
          key={user.id}
          image={user.imageUrl}
          firstName={user.firstName}
          lastName={user.lastName}
          description={user.description}
          email={user.email}
        />
      </Grid>
      <Button variant="contained" onClick={() => setEdit(!edit)}>
        Make changes
      </Button>
      <Grid item xs={12}>
        {edit ? <ChangeProfile /> : null}
      </Grid>
    </Grid>
  );
}
