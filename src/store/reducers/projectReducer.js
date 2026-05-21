import {
  FETCH_PROJECTS_REQUEST,
  FETCH_PROJECTS_SUCCESS,
  FETCH_PROJECTS_FAILURE,
} from "../actions/actions";

const initialState = {
  byId: {},
  allIds: [],
};

const projectReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PROJECTS_REQUEST:
      return state;

    case FETCH_PROJECTS_SUCCESS: {
      const byId = {};
      const allIds = [];
      action.payload.forEach((project) => {
        byId[project.id] = project;
        allIds.push(project.id);
      });
      return { byId, allIds };
    }

    case FETCH_PROJECTS_FAILURE:
      return state;

    default:
      return state;
  }
};

export default projectReducer;
