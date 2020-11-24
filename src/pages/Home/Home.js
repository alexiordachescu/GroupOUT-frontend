import userEvent from "@testing-library/user-event";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Group from "../../components/Group";
import { fetchGroups } from "../../store/group/actions";
import { selectGroups } from "../../store/group/selectors";
import { selectUser } from "../../store/user/selectors";

export default function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchGroups());
  }, [dispatch]);

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
            {user.id ? (
              <button>Join group</button>
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
