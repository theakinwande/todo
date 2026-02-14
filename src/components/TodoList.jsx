import TodoItem from "./TodoItem";

function TodoList({ todos }) {
  return (
    <ul className="mt-4 bg-white rounded-xl shadow-sm border border-slate-100 divide-y divide-slate-100 overflow-hidden">
      {todos.length > 0 ? (
        todos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
      ) : (
        <li className="p-8 text-center text-gray-500 italic">
          No tasks found. Try adding some!
        </li>
      )}
    </ul>
  );
}

export default TodoList;
