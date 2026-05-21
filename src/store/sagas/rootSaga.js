import { all, takeLatest, takeEvery } from "redux-saga/effects";
import {
  FETCH_TASKS_REQUEST,
  CREATE_TASK_REQUEST,
  DELETE_TASK_REQUEST,
  FETCH_USERS_REQUEST,
  FETCH_PROJECTS_REQUEST,
} from "../actions/actions";
import { fetchTasksSaga, createTaskSaga, deleteTaskSaga } from "./taskSagas";
import { fetchUsersSaga } from "./userSagas";
import { fetchProjectsSaga } from "./projectSagas";

export default function* rootSaga() {
  yield all([
    takeLatest(FETCH_TASKS_REQUEST, fetchTasksSaga),
    takeEvery(CREATE_TASK_REQUEST, createTaskSaga),
    takeEvery(DELETE_TASK_REQUEST, deleteTaskSaga),
    takeLatest(FETCH_USERS_REQUEST, fetchUsersSaga),
    takeLatest(FETCH_PROJECTS_REQUEST, fetchProjectsSaga),
  ]);
}
