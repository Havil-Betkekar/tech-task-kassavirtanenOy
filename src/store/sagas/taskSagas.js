import { call, put, retry } from "redux-saga/effects";
import { mockApi } from "../../api/mockApi";
import {
  fetchTasksSuccess,
  fetchTasksFailure,
  createTaskSuccess,
  createTaskFailure,
  deleteTaskSuccess,
  deleteTaskFailure,
} from "../actions/actions";

const RETRY_TIMES = 3;
const RETRY_DELAY = 1000;

// ─── Fetch Tasks Saga ─────────────────────────────────────────
export function* fetchTasksSaga(action) {
  try {
    const response = yield retry(
      RETRY_TIMES,
      RETRY_DELAY,
      mockApi.fetchTasks,
      action.payload,
    );
    yield put(fetchTasksSuccess(response.data));
  } catch (error) {
    yield put(fetchTasksFailure(error.message));
  }
}

// ─── Create Task Saga ─────────────────────────────────────────
export function* createTaskSaga(action) {
  try {
    const response = yield retry(
      RETRY_TIMES,
      RETRY_DELAY,
      mockApi.createTask,
      action.payload,
    );
    yield put(createTaskSuccess(response.data));
  } catch (error) {
    yield put(createTaskFailure(error.message));
  }
}

// ─── Delete Task Saga ─────────────────────────────────────────
export function* deleteTaskSaga(action) {
  try {
    const response = yield retry(
      RETRY_TIMES,
      RETRY_DELAY,
      mockApi.deleteTask,
      action.payload,
    );
    yield put(deleteTaskSuccess(response.data.id));
  } catch (error) {
    yield put(deleteTaskFailure(error.message));
  }
}
