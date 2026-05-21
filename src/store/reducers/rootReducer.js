import { combineReducers } from "redux";
import taskReducer from "./taskReducer";
import userReducer from "./userReducer";
import projectReducer from "./projectReducer";
import uiReducer from "./uiReducer";
import optimisticReducer from "./optimisticReducer";

const rootReducer = combineReducers({
  entities: combineReducers({
    tasks: taskReducer,
    users: userReducer,
    projects: projectReducer,
  }),
  ui: uiReducer,
  optimistic: optimisticReducer,
});

export default rootReducer;
