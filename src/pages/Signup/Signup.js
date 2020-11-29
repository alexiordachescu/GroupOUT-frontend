import React, { useState, useEffect } from "react";
import { signUp } from "../../store/user/actions";
import { selectToken } from "../../store/user/selectors";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "@material-ui/core/Button";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const history = useHistory();

  useEffect(() => {
    if (token !== null) {
      history.push("/");
    }
  }, [token, history]);

  function submitForm(event) {
    event.preventDefault();
    console.log("firstname:", firstName);
    console.log("lastName", lastName);
    console.log("descripion", description);
    console.log("image", imageUrl);
    dispatch(
      signUp(firstName, lastName, description, email, password, imageUrl)
    );

    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
    setDescription("");
  }

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "s5ct6hmo");

    const res = await fetch(
      "	https://api.cloudinary.com/v1_1/dmqbltypk/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();
    setImageUrl(file.secure_url);
  };

  const useStyles = makeStyles({
    input: { display: "none" },
    root: { justifyContent: "center", width: "60%" },
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
      {" "}
      <Grid item>
        <Typography variant="overline" className={classes.typography}>
          Sign Up
        </Typography>
      </Grid>
      <Grid container spacing={2} className={classes.root}>
        <Grid item xs={12} sm={6}>
          <TextField
            variant="outlined"
            value={firstName}
            type="text"
            name="firstName"
            label="First Name"
            required
            fullWidth
            onChange={(event) => setFirstName(event.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            value={lastName}
            onChange={(event) => setLastName(event.target.value)}
            type="text"
            label="Last Name"
            name="lastName"
            variant="outlined"
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            variant="outlined"
            label="Enter email"
            fullWidth
            required
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Grid>
        <Grid item xs={12}>
          <TextField
            value={password}
            variant="outlined"
            onChange={(event) => setPassword(event.target.value)}
            type="password"
            label="Password"
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            type="text"
            multiline
            variant="outlined"
            fullWidth
            label="Please describe yourself in a few words"
            required
          />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="overline">
            Choose a representative photo of yourself
          </Typography>
          <input
            type="file"
            name="file"
            className={classes.input}
            onChange={uploadImage}
            id="contained-button-file"
          />{" "}
          <label htmlFor="contained-button-file">
            <Button
              variant="contained"
              color="primary"
              component="span"
              startIcon={<CloudUploadIcon />}
            >
              Upload
            </Button>
          </label>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            type="submit"
            onClick={submitForm}
            endIcon={<ExitToAppIcon />}
          >
            Sign up
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Link to="/login">Click here to log in</Link>
        </Grid>
      </Grid>
    </Grid>
  );
}
