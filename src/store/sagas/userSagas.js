import { put, retry } from "redux-saga/effects";
import { mockApi } from "../../api/mockApi";
import { fetchUsersSuccess, fetchUsersFailure } from "../actions/actions";

const RETRY_TIMES = 3;
const RETRY_DELAY = 1000;

// ─── Fetch Users Saga ─────────────────────────────────────────
export function* fetchUsersSaga() {
  try {
    const response = yield retry(RETRY_TIMES, RETRY_DELAY, mockApi.fetchUsers);
    yield put(fetchUsersSuccess(response.data));
  } catch (error) {
    yield put(fetchUsersFailure(error.message));
  }
}
