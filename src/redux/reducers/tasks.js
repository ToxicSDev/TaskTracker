import * as actionTypes from "../types/actionTypes";

export default function tasks(state = [], action) {
    switch (action.type) {
        case actionTypes.CREATE_TASK:
            return [...state, action.payload];

        case actionTypes.UPDATE_TASK:
            return state.map((task) => {
                if (task.id === action.payload.id) {
                    return { ...task, ...action.payload };
                }
                return task;
            });

        case actionTypes.DELETE_TASK:
            return state.filter((task) => task.id !== action.payload.id);

        default:
            return state;
    }
}