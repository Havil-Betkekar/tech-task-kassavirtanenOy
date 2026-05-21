import {
  FETCH_TASKS_REQUEST,
  FETCH_TASKS_SUCCESS,
  FETCH_TASKS_FAILURE,
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  FETCH_PROJECTS_REQUEST,
  FETCH_PROJECTS_SUCCESS,
  FETCH_PROJECTS_FAILURE,
  CREATE_TASK_REQUEST,
  CREATE_TASK_SUCCESS,
  CREATE_TASK_FAILURE,
  DELETE_TASK_REQUEST,
  DELETE_TASK_SUCCESS,
  DELETE_TASK_FAILURE,
  OPEN_TASK_FORM,
  CLOSE_TASK_FORM,
  SET_FILTERS,
  CLEAR_FILTERS,
} from "../actions/actions";

const initialState = {
  taskForm: {
    isOpen: false,
    mode: "create",
    taskId: null,
  },
  filters: {
    project: null,
    assignee: null,
    status: "all",
    taskType: "all",
  },
  loading: {
    tasks: false,
    users: false,
    projects: false,
  },
  errors: {
    tasks: null,
    form: null,
  },
};

const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    // ─── Task Form ───────────────────────────────────────────
    case OPEN_TASK_FORM:
      return {
        ...state,
        taskForm: {
          isOpen: true,
          mode: action.payload.mode,
          taskId: action.payload.taskId,
        },
      };

    case CLOSE_TASK_FORM:
      return {
        ...state,
        taskForm: {
          isOpen: false,
          mode: "create",
          taskId: null,
        },
      };

    // ─── Filters ─────────────────────────────────────────────
    case SET_FILTERS:
      return {
        ...state,
        filters: {
          ...state.filters,
          ...action.payload,
        },
      };

    case CLEAR_FILTERS:
      return {
        ...state,
        filters: {
          project: null,
          assignee: null,
          status: "all",
          taskType: "all",
        },
      };

    // ─── Tasks Loading & Errors ──────────────────────────────
    case FETCH_TASKS_REQUEST:
      return {
        ...state,
        loading: { ...state.loading, tasks: true },
        errors: { ...state.errors, tasks: null },
      };

    case FETCH_TASKS_SUCCESS:
      return {
        ...state,
        loading: { ...state.loading, tasks: false },
      };

    case FETCH_TASKS_FAILURE:
      return {
        ...state,
        loading: { ...state.loading, tasks: false },
        errors: { ...state.errors, tasks: action.payload },
      };

    // ─── Users Loading ───────────────────────────────────────
    case FETCH_USERS_REQUEST:
      return {
        ...state,
        loading: { ...state.loading, users: true },
      };

    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        loading: { ...state.loading, users: false },
      };

    case FETCH_USERS_FAILURE:
      return {
        ...state,
        loading: { ...state.loading, users: false },
      };

    // ─── Projects Loading ────────────────────────────────────
    case FETCH_PROJECTS_REQUEST:
      return {
        ...state,
        loading: { ...state.loading, projects: true },
      };

    case FETCH_PROJECTS_SUCCESS:
      return {
        ...state,
        loading: { ...state.loading, projects: false },
      };

    case FETCH_PROJECTS_FAILURE:
      return {
        ...state,
        loading: { ...state.loading, projects: false },
      };

    // ─── Create Task Loading & Errors ────────────────────────
    case CREATE_TASK_REQUEST:
      return {
        ...state,
        loading: { ...state.loading, tasks: true },
        errors: { ...state.errors, form: null },
      };

    case CREATE_TASK_SUCCESS:
      return {
        ...state,
        loading: { ...state.loading, tasks: false },
      };

    case CREATE_TASK_FAILURE:
      return {
        ...state,
        loading: { ...state.loading, tasks: false },
        errors: { ...state.errors, form: action.payload },
      };

    // ─── Delete Task Loading ─────────────────────────────────
    case DELETE_TASK_REQUEST:
      return {
        ...state,
        loading: { ...state.loading, tasks: true },
      };

    case DELETE_TASK_SUCCESS:
      return {
        ...state,
        loading: { ...state.loading, tasks: false },
      };

    case DELETE_TASK_FAILURE:
      return {
        ...state,
        loading: { ...state.loading, tasks: false },
      };

    default:
      return state;
  }
};

export default uiReducer;
