import { Link } from "react-router-dom";
import { deleteTodo, updateTodo } from "../api/todoService";
import { useTodoContext } from "../context/TodoContext";

function TodoItem({ todo }) {
  const { setTodos } = useTodoContext();

  // Toggle completion status
  async function handleToggle() {
    try {
      const newStatus = todo.status === "DONE" ? "TODO" : "DONE";

      const payload = {
        name: todo.name,
        status: newStatus,
      };

      console.log("Updating todo:", todo.id, payload);
      const updated = await updateTodo(todo.id, payload);
      console.log("Update response:", updated);

      // Update local state so UI changes immediately
      setTodos((prev) => prev.map((t) => (t.id === todo.id ? updated : t)));
    } catch (err) {
      console.error("Update failed:", err);
      alert("Could not update status. Please try again.");
    }
  }

  async function handleDelete() {
    // Confirmation dialog
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await deleteTodo(todo.id);
        // Update the UI by removing the deleted todo from the list
        setTodos((prev) => prev.filter((t) => t.id !== todo.id));
      } catch (err) {
        console.error("Delete failed", err);
        alert("Failed to delete the task. Please try again.");
      }
    }
  }

  return (
    <li className="border-b py-2 flex justify-between items-center bg-white text-slate-900">
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={todo.status === "DONE"}
          onChange={handleToggle}
          className="w-5 h-5 cursor-pointer accent-blue-600"
        />
        <span
          className={
            todo.status === "DONE"
              ? "line-through text-gray-400"
              : "font-medium"
          }
        >
          {todo.name}
        </span>
        <p className="text-sm text-gray-500">
          Status: {todo.status === "DONE" ? "Completed" : "Pending"}
        </p>
      </div>

      <div className="flex gap-4 items-center">
        {/* Navigation to individual todo details */}
        <Link
          to={`/todo/${todo.id}`}
          className="text-blue-500 hover:text-blue-700"
        >
          View Details
        </Link>

        {/* Delete operation */}
        <button
          onClick={handleDelete}
          className="group flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-red-500 bg-red-50 hover:bg-red-500 hover:text-white rounded-lg border border-red-100 transition-all shadow-sm active:scale-95"
        >
          <svg
            className="w-3.5 h-3.5 group-hover:animate-bounce"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
          Delete
        </button>
      </div>
    </li>
  );
}

export default TodoItem;
