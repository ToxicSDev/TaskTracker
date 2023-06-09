import { v4 as uuidv4 } from 'uuid';

import { validateUUIDv4 } from "../../utils/validator";
import * as actionTypes from "../types/actionTypes";

function createCategory(categoryName) {
    return {
        type: actionTypes.CREATE_CATEGORY,
        payload: {
            id: uuidv4(),
            name: categoryName,
            taskList: [],
        },
    };
}


function updateCategory(updatedCategory) {
    if (!updatedCategory.hasOwnProperty('id') || !validateUUIDv4(updatedCategory.id)) {
        throw new Error(`Error: Invalid or missing uuid for ${JSON.stringify(updatedCategory)}`);
    }

    return {
        type: actionTypes.UPDATE_CATEGORY,
        payload: updatedCategory,
    };
}


function deleteCategory(categoryId) {
    if (!validateUUIDv4(categoryId)) {
        throw new Error(`Error: Invalid uuid - ${categoryId}`);
    }

    return {
        type: actionTypes.DELETE_CATEGORY,
        payload: {
            id: categoryId,
        },
    };
}


function attachToCategory(categoryId, taskId) {
    if (!validateUUIDv4(categoryId)) {
        throw new Error(`Error: Invalid uuid - ${categoryId}`);
    }

    if (!validateUUIDv4(taskId)) {
        throw new Error(`Error: Invalid uuid - ${taskId}`);
    }

    return {
        type: actionTypes.ATTACH_TO_CATEGORY,
        payload: {
            categoryId,
            taskId,
        },
    };
}


function detachFromCategory(categoryId, taskId) {
    if (!validateUUIDv4(categoryId)) {
        throw new Error(`Error: Invalid uuid - ${categoryId}`);
    }

    if (!validateUUIDv4(taskId)) {
        throw new Error(`Error: Invalid uuid - ${taskId}`);
    }

    return {
        type: actionTypes.DETACH_FROM_CATEGORY,
        payload: {
            categoryId,
            taskId,
        },
    };
}


function move(entityType, sourceId, targetId) {
    if (!validateUUIDv4(sourceId)) {
        throw new Error(`Error: Invalid uuid - ${sourceId}`);
    }

    if (!validateUUIDv4(targetId)) {
        throw new Error(`Error: Invalid uuid - ${targetId}`);
    }

    const actionType = entityType === "task" ? actionTypes.MOVE_TASK : actionTypes.MOVE_CATEGORY;

    return {
        type: actionType,
        payload: {
            sourceId,
            targetId,
        },
    };
}

export default {
    createCategory,
    updateCategory,
    deleteCategory,
    attachToCategory,
    detachFromCategory,
    move,
};
