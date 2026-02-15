import React, { useEffect, useState } from "react";
import { useTodos } from "../hooks/useTodos";
import Loader from "../components/Loader";
import SearchBar from "../components/SearchBar";
import FilterBar from "../components/FilterBar";
import ErrorMessage from "../components/ErrorMessage";
import Pagination from "../components/Pagination";
import TodoList from "../components/TodoList";
import AddTodoForm from "../components/AddTodoForm";
import { useTodoContext } from "../context/TodoContext";

function TodoPages() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  // Get the global todos and loading state from context
  const { todos, setTodos } = useTodoContext();

  // Fetch initial data from hook
  const todoParams = React.useMemo(
    () => ({
      page: currentPage,
      search: searchQuery,
      status:
        statusFilter === "completed"
          ? "DONE"
          : statusFilter === "not_completed"
          ? "TODO"
          : undefined,
      priority: priorityFilter !== "all" ? priorityFilter : undefined,
    }),
    [currentPage, searchQuery, statusFilter, priorityFilter]
  );

  const {
    todos: fetchedTodos,
    loading,
    error,
    totalPages,
  } = useTodos(todoParams);

  // Keep Context todos in sync with fetched todos
  useEffect(() => {
    if (fetchedTodos) {
      setTodos(fetchedTodos);
    }
  }, [fetchedTodos, setTodos]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter, priorityFilter]);

  // Handle loading and error states
  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  function handleTodoCreated(newTodo) {
    // Add the new todo to the top of the list
    setTodos((prev) => [newTodo, ...prev]);
  }

  // Use todos directly since we filter on server side now
  const filteredTodos = todos || [];

  return (
    <main className="w-full max-w-4xl mx-auto px-6 py-10 bg-white min-h-screen text-slate-900 shadow-lg">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-900">
        Todo List
      </h1>

      {/* Add Todo Form */}
      <div className="bg-slate-50 p-6 rounded-xl shadow-sm border border-slate-200 mb-8">
        <AddTodoForm onTodoCreated={handleTodoCreated} />
      </div>

      {/* Search and Filter Controls */}
      <div className="flex flex-col md:flex-grow gap-4 mb-6 controls-wrapper">
        <div className="flex-grow w-full">
          <SearchBar
            className="text-slate-900"
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </div>
        <div className="w-full md:w-auto">
          <FilterBar
            className="text-slate-900"
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            priorityFilter={priorityFilter}
            setPriorityFilter={setPriorityFilter}
          />
        </div>
      </div>

      <TodoList todos={filteredTodos} />

      {/* Pagination Controls */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </main>
  );
}

export default TodoPages;
