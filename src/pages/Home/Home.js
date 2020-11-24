import userEvent from "@testing-library/user-event";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Group from "../../components/Group";
import { fetchGroups } from "../../store/group/actions";
import { selectGroups } from "../../store/group/selectors";

export default function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchGroups());
  }, [dispatch]);

  const group = useSelector(selectGroups);
  console.log("What is group", group);
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
            <button>Join group</button>
          </div>
        );
      })}
    </div>
  );
}
