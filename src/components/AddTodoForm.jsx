import React, { useState } from "react";
import { createTodo } from "../api/todoService";

function AddTodoForm({ onTodoCreated }) {
  const [title, setTitle] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return;

    setIsSubmitting(true);
    setError(null);

    try {
      // POST request to create a new todo
      const newTodo = await createTodo({
        name: title,
        status: "TODO",
      });
      setTitle("");
      onTodoCreated(newTodo); // Notify parent to refresh list
    } catch (err) {
      setError("Failed to add task. Please try again.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-slate-800">Create New Task</h3>
          <span className="text-xs font-medium text-slate-400 bg-slate-100 px-2 py-1 rounded-md uppercase tracking-wider">
            Quick Add
          </span>
        </div>

        <div className="relative flex flex-col md:flex-row gap-3">
          <div className="relative flex-grow">
            {/* Decorative Plus Icon */}
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </div>

            <input
              type="text"
              placeholder="What needs to be done today?"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={isSubmitting}
              required
              className="w-full pl-11 pr-4 py-4 bg-white border-2 border-slate-100 rounded-2xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="md:w-32 px-6 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 active:scale-95 disabled:opacity-50 disabled:active:scale-100 transition-all shadow-lg shadow-blue-200 flex items-center justify-center"
          >
            {isSubmitting ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              "Add Task"
            )}
          </button>
        </div>

        {error && (
          <div className="flex items-center gap-2 text-red-600 text-sm font-medium bg-red-50 p-3 rounded-xl border border-red-100">
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {error}
          </div>
        )}
      </div>
    </form>
  );
}

export default AddTodoForm;
