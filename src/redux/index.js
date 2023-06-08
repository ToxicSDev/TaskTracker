import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducers/combineReducers";

export default function configureReduxStore(initialState) {
    return configureStore({
        reducer: reducer,
        preloadedState: initialState,
    });
}
