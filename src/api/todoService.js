
const BASE_URL = 'https://api.oluwasetemi.dev';

/**
 * Generic request handler with error parsing
 */
const request = async (url, options = {}) => {
  const response = await fetch(`${BASE_URL}${url}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  // Handle 204 No Content
  if (response.status === 204) return { success: true };

  const data = await response.json();

  if (!response.ok) {
    const errorMessage =
      data?.message ||
      data?.error?.issues?.map((i) => i.message).join(', ') ||
      `Request failed with status ${response.status}`;
    throw new Error(errorMessage);
  }

  return data;
};

// ─── TASKS ──────────────────────────────────────────────────────

/**
 * Fetch paginated tasks with optional filters
 * @param {Object} params - { page, limit, status, priority, search, sort }
 */
export const fetchTasks = async ({
  page = 1,
  limit = 10,
  status,
  priority,
  search,
  sort = 'DESC',
} = {}) => {
  const params = new URLSearchParams();
  params.set('page', page);
  params.set('limit', limit);
  params.set('sort', sort);
  if (status) params.set('status', status);
  if (priority) params.set('priority', priority);
  if (search) params.set('search', search);

  return request(`/tasks?${params.toString()}`);
};

/**
 * Fetch all tasks (no pagination)
 */
export const fetchAllTasks = async () => {
  return request('/tasks?all=true');
};

/**
 * Fetch a single task by ID
 */
export const fetchTaskById = async (id) => {
  return request(`/tasks/${id}`);
};

/**
 * Create a new task
 * @param {Object} task - { name, status, description?, priority?, start?, end? }
 */
export const createTask = async (task) => {
  return request('/tasks', {
    method: 'POST',
    body: JSON.stringify(task),
  });
};

/**
 * Update a task
 * @param {string} id
 * @param {Object} updates
 */
export const updateTask = async (id, updates) => {
  return request(`/tasks/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(updates),
  });
};

/**
 * Delete a task
 */
export const deleteTask = async (id) => {
  return request(`/tasks/${id}`, {
    method: 'DELETE',
  });
};

/**
 * Fetch children of a task
 */
export const fetchTaskChildren = async (id, { page = 1, limit = 10 } = {}) => {
  const params = new URLSearchParams({ page, limit });
  return request(`/tasks/${id}/children?${params.toString()}`);
};
