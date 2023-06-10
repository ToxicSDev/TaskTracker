import { v4 as uuidv4 } from 'uuid';

import { validateUUIDv4 } from "../../utils/validator";
import * as actionTypes from "../types/actionTypes";


function createCategory(name) {
  return {
    type: actionTypes.CREATE_CATEGORY,
    payload: {
      id: uuidv4(),
      name,
      taskList: [],
    },
  };
}


function updateCategory(updatedCategory) {
  if (!validateUUIDv4(updatedCategory.id)) {
    throw new Error(
      `params have not valid uuids ${JSON.stringify(updatedCategory)}`
    );
  }

  return {
    type: actionTypes.UPDATE_CATEGORY,
    payload: updatedCategory,
  };
}


function deleteCategory(id) {
  if (!validateUUIDv4(id)) {
    throw new Error(`params have not valid uuids ${id}`);
  }

  return {
    type: actionTypes.DELETE_CATEGORY,
    payload: {
      id,
    },
  };
}


function attachToCategory(categoryId, taskId) {
  if (!validateUUIDv4(categoryId) || !validateUUIDv4(taskId)) {
    throw new Error(`params have not valid uuids ${categoryId} ${taskId}`);
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
  if (!validateUUIDv4(categoryId) || !validateUUIDv4(taskId)) {
    throw new Error(`params have not valid uuids ${categoryId} ${taskId}`);
  }

  return {
    type: actionTypes.DETACH_FROM_CATEGORY,
    payload: {
      categoryId,
      taskId,
    },
  };
}


function move(target, sourceId, targetId) {
  if (!validateUUIDv4(sourceId) || !validateUUIDv4(targetId)) {
    throw new Error(`params have not valid uuids ${target} ${sourceId} ${targetId}`);
  }

  return {
    type: target === "task" ? actionTypes.MOVE_TASK : actionTypes.MOVE_CATEGORY,
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