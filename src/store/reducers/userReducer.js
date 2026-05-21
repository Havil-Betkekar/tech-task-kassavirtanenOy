import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
} from "../actions/actions";

const initialState = {
  byId: {},
  allIds: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return state;

    case FETCH_USERS_SUCCESS: {
      const byId = {};
      const allIds = [];
      action.payload.forEach((user) => {
        byId[user.id] = user;
        allIds.push(user.id);
      });
      return { byId, allIds };
    }

    case FETCH_USERS_FAILURE:
      return state;

    default:
      return state;
  }
};

export default userReducer;
