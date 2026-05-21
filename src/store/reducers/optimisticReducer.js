import {
  CREATE_TASK_REQUEST,
  CREATE_TASK_SUCCESS,
  CREATE_TASK_FAILURE,
  DELETE_TASK_REQUEST,
  DELETE_TASK_SUCCESS,
  DELETE_TASK_FAILURE,
} from "../actions/actions";

const initialState = {
  pendingCreates: [],
  pendingUpdates: {},
  pendingDeletes: [],
};

const optimisticReducer = (state = initialState, action) => {
  switch (action.type) {
    // ─── Pending Creates ─────────────────────────────────────
    case CREATE_TASK_REQUEST:
      return {
        ...state,
        pendingCreates: [...state.pendingCreates, action.payload],
      };

    case CREATE_TASK_SUCCESS:
    case CREATE_TASK_FAILURE:
      return {
        ...state,
        pendingCreates: state.pendingCreates.filter(
          (task) => task.title !== action.payload?.title,
        ),
      };

    // ─── Pending Deletes ─────────────────────────────────────
    case DELETE_TASK_REQUEST:
      return {
        ...state,
        pendingDeletes: [...state.pendingDeletes, action.payload],
      };

    case DELETE_TASK_SUCCESS:
    case DELETE_TASK_FAILURE:
      return {
        ...state,
        pendingDeletes: state.pendingDeletes.filter(
          (id) => id !== action.payload,
        ),
      };

    default:
      return state;
  }
};

export default optimisticReducer;
