import React, { useState } from "react";

export default function CreateGroupForm() {
  let today = new Date();
  const date2 =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  const [imageUrl, setImageUrl] = useState("");
  const [date, setDate] = useState(date2);
  const [tags, setTags] = useState(null);
  const [description, setDescription] = useState("");
  const [groupSize, setGroupSize] = useState(2);

  function postGroup(event) {
    event.preventDefault();
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
      New group form
      <div>
        <form id="userform">
          <div>
            <label>
              Please choose a representative photo for your group:
              <input type="file" name="file" onChange={uploadImage} />
            </label>
          </div>
          <label>
            Please indicate an outgoing date:
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            ></input>
          </label>
          <div>
            <label>
              Relevant tags for your outing:
              <select
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              ></select>
            </label>
          </div>
          <div>
            <label>
              Please write a short description of your group so other OUTers can
              better match you :
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
              Please indicate the maximum group size:
              <select
                value={groupSize}
                onChange={(e) => setGroupSize(e.target.value)}
              >
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
                <option>6</option>
              </select>
            </label>
          </div>
          <button onClick={postGroup}>Create this group!</button>
        </form>
      </div>
    </div>
  );
}
