import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  fetchGroupDetails,
  postComment,
} from "../../store/groupDetails/actions";
import { selectGroupDetails } from "../../store/groupDetails/selectors";
import Member from "../../components/Member";
import Comment from "../../components/Comment";
import { selectUser } from "../../store/user/selectors";
import Button from "@material-ui/core/Button";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import SendIcon from "@material-ui/icons/Send";
import TextField from "@material-ui/core/TextField";

export default function GroupDetails() {
  const params = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const [comment, setComment] = useState("");
  useEffect(() => {
    dispatch(fetchGroupDetails(params.id));
  }, [dispatch]);

  const { token } = useSelector(selectUser);
  const groupDetails = useSelector(selectGroupDetails);
  const user = useSelector(selectUser);

  const addComment = () => {
    dispatch(postComment(comment));
  };
  const removeUser = (id, groupId) => {
    dispatch(deleteUser(id, groupId));
  };

  if (token === null) {
    history.push("/");
  }

  /////// STYLING:

  const useStyles = makeStyles({
    root: {
      backgroundColor: "#8EE4AF",
      marginTop: 10,
    },
    spacing: {
      marginBottom: 15,
    },
    mainContainer: {
      width: "50%",
      justifyContent: "center",
      marginTop: "auto",
      marginLeft: "auto",
      marginRight: "auto",
      marginBottom: 100,
    },
    textBox: { width: "60%" },
  });

  const classes = useStyles();
  return (
    <Grid container direction="column" className={classes.mainContainer}>
      {" "}
      <Paper elevation={3} className={classes.root}>
        <Grid container direction="row" justify="space-evenly">
          <Grid item xs={12} className={classes.spacing}>
            <Typography variant="overline" color="inherit">
              Group details:
            </Typography>
          </Grid>
          <img
            src={groupDetails.imageUrl}
            style={{ width: "40%", height: "10%" }}
          ></img>{" "}
        </Grid>
      </Paper>
      <Paper elevation={3} className={classes.root}>
        <Grid container direction="row" justify="space-evenly">
          <Grid item xs={12} className={classes.spacing}>
            <Typography variant="overline" color="inherit">
              Group description
            </Typography>
          </Grid>
          {groupDetails.description}
        </Grid>{" "}
      </Paper>
      <Paper elevation={3} className={classes.root}>
        <Grid container direction="row" justify="space-evenly">
          <Grid item xs={12} className={classes.spacing}>
            <Typography variant="overline" color="inherit">
              Member list
            </Typography>
          </Grid>
          {groupDetails.member
            ? groupDetails.member.map((item) => {
                return (
                  <div>
                    <Member
                      key={item.id}
                      firstName={item.firstName}
                      description={item.description}
                      image={item.imageUrl}
                    />{" "}
                    {groupDetails.userId === user.id ? (
                      <Button
                        variant="contained"
                        color="secondary"
                        startIcon={<DeleteForeverIcon />}
                        onClick={() => removeUser(item.id, groupDetails.id)}
                      >
                        Remove user
                      </Button>
                    ) : null}
                  </div>
                );
              })
            : "loading...."}
        </Grid>
      </Paper>{" "}
      <Paper elevation={3} className={classes.root}>
        <Grid container direction="row" justify="space-evenly">
          <Grid item xs={12} className={classes.spacing}>
            <Typography variant="overline" color="inherit">
              Discussion:
            </Typography>{" "}
          </Grid>
          <Grid item xs={7} className={classes.spacing}>
            {groupDetails.groupComments && groupDetails.groupComments.length > 0
              ? groupDetails.groupComments.map((item) => {
                  return (
                    <Comment
                      key={item.id}
                      comment={item.comment}
                      name={item.user.firstName}
                    />
                  );
                })
              : "Sorry, no comments yet!"}
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-multiline-flexible"
              label="Type something..."
              multiline
              variant="outlined"
              value={comment}
              className={classes.textBox}
              onChange={(e) => setComment(e.target.value)}
            />
          </Grid>
          <Button
            color="primary"
            variant="contained"
            endIcon={<SendIcon />}
            onClick={addComment}
          >
            Add comment!
          </Button>
        </Grid>{" "}
      </Paper>
    </Grid>
  );
}
