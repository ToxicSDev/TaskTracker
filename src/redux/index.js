import { createStore, compose } from "redux";

import reducer from "./reducers/combineReducers.js";

export default function configStore(initialState) {
  return createStore(
    reducer,
    initialState,
    compose(window.devToolsExtension ? window.devToolsExtension() : (f) => f)
  );
};