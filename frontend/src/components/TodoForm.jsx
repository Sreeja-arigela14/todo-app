import { useState, useEffect } from "react";
import API from "../api/axios";

function TodoForm({ onAdd }) {
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [attachment,setAttachment] = useState(null);
  const [folders, setFolders] = useState([]);
  const [folder, setFolder] = useState("");

  useEffect(() => {

    const fetchFolders = async () => {

      const token =
        localStorage.getItem("access");

      const res = await API.get(
        "/todos/folders/",
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );
      console.log("Folders:", res.data);
      setFolders(res.data);

      if (res.data.length > 0) {
        setFolder(res.data[0].id);
      }
    };

    fetchFolders();

  }, []);

  const submit = (e) => {

  e.preventDefault();

  const formData = new FormData();

formData.append(
  "title",
  title
);

formData.append(
  "description",
  description
);

formData.append(
  "folder",
  folder
);

formData.append(
  "deadline",
  deadline
);

if(attachment){

  formData.append(
    "attachment",
    attachment
  );

}

onAdd(formData);

  setMessage(
    "✅ Todo Created Successfully"
  );

  setTitle("");
  setDescription("");
  setDeadline("");
  setAttachment(null);
  setTimeout(() => {

    setMessage("");

  }, 3000);

};

  return (
    <form onSubmit={submit}>
      {
  message && (
    <p className="success-message">
      {message}
    </p>
  )
}
      <h2>Add New Task</h2>

      <input
        type="text"
        placeholder="Title" required
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
      />

      <br /><br />

      <textarea
        placeholder="Description" required
        value={description}
        onChange={(e) =>
          setDescription(e.target.value)
        }
      />

      <br /><br />

      <select
  value={folder}
  onChange={(e) =>
    setFolder(e.target.value)
  }
  required
>
  <option value="">
    Select Folder
  </option>

  {folders.map((folder) => (
    <option
      key={folder.id}
      value={folder.id}
    >
      {folder.name}
    </option>
  ))}
</select>

      <br /><br />

      <input
        type="date"
        value={deadline}
        onChange={(e) =>
          setDeadline(e.target.value)
        }
      />

      <br /><br />
      <input
  type="file"
  onChange={(e) =>
    setAttachment(
      e.target.files[0]
    )
  }
/>
<br/><br/>
      <button type="submit">
        Add Todo
      </button>

    </form>
  );
}

export default TodoForm;