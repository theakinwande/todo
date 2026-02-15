import React, { createContext, useState, useContext } from "react";

const TodoContext = createContext();

export function TodoProvider({ children }) {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <TodoContext.Provider value={{ todos, setTodos, loading, setLoading }}>
      {children}
    </TodoContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTodoContext() {
  return useContext(TodoContext);
}
