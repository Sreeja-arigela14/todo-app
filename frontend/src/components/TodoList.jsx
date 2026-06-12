// src/components/TodoList.jsx

function TodoList({
  todos,
  onDelete,
  onToggle
}) {

  return (
    <div>

      {todos.map(todo => (

        <div
          key={todo.id}
        >

          <h3>
            {todo.title}
          </h3>

          <p>
            {todo.description}
          </p>
          <p>
Created:
{
 new Date(
   todo.created_at
 ).toLocaleDateString()
}
</p>

<p>
Deadline:
{
  todo.deadline
}
</p>

<p>
Category:
{
  todo.category
}
</p>
          <p>
            Status:
            {
              todo.completed
                ? " Completed"
                : " Pending"
            }
          </p>

          <button
            onClick={() =>
              onToggle(todo)
            }
          >
            Completed
          </button>
      
          <button
            onClick={() =>
              onDelete(todo.id)
            }
          >
            Delete
          </button>

          <hr />

        </div>

      ))}

    </div>
  );
}

export default TodoList;