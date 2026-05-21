// ─── TASK ACTION TYPES ───────────────────────────────────────
export const FETCH_TASKS_REQUEST = "FETCH_TASKS_REQUEST";
export const FETCH_TASKS_SUCCESS = "FETCH_TASKS_SUCCESS";
export const FETCH_TASKS_FAILURE = "FETCH_TASKS_FAILURE";

export const CREATE_TASK_REQUEST = "CREATE_TASK_REQUEST";
export const CREATE_TASK_SUCCESS = "CREATE_TASK_SUCCESS";
export const CREATE_TASK_FAILURE = "CREATE_TASK_FAILURE";

export const DELETE_TASK_REQUEST = "DELETE_TASK_REQUEST";
export const DELETE_TASK_SUCCESS = "DELETE_TASK_SUCCESS";
export const DELETE_TASK_FAILURE = "DELETE_TASK_FAILURE";

// ─── USER ACTION TYPES ───────────────────────────────────────
export const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST";
export const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
export const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE";

// ─── PROJECT ACTION TYPES ────────────────────────────────────
export const FETCH_PROJECTS_REQUEST = "FETCH_PROJECTS_REQUEST";
export const FETCH_PROJECTS_SUCCESS = "FETCH_PROJECTS_SUCCESS";
export const FETCH_PROJECTS_FAILURE = "FETCH_PROJECTS_FAILURE";

// ─── UI ACTION TYPES ─────────────────────────────────────────
export const OPEN_TASK_FORM = "OPEN_TASK_FORM";
export const CLOSE_TASK_FORM = "CLOSE_TASK_FORM";
export const SET_FILTERS = "SET_FILTERS";
export const CLEAR_FILTERS = "CLEAR_FILTERS";

// ─── TASK ACTION CREATORS ────────────────────────────────────
export const fetchTasksRequest = (filters = {}) => ({
  type: FETCH_TASKS_REQUEST,
  payload: filters,
});

export const fetchTasksSuccess = (tasks) => ({
  type: FETCH_TASKS_SUCCESS,
  payload: tasks,
});

export const fetchTasksFailure = (error) => ({
  type: FETCH_TASKS_FAILURE,
  payload: error,
});

export const createTaskRequest = (taskData) => ({
  type: CREATE_TASK_REQUEST,
  payload: taskData,
});

export const createTaskSuccess = (task) => ({
  type: CREATE_TASK_SUCCESS,
  payload: task,
});

export const createTaskFailure = (error) => ({
  type: CREATE_TASK_FAILURE,
  payload: error,
});

export const deleteTaskRequest = (taskId) => ({
  type: DELETE_TASK_REQUEST,
  payload: taskId,
});

export const deleteTaskSuccess = (taskId) => ({
  type: DELETE_TASK_SUCCESS,
  payload: taskId,
});

export const deleteTaskFailure = (error) => ({
  type: DELETE_TASK_FAILURE,
  payload: error,
});

// ─── USER ACTION CREATORS ────────────────────────────────────
export const fetchUsersRequest = () => ({
  type: FETCH_USERS_REQUEST,
});

export const fetchUsersSuccess = (users) => ({
  type: FETCH_USERS_SUCCESS,
  payload: users,
});

export const fetchUsersFailure = (error) => ({
  type: FETCH_USERS_FAILURE,
  payload: error,
});

// ─── PROJECT ACTION CREATORS ─────────────────────────────────
export const fetchProjectsRequest = () => ({
  type: FETCH_PROJECTS_REQUEST,
});

export const fetchProjectsSuccess = (projects) => ({
  type: FETCH_PROJECTS_SUCCESS,
  payload: projects,
});

export const fetchProjectsFailure = (error) => ({
  type: FETCH_PROJECTS_FAILURE,
  payload: error,
});

// ─── UI ACTION CREATORS ──────────────────────────────────────
export const openTaskForm = (mode = "create", taskId = null) => ({
  type: OPEN_TASK_FORM,
  payload: { mode, taskId },
});

export const closeTaskForm = () => ({
  type: CLOSE_TASK_FORM,
});

export const setFilters = (filters) => ({
  type: SET_FILTERS,
  payload: filters,
});

export const clearFilters = () => ({
  type: CLEAR_FILTERS,
});
