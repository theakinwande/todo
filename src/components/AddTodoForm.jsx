import React, { useState } from "react";
import { createTask } from "../api/todoService";

function AddTodoForm({ onTodoCreated }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("MEDIUM");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!title.trim()) return;

    setIsSubmitting(true);
    setError(null);

    try {
      // POST request to create a new todo
      const result = await createTask({
        name: title,
        description: description,
        priority: priority,
        status: "TODO",
      });
      const newTodo = result.data || result;
      
      // Reset form
      setTitle("");
      setDescription("");
      setPriority("MEDIUM");
      setIsExpanded(false);
      
      onTodoCreated(newTodo); // Notify parent to refresh list
    } catch (err) {
      setError("Failed to add task. Please try again.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full transition-all duration-300">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold text-slate-800">Create New Task</h3>
          <span className="text-xs font-medium text-slate-400 bg-slate-100 px-2 py-1 rounded-md uppercase tracking-wider">
            Quick Add
          </span>
        </div>

        <div className="relative flex flex-col gap-4 bg-white p-1 rounded-2xl">
          {/* Main Title Input */}
          <div className="relative">
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
              onFocus={() => setIsExpanded(true)}
              disabled={isSubmitting}
              required
              className="w-full pl-11 pr-4 py-4 bg-white border-2 border-slate-100 rounded-2xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
            />
          </div>

          {/* Expanded Fields (Description & Priority) */}
          {isExpanded && (
            <div className="animate-in fade-in slide-in-from-top-2 duration-200 flex flex-col gap-4 px-1">
              <textarea
                placeholder="Add a description (optional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={isSubmitting}
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 transition-all resize-none h-24"
              />

              <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <span className="text-sm font-medium text-slate-500">Priority:</span>
                    <div className="flex gap-2">
                        {['LOW', 'MEDIUM', 'HIGH'].map((p) => (
                            <button
                                type="button"
                                key={p}
                                onClick={() => setPriority(p)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                                    priority === p
                                        ? p === 'HIGH' ? 'bg-red-100 text-red-700 border-red-200 ring-2 ring-red-500/20'
                                        : p === 'MEDIUM' ? 'bg-amber-100 text-amber-700 border-amber-200 ring-2 ring-amber-500/20'
                                        : 'bg-green-100 text-green-700 border-green-200 ring-2 ring-green-500/20'
                                        : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'
                                }`}
                            >
                                {p}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex gap-2 w-full sm:w-auto">
                    <button
                        type="button"
                        onClick={() => {
                            setIsExpanded(false);
                            setTitle("");
                            setDescription("");
                            setPriority("MEDIUM");
                        }}
                        className="flex-1 sm:flex-none px-4 py-2 text-slate-500 font-medium hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 sm:flex-none px-6 py-2 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 active:scale-95 disabled:opacity-50 disabled:active:scale-100 transition-all shadow-lg shadow-blue-200 flex items-center justify-center gap-2"
                    >
                        {isSubmitting ? (
                        <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>Adding...</span>
                        </>
                        ) : (
                        "Add Task"
                        )}
                    </button>
                </div>
              </div>
            </div>
          )}
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
