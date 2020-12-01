import React, { useEffect } from "react";
import {
  fetchAdminGroups,
  fetchMemberGroups,
} from "../../store/userGroups/actions";
import { useDispatch, useSelector } from "react-redux";
import Group from "../../components/Group";
import {
  selectAdminGroups,
  selectMemberGroups,
} from "../../store/userGroups/selectors";
import { Link, useHistory } from "react-router-dom";
import { selectUser } from "../../store/user/selectors";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";

export default function MyGroup() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAdminGroups());
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchMemberGroups());
  }, [dispatch]);

  const admin = useSelector(selectAdminGroups);
  const member = useSelector(selectMemberGroups);
  const { token } = useSelector(selectUser);

  const history = useHistory();
  if (token === null) {
    history.push("/explore");
  }

  // STYLING:
  const useStyles = makeStyles({
    typography: { fontSize: 25 },
    margin: { marginTop: 10 },
  });

  const classes = useStyles();

  return (
    <div>
      <Grid item xs={12}>
        <Typography
          variant="overline"
          color="inherit"
          className={classes.typography}
        >
          Groups managed by me:
        </Typography>
      </Grid>

      <Grid container>
        <Grid item xs={12} container spacing={5} justify="center">
          {admin.length === 0 ? (
            <p>
              Please use the "Create Group" feature to create a new group and
              meet cool people!
            </p>
          ) : admin ? (
            admin.map((item) => {
              return (
                <Grid item>
                  <Group
                    key={item.id}
                    description={item.description}
                    date={item.date}
                    size={item.member.length}
                    maxSize={item.maxUsers}
                    image={item.imageUrl}
                    tags={item.tags}
                  />
                  <Grid item className={classes.margin}>
                    <Link to={`/group/${item.id}`}>
                      <Button variant="contained" color="primary">
                        Show details
                      </Button>
                    </Link>
                  </Grid>
                </Grid>
              );
            })
          ) : (
            "loading...."
          )}
        </Grid>{" "}
        <Grid item xs={12}>
          <Divider variant="middle" />
          <Typography
            variant="overline"
            color="inherit"
            className={classes.typography}
          >
            Groups I'm into:
          </Typography>
        </Grid>
        <Grid item container xs={12} spacing={5} justify="center">
          {member
            ? member.map((item) => {
                return (
                  <Grid item>
                    <Group
                      key={item.id}
                      description={item.description}
                      date={item.date}
                      size={item.member.length}
                      maxSize={item.maxUsers}
                      image={item.imageUrl}
                      tags={item.tags}
                    />{" "}
                    <Grid item className={classes.margin}>
                      <Link to={`/group/${item.id}`}>
                        <Button variant="contained" color="primary">
                          Show details
                        </Button>
                      </Link>{" "}
                    </Grid>
                  </Grid>
                );
              })
            : "loading...."}
        </Grid>
      </Grid>
    </div>
  );
}
