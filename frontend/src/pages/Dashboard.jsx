import { useEffect, useState } from "react";

import API from "../api/axios";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import TodoForm from "../components/TodoForm";
import FolderForm from "../components/FolderForm";
function Dashboard() {

  const [todos, setTodos] = useState([]);
  const [folders, setFolders] =
  useState([]);
  const token =
    localStorage.getItem("access");

  const headers = {
    Authorization: `Bearer ${token}`
  };

  const totalTasks = todos.length;

  const completedTasks = todos.filter(
    todo => todo.completed
  ).length;

  const pendingTasks =
    totalTasks - completedTasks;

  const groupedTodos = {};

  todos.forEach((todo) => {

    const folder =
      todo.folder_name || "No Folder";

    if (!groupedTodos[folder]) {
      groupedTodos[folder] = [];
    }

    groupedTodos[folder].push(todo);

  });
  const fetchFolders = async () => {

  const res = await API.get(
    "/todos/folders/",
    { headers }
  );

  setFolders(res.data);
};
  const fetchTodos = async () => {

    try {

      const res = await API.get(
        "/todos/",
        { headers }
      );

      setTodos(res.data);

    } catch (error) {

      console.log(error);

    }
  };

  useEffect(() => {
    fetchTodos();
    fetchFolders();
  }, []);

  const addTodo = async (todo) => {

  try {

    const res = await API.post(
      "/todos/",
      todo,
      {
        headers: {
          ...headers,
          "Content-Type":
            "multipart/form-data"
        }
      }
    );

    console.log(
      "Success:",
      res.data
    );

    fetchTodos();

  } catch (error) {

    console.log(
      "Error:",
      error.response?.data
    );

  }

};
const addFolder = async (folder) => {

  try {

    const res = await API.post(
  "/todos/",
  todo,
  {
    headers:{
      ...headers,
      "Content-Type":
      "multipart/form-data"
    }
  }
);

    window.location.reload();

  } catch (error) {

    console.log(
      error.response?.data
    );

  }
};
const deleteFolder = async (id) => {

  if (
    !window.confirm(
      "Delete this folder?"
    )
  ) {
    return;
  }

  try {

    await API.delete(
      `/todos/folders/${id}/`,
      { headers }
    );

    fetchFolders();

  } catch (error) {

    console.log(error);

  }

};
  const deleteTodo = async (id) => {

    try {

      await API.delete(
        `/todos/${id}/`,
        { headers }
      );

      fetchTodos();

    } catch (error) {

      console.log(
        error.response?.data
      );

    }
  };

  const toggleTodo = async (todo) => {

    try {

      await API.put(
        `/todos/${todo.id}/`,
        {
          ...todo,
          completed:
            !todo.completed
        },
        { headers }
      );

      fetchTodos();

    } catch (error) {

      console.log(
        error.response?.data
      );

    }
  };

return (
  <div>

    <Navbar />

    <div className="container">

      <h1>
        📋 My Todo Dashboard
      </h1>

      <div className="stats">

        <div className="stat-card">
          <h3>Total</h3>
          <p>{totalTasks}</p>
        </div>

        <div className="stat-card">
          <h3>Completed</h3>
          <p>{completedTasks}</p>
        </div>

        <div className="stat-card">
          <h3>Pending</h3>
          <p>{pendingTasks}</p>
        </div>

      </div>

      <FolderForm
        onAddFolder={addFolder}
      />

      <TodoForm
        onAdd={addTodo}
      />
<div className="folder-grid">

  {
    folders.map((folder) => (

      <div
        key={folder.id}
        className="folder-card-container"
      >

        <button
          className="folder-delete-btn"
          onClick={() =>
            deleteFolder(folder.id)
          }
        >
          🗑
        </button>

        <Link
          to={`/folder/${folder.id}`}
          className="folder-card"
        >
          📁 {folder.name}
        </Link>

      </div>

    ))
  }

</div>

    </div>

  </div>
);
}

export default Dashboard;