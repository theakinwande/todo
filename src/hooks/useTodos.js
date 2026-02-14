import { useState, useEffect } from "react";
import { fetchTodos } from "../api/todoService";

export function useTodos(page) {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    async function getTodos() {
      setLoading(true);
      setError(null);
      try {
        const result = await fetchTodos(page);
        // Assuming the API returns an object with `todos` and `totalPages`
        const taskArray = Array.isArray(result) ? result : result.tasks || [];
        setTodos(taskArray);
        setTotalPages(result.meta?.totalPages || 1);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    getTodos();
  }, [page]);

  return { todos, loading, error, totalPages };
}
