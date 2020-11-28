import userEvent from "@testing-library/user-event";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Group from "../../components/Group";
import { fetchGroups, joinGroup } from "../../store/group/actions";
import { selectGroups } from "../../store/group/selectors";
import { selectUser } from "../../store/user/selectors";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

export default function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchGroups());
  }, [dispatch]);

  const onJoinGroup = (id) => {
    dispatch(joinGroup(id));
  };
  const group = useSelector(selectGroups);
  const user = useSelector(selectUser);

  return (
    <div>
      <h2>Browse groups</h2>
      <Grid container>
        <Grid item xs={2}>
          <h2>Filters</h2>
          <p>Element</p>
          <p>Element</p>
          <p>Element</p>
          <p>Element</p>
          <p>Element</p>
          <p>Element</p>
        </Grid>

        <Grid item xs={10} container spacing={8}>
          {group.map((item) => {
            return (
              <Grid item>
                <Group
                  key={item.id}
                  image={item.imageUrl}
                  description={item.description}
                  date={item.date}
                  size={item.member.length}
                  maxSize={item.maxUsers}
                  tags={item.tags}
                />

                {user.id && !item.member.map((i) => i.id).includes(user.id) ? (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => onJoinGroup(item.id)}
                  >
                    Join group
                  </Button>
                ) : item.member.map((i) => i.id).includes(user.id) ? (
                  <Button variant="contained" disabled>
                    You're already a member!
                  </Button>
                ) : (
                  <Link to={`/login`}>
                    <Button variant="contained" color="primary">
                      Please login to join this group
                    </Button>{" "}
                  </Link>
                )}
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </div>
  );
}
