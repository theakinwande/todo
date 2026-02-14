import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { fetchTodoById } from "../api/todoService";

function TodoDetails() {
  // Get the ID from the URL parameters
  const { id } = useParams();
  const navigate = useNavigate();

  // State to hold the todo details, loading status, and any errors
  const [todo, setTodo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTodoDetail = async () => {
      try {
        setLoading(true);
        const result = await fetchTodoById(id);

        // Use result.data if the API wraps it, otherwise use result
        setTodo(result.data || result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getTodoDetail();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!todo) return <div>Todo not found</div>;

  return (
    <main className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
        {/* Header Section */}
        <div className="bg-slate-900 p-8 text-white">
          <button
            onClick={() => navigate(-1)}
            className="text-slate-400 hover:text-white mb-4 flex items-center gap-2 transition-colors"
          >
            ← Back to List
          </button>
          <h1 className="text-3xl font-bold">{todo.name}</h1>
        </div>

        {/* Content Section */}
        <div className="p-8 space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">
              Status
            </h3>
            <span
              className={`px-3 py-1 rounded-full text-sm font-bold ${
                todo.status === "DONE"
                  ? "bg-green-100 text-green-700"
                  : "bg-amber-100 text-amber-700"
              }`}
            >
              {todo.status === "DONE" ? "Completed" : "Pending"}
            </span>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">
              Task ID
            </h3>
            <p className="text-slate-700 font-mono text-sm bg-slate-50 p-2 rounded border border-slate-100">
              {todo.id}
            </p>
          </div>

          {todo.description && (
            <div>
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">
                Description
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {todo.description}
              </p>
            </div>
          )}
        </div>

        {/* Footer Section */}
        <div className="bg-slate-50 p-6 border-t border-slate-100 flex justify-end">
          <button
            onClick={() => navigate("/")}
            className="bg-slate-900 text-white px-6 py-2 rounded-lg font-semibold hover:bg-slate-800 transition-colors"
          >
            Close Details
          </button>
        </div>
      </div>
    </main>
  );
}

export default TodoDetails;
