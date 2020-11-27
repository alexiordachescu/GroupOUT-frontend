import React from "react";
import { selectUser } from "../../store/user/selectors";
import { useSelector } from "react-redux";
import Member from "../../components/Member";

export default function MyProfile() {
  const user = useSelector(selectUser);
  console.log(user);
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
    </div>
  );
}
