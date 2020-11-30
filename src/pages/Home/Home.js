import userEvent from "@testing-library/user-event";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Group from "../../components/Group";
import { fetchGroups, joinGroup } from "../../store/group/actions";
import {
  selectGroups,
  selectGroupsWithFilters,
  selectGroupsWithTags,
} from "../../store/group/selectors";
import { selectUser } from "../../store/user/selectors";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import { selectTags } from "../../store/tags/selectors";
import FormLabel from "@material-ui/core/FormLabel";
import FormGroup from "@material-ui/core/FormGroup";
import { FormControlLabel } from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import Paper from "@material-ui/core/Paper";
import { fetchTags } from "../../store/tags/actions";

export default function Home() {
  const group = useSelector(selectGroups);
  const user = useSelector(selectUser);
  const filterTags = useSelector(selectTags);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchGroups());
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchTags());
  }, [dispatch]);

  const onJoinGroup = (id) => {
    dispatch(joinGroup(id));
  };

  const [filters, setFilters] = useState({
    tags: [
      "Walk",
      "Dance",
      "Music",
      "Sports",
      "Drinks",
      "Photography",
      "Coffee",
      "Shopping",
      "Cycling",
      "Travel",
      "Dating",
      "Culture",
    ],
    groupSize: [3, 4, 5],
  });

  const groupsWithSelectedTags = useSelector(selectGroupsWithFilters(filters));

  const tags = filterTags.map((i) => i.name);
  const existingGroupsSize = group.map((i) => i.maxUsers);

  const handleChange = (event) => {
    let selectedTag = event.target.name;
    const newList = tags.filter((i) => i == selectedTag);
    setFilters({ tags: newList });
  };

  const sizeFilter = (event) => {
    const selectedSize = event.target.value;
    const newList = existingGroupsSize.filter((i) => i >= selectedSize);
    setFilters({ groupSize: newList });
  };

  // STYLING:

  const useStyles = makeStyles({
    typography: { fontSize: 25 },
    spacing: { marginTop: 10 },
  });
  const classes = useStyles();

  return (
    <div>
      <Typography
        variant="overline"
        color="inherit"
        className={classes.typography}
      >
        Browse groups
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={2}>
          <Paper elevation={3}>
            <FormLabel>Tags</FormLabel>
            <FormGroup>
              {filterTags.map((tag) => {
                return (
                  <FormControlLabel
                    control={
                      <Checkbox onChange={handleChange} name={tag.name} />
                    }
                    label={tag.name}
                  />
                );
              })}
            </FormGroup>
          </Paper>

          <Paper elevation={3} className={classes.spacing}>
            <FormLabel>Group size:</FormLabel>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox onChange={sizeFilter} value={3} />}
                label="At least 3 members"
              />
              <FormControlLabel
                control={<Checkbox onChange={sizeFilter} value={4} />}
                label="At least 4 members"
              />
              <FormControlLabel
                control={<Checkbox onChange={sizeFilter} value={5} />}
                label="At least 5 members"
              />
            </FormGroup>
          </Paper>
        </Grid>
        <Divider orientation="vertical" flexItem />
        <Grid item xs={10} container spacing={8}>
          {groupsWithSelectedTags.map((item) => {
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
