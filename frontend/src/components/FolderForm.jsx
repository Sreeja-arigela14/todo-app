import { useState } from "react";

function FolderForm({ onAddFolder }) {

  const [name, setName] = useState("");

  const submit = (e) => {

    e.preventDefault();

    if (!name.trim()) return;

    onAddFolder({
      name
    });

    setName("");
  };

  return (
    <form onSubmit={submit}>

      <h3>Create Folder</h3>

      <input
        type="text"
        placeholder="Folder Name"
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
      />

      <button type="submit">
        Create Folder
      </button>

    </form>
  );
}

export default FolderForm;