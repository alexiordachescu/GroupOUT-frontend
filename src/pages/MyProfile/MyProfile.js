import React, { useState } from "react";
import { selectUser } from "../../store/user/selectors";
import { useSelector } from "react-redux";
import Member from "../../components/Member";
import ChangeProfile from "../../components/ChangeProfile";
import { useHistory } from "react-router-dom";

export default function MyProfile() {
  const user = useSelector(selectUser);
  const [edit, setEdit] = useState(false);
  const { token } = useSelector(selectUser);
  const history = useHistory();
  if (token === null) {
    history.push("/");
  }

  return (
    <div>
      <h1>Welcome to your profile, {user.firstName}</h1>
      <Member
        key={user.id}
        image={user.imageUrl}
        firstName={user.firstName}
        lastName={user.lastName}
        description={user.description}
        email={user.email}
      />
      <button onClick={() => setEdit(!edit)}>Make changes</button>
      {edit ? <ChangeProfile /> : null}
    </div>
  );
}
