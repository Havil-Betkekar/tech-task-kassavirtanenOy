import { put, retry } from "redux-saga/effects";
import { mockApi } from "../../api/mockApi";
import { fetchProjectsSuccess, fetchProjectsFailure } from "../actions/actions";

const RETRY_TIMES = 3;
const RETRY_DELAY = 1000;

// ─── Fetch Projects Saga ──────────────────────────────────────
export function* fetchProjectsSaga() {
  try {
    const response = yield retry(
      RETRY_TIMES,
      RETRY_DELAY,
      mockApi.fetchProjects,
    );
    yield put(fetchProjectsSuccess(response.data));
  } catch (error) {
    yield put(fetchProjectsFailure(error.message));
  }
}
