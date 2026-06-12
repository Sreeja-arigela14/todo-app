import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../api/axios";

function FolderPage() {

  const { folderId } = useParams();

  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {

    try {

      const token =
        localStorage.getItem("access");

      const res = await API.get(
        "/todos/",
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

      const filtered =
        res.data.filter(
          (todo) =>
            Number(todo.folder) ===
            Number(folderId)
        );

      setTodos(filtered);

    } catch (error) {

      console.log(error);

    }
  };

  useEffect(() => {

    fetchTodos();

  }, [folderId]);

  const toggleTodo = async (todo) => {

    try {

      const token =
        localStorage.getItem("access");

      await API.put(
        `/todos/${todo.id}/`,
        {
          ...todo,
          completed:
            !todo.completed
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

      fetchTodos();

    } catch (error) {

      console.log(error);

    }
  };

  const deleteTodo = async (id) => {

    try {

      const token =
        localStorage.getItem("access");

      await API.delete(
        `/todos/${id}/`,
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      );

      fetchTodos();

    } catch (error) {

      console.log(error);

    }
  };

 const editTodo = async (todo) => {

  const newDescription = prompt(
    "Edit Description",
    todo.description
  );

  if (newDescription === null) {
    return;
  }

  try {

    const token =
      localStorage.getItem("access");

    await API.put(
      `/todos/${todo.id}/`,
      {
        title: todo.title,
        description: newDescription,
        folder: todo.folder,
        deadline: todo.deadline,
        completed: todo.completed
      },
      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    );

    fetchTodos();

  } catch (error) {

    console.log(error.response?.data);

  }
};

  return (

    <div className="container">

      <Link
        to="/dashboard"
      >
        ← Back To Dashboard
      </Link>

      <h1>
        📁 Folder Tasks
      </h1>

      {
        todos.length === 0 ? (

          <h3>
            No tasks found
          </h3>

        ) : (

          <div className="todo-grid">

            {
              todos.map((todo) => (

                <div
                  key={todo.id}
                  className="todo-card"
                >

                  <div className="todo-header">

                    <input
                      type="checkbox"
                      checked={
                        todo.completed
                      }
                      onChange={() =>
                        toggleTodo(todo)
                      }
                    />

                    <h2
                      className={
                        todo.completed
                          ? "completed-task"
                          : ""
                      }
                    >
                      {todo.title}
                    </h2>

                  </div>

                  <p>
                    {todo.description}
                  </p>
                  <br/>
                  {
  todo.attachment && (

    <a
      href={
        `http://127.0.0.1:8000${todo.attachment}`
      }
      target="_blank"
    >
      📎 Open Attachment
    </a>

  )
}
                  <p>
                    📅 Created:
                    {" "}
                    {
                      new Date(
                        todo.created_at
                      ).toLocaleDateString()
                    }
                  </p>

                  <p>
                    ⏰ Deadline:
                    {" "}
                    {
                      todo.deadline
                        ? todo.deadline
                        : "Not Set"
                    }
                  </p>

                  <p>
                    Status:
                    {" "}
                    {
                      todo.completed
                        ? "✅ Completed"
                        : "⏳ Pending"
                    }
                  </p>

                  <div className="task-actions">

                    <button
                      onClick={() =>
                        editTodo(todo)
                      }
                    >
                      ✏️ Edit
                    </button>

                    <button
                      onClick={() =>
                        deleteTodo(todo.id)
                      }
                    >
                      🗑 Delete
                    </button>

                  </div>

                </div>

              ))
            }

          </div>

        )
      }

    </div>

  );
}

export default FolderPage;