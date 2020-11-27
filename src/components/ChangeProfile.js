import React, { useState } from "react";
import { selectUser } from "../store/user/selectors";
import { useSelector, useDispatch } from "react-redux";
import { changeProfile } from "../store/user/actions";

export default function ChangeProfile() {
  const profile = useSelector(selectUser);
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState(profile.firstName);
  const [lastName, setLastName] = useState(profile.lastName);
  const [description, setDescription] = useState(profile.description);
  const [email, setEmail] = useState(profile.email);
  const [imageUrl, setImageUrl] = useState("");

  function saveChanges(event) {
    event.preventDefault();

    dispatch(changeProfile(firstName, lastName, description, email, imageUrl));
  }

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "s5ct6hmo");

    const res = await fetch(
      "	https://api.cloudinary.com/v1_1/dmqbltypk/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();
    setImageUrl(file.secure_url);
  };

  return (
    <div>
      Edit profile
      <form id="userform">
        <div>
          <label>
            Change profile picture:
            <input type="file" name="file" onChange={uploadImage} />
          </label>
        </div>
        <label>
          First Name:
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          ></input>
        </label>
        <div>
          <label>
            Last Name:
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            ></input>
          </label>
        </div>
        <div>
          <label>
            Description:
            <textarea
              style={{ height: "200px" }}
              form="userform"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </label>
        </div>
        <div>
          <label>
            Email:{" "}
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </label>
        </div>
        <button onClick={saveChanges}>Save changes</button>
      </form>
    </div>
  );
}
