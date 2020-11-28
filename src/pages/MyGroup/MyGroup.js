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
    history.push("/");
  }

  return (
    <div>
      <h1>Groups managed by me:</h1>
      {admin.length === 0 ? (
        <p>
          Please use the "Create Group" feature to create a new group and meet
          cool people!
        </p>
      ) : admin ? (
        admin.map((item) => {
          return (
            <div>
              <Group
                key={item.id}
                description={item.description}
                date={item.date}
                size={item.member.length}
                maxSize={item.maxUsers}
                image={item.imageUrl}
                tags={item.tags}
              />
              <Link to={`/group/${item.id}`}>
                <button>Show details</button>{" "}
              </Link>
            </div>
          );
        })
      ) : (
        "loading...."
      )}

      <h1>Groups I'm into:</h1>
      {member
        ? member.map((item) => {
            return (
              <div>
                <Group
                  key={item.id}
                  description={item.description}
                  date={item.date}
                  size={item.member.length}
                  maxSize={item.maxUsers}
                  image={item.imageUrl}
                  tags={item.tags}
                />{" "}
                <Link to={`/group/${item.id}`}>
                  <button>Show details</button>
                </Link>
              </div>
            );
          })
        : "loading...."}
    </div>
  );
}
