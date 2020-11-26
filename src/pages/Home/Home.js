import userEvent from "@testing-library/user-event";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Group from "../../components/Group";
import { fetchGroups, joinGroup } from "../../store/group/actions";
import { selectGroups } from "../../store/group/selectors";
import { selectUser } from "../../store/user/selectors";

export default function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchGroups());
  }, [dispatch]);

  const onJoinGroup = (id) => {
    console.log(id);
    dispatch(joinGroup(id));
  };
  const group = useSelector(selectGroups);
  const user = useSelector(selectUser);

  return (
    <div>
      <h2>Browse groups</h2>
      {group.map((item) => {
        return (
          <div>
            <Group
              key={item.id}
              description={item.description}
              date={item.date}
              size={item.member.length}
              maxSize={item.maxUsers}
              tags={item.tags.map((i) => i.name)}
            />
            {user.id && !item.member.map((i) => i.id).includes(user.id) ? (
              <button onClick={() => onJoinGroup(item.id)}>Join group</button>
            ) : item.member.map((i) => i.id).includes(user.id) ? (
              <p style={{ fontWeight: "bold" }}>You're already a member!</p>
            ) : (
              <Link to={`/login`}>
                <button>Please login to join this group</button>{" "}
              </Link>
            )}
          </div>
        );
      })}
    </div>
  );
}
