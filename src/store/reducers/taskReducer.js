import {
  FETCH_TASKS_REQUEST,
  FETCH_TASKS_SUCCESS,
  FETCH_TASKS_FAILURE,
  CREATE_TASK_REQUEST,
  CREATE_TASK_SUCCESS,
  CREATE_TASK_FAILURE,
  DELETE_TASK_REQUEST,
  DELETE_TASK_SUCCESS,
  DELETE_TASK_FAILURE,
} from "../actions/actions";

const initialState = {
  byId: {},
  allIds: [],
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TASKS_REQUEST:
      return state;

    case FETCH_TASKS_SUCCESS: {
      const byId = {};
      const allIds = [];
      action.payload.forEach((task) => {
        byId[task.id] = task;
        allIds.push(task.id);
      });
      return { byId, allIds };
    }

    case FETCH_TASKS_FAILURE:
      return state;

    case CREATE_TASK_SUCCESS: {
      const newTask = action.payload;
      return {
        byId: { ...state.byId, [newTask.id]: newTask },
        allIds: [...state.allIds, newTask.id],
      };
    }

    case DELETE_TASK_SUCCESS: {
      const deletedId = action.payload;
      const { [deletedId]: removed, ...remainingById } = state.byId;
      return {
        byId: remainingById,
        allIds: state.allIds.filter((id) => id !== deletedId),
      };
    }

    default:
      return state;
  }
};

export default taskReducer;
