import React, { useState, useEffect } from "react";
import { login } from "../../store/user/actions";
import { selectToken } from "../../store/user/selectors";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const history = useHistory();

  useEffect(() => {
    if (token !== null) {
      history.push("/explore");
    }
  }, [token, history]);

  function submitForm(event) {
    event.preventDefault();

    dispatch(login(email, password));

    setEmail("");
    setPassword("");
  }

  const useStyles = makeStyles({
    input: { display: "none" },
    root: { width: "20%" },
    typography: { fontSize: 25 },
  });
  const classes = useStyles();

  return (
    <Grid
      container
      direction="column"
      justify="space-between"
      alignItems="center"
    >
      <Grid item xs={12}>
        <Typography
          variant="overline"
          color="inherit"
          className={classes.typography}
        >
          Login
        </Typography>
      </Grid>
      <Grid container spacing={2} className={classes.root}>
        <Grid item xs={12}>
          <TextField
            value={email}
            required
            fullWidth
            variant="outlined"
            onChange={(event) => setEmail(event.target.value)}
            label="Enter email"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            fullWidth
            variant="outlined"
            label="Password"
            required
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" type="submit" onClick={submitForm}>
            Log in
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Link to="/signup" style={{ textAlign: "center" }}>
            Click here to sign up
          </Link>
        </Grid>
      </Grid>
    </Grid>
  );
}
