import { combineReducers } from "redux";
import categoriesReducer from "./categories";
import tasksReducer from "./tasks";

export default combineReducers({
  categories: categoriesReducer,
  tasks: tasksReducer,
});