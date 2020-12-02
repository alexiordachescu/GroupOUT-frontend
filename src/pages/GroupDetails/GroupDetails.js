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
import CardMedia from "@material-ui/core/CardMedia";
import Divider from "@material-ui/core/Divider";

export default function GroupDetails() {
  const params = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  const [comment, setComment] = useState("");
  useEffect(() => {
    dispatch(fetchGroupDetails(params.id));
  }, [dispatch]); // eslint-disable-line react-hooks/exhaustive-deps

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
      backgroundColor: "rgb(197,196,233)",
      marginTop: 10,
    },
    spacing: {
      marginBottom: 0,
    },
    mainContainer: {
      width: "50%",
      justifyContent: "center",
      marginTop: "auto",
      marginLeft: "auto",
      marginRight: "auto",
      marginBottom: 50,
    },
    elementHeader: { fontSize: "1rem" },
    textBox: { width: "60%" },
    comments: { marginTop: 3, fontSize: "1.2rem" },
    image: {
      width: "100%",
      backgroundSize: "contain",
      height: 550,
      boxShadow:
        "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    },
  });

  const classes = useStyles();
  return (
    <Grid container direction="column" className={classes.mainContainer}>
      {" "}
      <Paper elevation={3} className={classes.root}>
        <Grid container direction="row" justify="space-evenly">
          <Grid item xs={12} className={classes.spacing}>
            <Typography
              variant="overline"
              color="inherit"
              className={classes.elementHeader}
            >
              Group details:
            </Typography>
          </Grid>
          <Grid item xs={12} container justify="center">
            <CardMedia
              image={groupDetails.imageUrl}
              className={classes.image}
            />
          </Grid>
        </Grid>
      </Paper>
      <Paper elevation={3} className={classes.root}>
        <Grid container direction="row" justify="space-evenly">
          <Grid item xs={12} className={classes.spacing}>
            <Typography
              variant="overline"
              color="inherit"
              className={classes.elementHeader}
            >
              Group description
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              variant="overline"
              color="inherit"
              style={{ fontWeight: "bold" }}
            >
              {groupDetails.description}
            </Typography>
          </Grid>
        </Grid>{" "}
      </Paper>
      <Paper elevation={3} className={classes.root}>
        <Grid container direction="row" justify="space-evenly">
          <Grid item xs={12} className={classes.spacing}>
            <Typography
              variant="overline"
              color="inherit"
              className={classes.elementHeader}
            >
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
            <Typography
              variant="overline"
              color="inherit"
              className={classes.elementHeader}
            >
              Discussion:
            </Typography>{" "}
          </Grid>
          <Grid item xs={7} className={classes.spacing}>
            {groupDetails.groupComments && groupDetails.groupComments.length > 0
              ? groupDetails.groupComments.map((item) => {
                  return (
                    <Grid item className={classes.comments}>
                      <Comment
                        key={item.id}
                        comment={item.comment}
                        name={item.user.firstName}
                        date={item.createdAt}
                      />
                      <Divider />
                    </Grid>
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
          </Grid>{" "}
          <Grid item xs={12}>
            <Button
              color="primary"
              variant="contained"
              endIcon={<SendIcon />}
              onClick={addComment}
            >
              Add comment!
            </Button>
          </Grid>
        </Grid>{" "}
      </Paper>
    </Grid>
  );
}
