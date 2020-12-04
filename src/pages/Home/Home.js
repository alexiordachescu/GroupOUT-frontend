import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Group from "../../components/Group";
import { fetchGroups, joinGroup } from "../../store/group/actions";
import { selectGroupsWithFilters } from "../../store/group/selectors";
import { selectUser } from "../../store/user/selectors";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import { selectTags } from "../../store/tags/selectors";
import FormLabel from "@material-ui/core/FormLabel";
import FormGroup from "@material-ui/core/FormGroup";
import {
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import Checkbox from "@material-ui/core/Checkbox";
import Paper from "@material-ui/core/Paper";
import { fetchTags } from "../../store/tags/actions";

export default function Home() {
  const user = useSelector(selectUser);
  const filterTags = useSelector(selectTags);
  const { push } = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchGroups());
  }, [push]);
  useEffect(() => {
    dispatch(fetchGroups());
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchTags());
  }, [dispatch]);

  const onJoinGroup = (id) => {
    dispatch(joinGroup(id));
  };
  const [sortedField, setSortedField] = useState("");
  const [filters, setFilters] = useState({
    tags: [],
    groupSize: [],
  });

  const groupsWithSelectedTags = useSelector(selectGroupsWithFilters(filters));

  const handleChange = (event) => {
    let selectedTag = event.target.name;
    let newList;
    if (filters.tags.includes(selectedTag)) {
      newList = filters.tags.filter((tag) => tag !== selectedTag);
    } else {
      newList = [...filters.tags, selectedTag];
    }
    setFilters({
      ...filters,
      tags: newList,
    });
  };

  const sizeFilter = (event) => {
    let selectedSize = event.target.value;
    let newList;
    if (filters.groupSize.includes(selectedSize)) {
      newList = filters.groupSize.filter((i) => i !== selectedSize);
    } else {
      newList = [...filters.groupSize, selectedSize];
    }

    setFilters({
      ...filters,
      groupSize: newList,
    });
  };

  const sortBySizeAsc = (a, b) => {
    if (a.maxUsers < b.maxUsers) {
      return -1;
    }
    if (a.maxUsers > b.maxUsers) {
      return 1;
    }
    return 0;
  };
  const sortBySizeDesc = (a, b) => {
    if (a.maxUsers < b.maxUsers) {
      return 1;
    }
    if (a.maxUsers > b.maxUsers) {
      return -1;
    }
    return 0;
  };
  const sortByDate = (a, b) => {
    if (a.date < b.date) {
      return 1;
    }
    if (a.date > b.date) {
      return -1;
    }
    return 0;
  };

  const sortByCreationDate = (a, b) => {
    if (a.createdAt < b.createdAt) {
      return 1;
    }
    if (a.createdAt > b.createdAt) {
      return -1;
    }
    return 0;
  };

  // STYLING:
  const useStyles = makeStyles({
    typography: { fontSize: 25 },
    spacing: { marginTop: 10 },
    margin: { marginTop: 10 },
    sortBy: { minWidth: 150 },
  });
  const classes = useStyles();

  if (sortedField === "SizeASC") {
    groupsWithSelectedTags.sort(sortBySizeAsc);
  } else if (sortedField === "Created") {
    groupsWithSelectedTags.sort(sortByCreationDate);
  } else if (sortedField === "SizeDESC") {
    groupsWithSelectedTags.sort(sortBySizeDesc);
  } else if (sortedField === "Date") {
    groupsWithSelectedTags.sort(sortByDate);
  }

  return (
    <div>
      <Grid item xs={12}>
        <Typography
          variant="overline"
          color="inherit"
          className={classes.typography}
        >
          Browse groups
        </Typography>
      </Grid>
      <Grid container className={classes.spacing}>
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
        <Grid item xs={10} container spacing={6} justify="center">
          <Grid
            item
            container
            direction="row"
            justify="flex-start"
            alignItems="flex-start"
            xs={12}
          >
            {" "}
            <Paper>
              <FormControl className={classes.sortBy}>
                <InputLabel shrink>Sort by:</InputLabel>
                <Select
                  value={sortedField}
                  displayEmpty
                  onChange={(event) => setSortedField(event.target.value)}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="Created">Recently added</MenuItem>
                  <MenuItem value="Date">OUTgoing date</MenuItem>
                  <MenuItem value="SizeASC">Group size (Asc)</MenuItem>
                  <MenuItem value="SizeDESC">Group size (Desc)</MenuItem>
                </Select>
              </FormControl>
            </Paper>
          </Grid>
          {groupsWithSelectedTags.map((item) => {
            return (
              <Grid item>
                {" "}
                <Group
                  key={item.id}
                  image={item.imageUrl}
                  description={item.description}
                  date={item.date}
                  size={item.member.length}
                  maxSize={item.maxUsers}
                  tags={item.tags}
                />
                <Grid item className={classes.margin}>
                  {user.id &&
                  !item.member.map((i) => i.id).includes(user.id) ? (
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
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </div>
  );
}
