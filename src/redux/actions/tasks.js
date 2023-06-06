import uuid from "uuid";

import { validateUUIDv4 } from "../../utils/validator";
import * as actionTypes from "../types/actionTypes";

function createTask(text) {
    if (typeof text !== 'string' || text.trim() === '') {
        throw new Error('Error: Task text must be a non-empty string');
    }

    return {
        type: actionTypes.CREATE_TASK,
        payload: {
            id: uuid.v4(),
            editing: false,
            text,
        },
    };
}

function updateTask(updatedTask) {
    if (updatedTask === null) {
        throw new Error('Error: Task to update should be a non-null object');
    }

    if (!updatedTask.hasOwnProperty('id') || !validateUUIDv4(updatedTask.id)) {
        throw new Error(`Error: Invalid or missing uuid for ${JSON.stringify(updatedTask)}`);
    }

    return {
        type: actionTypes.UPDATE_TASK,
        payload: updatedTask,
    };
}


function deleteTask(id) {
    if (!validateUUIDv4(id)) {
        throw new Error(`Error: Invalid uuid - ${id}`);
    }

    return {
        type: actionTypes.DELETE_TASK,
        payload: {
            id,
        },
    };
}

export default {
    createTask,
    updateTask,
    deleteTask,
};
