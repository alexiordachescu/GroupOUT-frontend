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
                tags={item.tags.map((i) => i.name)}
              />
              <button>Show details</button>
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
                  tags={item.tags.map((i) => i.name)}
                />
                <button>Show details</button>
              </div>
            );
          })
        : "loading...."}
    </div>
  );
}
