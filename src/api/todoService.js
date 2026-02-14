const BASE_URL = "https://api.oluwasetemi.dev";

export async function fetchTodos(page = 1) {
  const response = await fetch(`${BASE_URL}/tasks?page=${page}&limit=10`);
  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }
  return response.json();
}

export async function fetchTodoById(id) {
  const response = await fetch(`${BASE_URL}/tasks/${id}`);
  if (!response.ok) {
    throw new Error("Task not found");
  }
  return response.json();
}

export async function createTodo(todoData) {
  const response = await fetch(`${BASE_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todoData),
  });

  if (!response.ok) {
    throw new Error("Failed to create task");
  }
  return response.json();
}

export async function deleteTodo(id) {
  const response = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete task");
  }
  return true;
}

export async function updateTodo(id, payload) {
  const response = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("Failed to update task");
  }

  return response.json();
}
