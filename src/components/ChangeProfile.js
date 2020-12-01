import React, { useState } from "react";
import { selectUser } from "../store/user/selectors";
import { useSelector, useDispatch } from "react-redux";
import { changeProfile } from "../store/user/actions";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

export default function ChangeProfile() {
  const profile = useSelector(selectUser);
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState(profile.firstName);
  const [lastName, setLastName] = useState(profile.lastName);
  const [description, setDescription] = useState(profile.description);
  const [email, setEmail] = useState(profile.email);
  const [imageUrl, setImageUrl] = useState(profile.imageUrl);

  function saveChanges(event) {
    event.preventDefault();

    dispatch(changeProfile(firstName, lastName, description, email, imageUrl));
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

  // STYLING:
  const useStyles = makeStyles({
    input: { display: "none" },
    root: { maxWidth: 800, marginTop: "1.5rem" },
  });
  const classes = useStyles();

  return (
    <div>
      <form>
        {" "}
        <Grid container spacing={2} className={classes.root}>
          <Grid item xs={12}>
            <Typography variant="overline">Change profile picture:</Typography>{" "}
            <input
              className={classes.input}
              type="file"
              name="file"
              id="contained-button-file"
              onChange={uploadImage}
            />
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
            <TextField
              label="First name"
              fullWidth
              required
              variant="outlined"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Last name"
              fullWidth
              required
              variant="outlined"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="My description"
              fullWidth
              multiline
              required
              variant="outlined"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="My email address"
              fullWidth
              required
              value={email}
              variant="outlined"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth variant="contained" onClick={saveChanges}>
              Submit changes
            </Button>
          </Grid>
        </Grid>{" "}
      </form>
    </div>
  );
}
