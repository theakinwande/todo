import { useState, useEffect } from "react";
import { fetchTasks } from "../api/todoService";

export function useTodos({ page, search, status, priority }) {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    async function getTodos() {
      setLoading(true);
      setError(null);
      try {
        const result = await fetchTasks({ page, search, status, priority });
        // The API returns { data: [...], meta: { ... } }
        const taskArray = Array.isArray(result)
          ? result
          : result.data || result.tasks || [];
        setTodos(taskArray);
        setTotalPages(result.meta?.totalPages || 1);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    getTodos();
  }, [page, search, status, priority]);

  return { todos, loading, error, totalPages };
}
