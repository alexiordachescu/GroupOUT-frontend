import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createGroup } from "../store/group/actions";
import { fetchTags } from "../store/tags/actions";
import { selectTags } from "../store/tags/selectors";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Typography from "@material-ui/core/Typography";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";

export default function CreateGroupForm() {
  const tagsList = useSelector(selectTags);
  let today = new Date();
  const date2 =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  const [imageUrl, setImageUrl] = useState("");
  const [date, setDate] = useState(date2);
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState([]);
  const [groupSize, setGroupSize] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTags());
  }, [dispatch]);

  function postGroup(event) {
    event.preventDefault();
    console.log("description", description);
    console.log("tags", tags);
    dispatch(createGroup(imageUrl, date, description, tags, groupSize));
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
    root: { maxWidth: 800 },
  });
  const classes = useStyles();

  return (
    <div>
      <div>
        <Grid container spacing={2} className={classes.root}>
          <Grid item xs={12}>
            <Typography variant="overline">
              Choose a representative photo for your group
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
          </Grid>{" "}
          <Grid item xs={12}>
            <TextField
              id="date"
              label="Please indicate an outgoing date for your group"
              type="date"
              fullWidth
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl variant="outlined" fullWidth required>
              <InputLabel>Relevant tags for your outing: </InputLabel>
              <Select
                multiple
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              >
                {tagsList.map((i) => {
                  return (
                    <MenuItem key={i.id} value={i.id}>
                      {i.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-multiline-flexible"
              label="Please write a short description of your group so other OUTers can
              better match you :"
              multiline
              fullWidth
              required
              variant="outlined"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></TextField>
          </Grid>
          <Grid item xs={12}>
            <FormControl variant="outlined" fullWidth required>
              <InputLabel>
                Please indicate the maximum number of members for this group
              </InputLabel>
              <Select
                value={groupSize}
                onChange={(e) => setGroupSize(e.target.value)}
              >
                {/* <MenuItem value="">
                  <em>None</em>{" "}
                </MenuItem> */}
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={6}>6</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth variant="contained" onClick={postGroup}>
              Create this group!
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
